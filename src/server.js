import express from 'express'
import rp from 'request-promise'
import Bluebird from 'bluebird';
import Profile from './schema/Profile';
import moment from 'moment';

import parseProfile from './scrape/parseProfile'
import getParams from './utils/params';
import getProfile from './utils/profileWhereRegion';

const app = express();
const port = 3000;

app.get(['/api/v1/profile/:accountTag', '/api/v1/profile/:accountTag/:region'], async (req, res) => {
  let params = getParams(req.params.accountTag, req.params.region);
  console.log(`Account: ${params.accountTag} Region: ${params.region}`)

  let user = await Profile.find({ accountTag: params.accountTag }, {sort: '-createdAt', limit: 1})
  user = user[0]
  if (!user) {
    user = Profile.create({ accountTag: params.accountTag })
  } else if(moment(Date.now()).diff(new Date(user.createdAt).getTime(), 'seconds') <= 600 && moment(Date.now()).diff(new Date(user.createdAt).getTime(), 'seconds') >= 0) {
    let sendAcount = getProfile(null, params.region, user);
    if (sendAcount === null) {
      res.status(404).json({});
      return;
    }
    res.json(sendAcount);
    return;
  } else {
    user = Profile.create({ accountTag: params.accountTag })
  }

  let requests = [];
  requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/search/account-by-name/${params.accountTagUrl}`), json: true, simple: false, resolveWithFullResponse: true}))
  if (params.platform === 'pc') {
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/pc/us/${params.accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/pc/eu/${params.accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/pc/kr/${params.accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
  } else {
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/psn/${params.accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/xbl/${params.accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
  }

  Bluebird.all(requests)
  .spread(async function (search) {
    let regions = Array.from(arguments).splice(1)
    let validRegions = {};
    let accountInfo = {};

    if (search.length < 1) {
      res.status(404).json({});
      return;
    }

    for (let i = 0; i < search.body.length; i++) {
      accountInfo[search.body[i].careerLink.split('/').reverse()[1]] = search.body[i];
    }

    for (let i = 0; i < regions.length; i++) {
      if (regions[i].statusCode >= 200 && regions[i].statusCode < 300) {
        let tmp = {};
        tmp.region = regions[i].request.uri.path.split('/').reverse()[1];
        validRegions[tmp.region] = {
          html: regions[i].body,
          path: regions[i].request.uri.path,
          level: accountInfo[tmp.region].level,
          portrait: accountInfo[tmp.region].portrait,
          platform_username: accountInfo[tmp.region].platformDisplayName,
          accountTag: params.accountTag,
          url: regions[i].request.uri.href,
        }
        validRegions[tmp.region].profile = await parseProfile(validRegions[tmp.region])
      }
    }

    if (Object.keys(validRegions).length < 1) {
      res.status(404).json({});
      return;
    }

    Object.values(validRegions).forEach((el, i) => {
      user[Object.keys(validRegions)[i]] = el;
    })
    user.save()

    let sendAcount = getProfile(validRegions, params.region);
    if (sendAcount === null) {
      res.status(404).json({});
      return;
    }
    res.json(sendAcount);

  })
  .catch(e => {
    console.error(e);
    res.status(500).json({});
  })

})

export default {
  connect() {
    return app.listen(port, console.log(`infra-sight running on ${port}`))
  }
};
