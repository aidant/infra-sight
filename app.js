import express from 'express'
import rp from 'request-promise'
import Bluebird from 'bluebird';

import getProfile from './src/getProfile'
import parseProfile from './src/parseProfile'

const app = express();
let port = 3000;

app.get(['/api/profile/:name', '/api/profile/:name/:region'], function(req, res) {

    if(req.params.region && /^(us|eu|kr|xbl|psn)$/.test(req.params.region)){

      const request1 = rp({uri: `https://playoverwatch.com/en-us/search/account-by-name/${req.params.name}`, json: true});
      const request2 = rp(`https://playoverwatch.com/en-us/career/${req.params.region.replace('us','pc/us').replace('eu','pc/eu').replace('kr','pc/kr')}/${req.params.name}`);

      Bluebird.all([request1, request2])
      .spread(function(info, account) {

        let accountInfo = {};

        if(info.length < 1) {
          res.status(404).json({});
          return;
        }

        for (var i = 0; i < info.length; i++) {
          if (info[i].careerLink === `/career/${req.params.region.replace('us','pc/us').replace('eu','pc/eu').replace('kr','pc/kr')}/${req.params.name}`) {
            accountInfo = info[i];
          }
        }

        let profile = parseProfile(account, accountInfo)
        if (profile === '') {
          res.status(404).json({});
          return;
        }
        res.json(profile);

      })
      .catch(function (err) {
          console.log(err)
          res.status(500).json({});
      });
    } else {

      rp({uri: `https://playoverwatch.com/en-us/search/account-by-name/${req.params.name}`, json: true})
        .then(function(info) {

          let level = 0;
          let accountInfo = {};

          if(info.length < 1) {
            res.status(404).json({});
            return;
          }

          for (var i = 0; i < info.length; i++) {
            if (info[i].level > level) {
              level = info[i].level;
              accountInfo = info[i];
            }
          }

          rp(`https://playoverwatch.com/en-us${accountInfo.careerLink}`)
            .then(function(account) {

              let profile = parseProfile(account, accountInfo)
              if (profile === '') {
                res.status(404).json({});
                return;
              }
              res.json(profile);

            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json({});
            });

        })
        .catch(function (err) {
            console.log(err)
            res.status(500).json({});
        });

    }

})


app.listen(port, function () {
  console.log(`infra-sight running on ${port}`)
})
