import express from 'express'
import rp from 'request-promise'
import Bluebird from 'bluebird';
import Profile from './schema/Profile';
import moment from 'moment';

import parseProfile from './scrape/parseProfile'

const app = express();
const port = 3000;

app.get(['/api/v1/profile/:accountTag', '/api/v1/profile/:accountTag/:region'], async (req, res) => {

  let region = '';
  if (req.params.region && req.params.region.match(/^(us|eu|kr|psn|xbl)$/)) {
    region = req.params.region;
  }

  let accountTag = req.params.accountTag.replace('~', '#')
  let accountTagUrl = accountTag.replace('#', '-')
  let requests = [];
  let account = {};

  console.log(`Account: ${accountTag} Region: ${region}`)

  let time = Date.now();
  let user = await Profile.find({ accountTag }, {sort: '-createdAt', limit: 1})
  user = user[0]

  if (!user) {
    user = Profile.create({ accountTag })
  } else if(moment(time).diff(new Date(user.createdAt).getTime(), 'seconds') <= 600 && moment(time).diff(new Date(user.createdAt).getTime(), 'seconds') >= 0) {
    let tmpDb = ['us', 'eu', 'kr', 'psn', 'xbl']
    let dbRegions = {};
    for (var i = 0; i < tmpDb.length; i++) {
      if (user[tmpDb[i]]) {
        dbRegions[tmpDb[i]] = user[tmpDb[i]];
      }
    }

    if (region === '') {
      let level = 0;
      Object.values(dbRegions).forEach((el, i) => {
        if (el.level > level) {
          account = el
          level = el.level
        }
      })
      res.json(account.profile)
      return;
    } else {
      res.json(dbRegions[region].profile)
      return;
    }

  } else {
    user = Profile.create({ accountTag })
  }

  requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/search/account-by-name/${accountTagUrl}`), json: true, simple: false, resolveWithFullResponse: true}))

  if (/^.{3,12}~[0-9]{4,6}$/.test(req.params.accountTag)) {
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/pc/us/${accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/pc/eu/${accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/pc/kr/${accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
  } else {
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/psn/${accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
    requests.push(rp({uri: encodeURI(`https://playoverwatch.com/en-us/career/xbl/${accountTagUrl}`), simple: false, resolveWithFullResponse: true}))
  }
console.time('r')
  Bluebird.all(requests)
  .spread(async function (search) {
console.timeEnd('r')
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
console.time('t')
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
          accountTag: req.params.accountTag.replace('~', '#'),
          url: regions[i].request.uri.href,
        }
        validRegions[tmp.region].profile = await parseProfile(validRegions[tmp.region])
      }
    }
console.timeEnd('t')
    if (Object.keys(validRegions).length < 1) {
      res.status(404).json({});
      return;
    }

    Object.values(validRegions).forEach((el, i) => {
      user[Object.keys(validRegions)[i]] = el;
    })
    user.save()

    if (region === '') {
      let level = 0;
      Object.values(validRegions).forEach((el, i) => {
        if (el.level > level) {
          account = el
          level = el.level
        }
      })
      res.json(account.profile)
      return;
    } else {
      res.json(validRegions[region].profile)
      return;
    }

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
