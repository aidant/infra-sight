import express from 'express'
import rp from 'request-promise'

import getProfile from './src/getProfile'
import parseProfile from './src/parseProfile'

const app = express();
let port = 3000;

app.get('/api/v1/:name', function (req, res) {

  rp({uri: `https://playoverwatch.com/en-us/search/account-by-name/${req.params.name}`, json: true})
      .then(function (htmlString) {

        let profileInfo = getProfile(htmlString, req.params.name, req.query.p)

        if(profileInfo.error === true) {
            res.status(404).json({});
          return
        }

        rp(`https://playoverwatch.com/en-us${profileInfo.careerLink}`)
            .then(function (htmlString2) {

                let Profile = parseProfile(htmlString2, profileInfo)

                if(Profile == '') {
                    res.status(404).json({});
                  return
                }

                res.json(Profile)

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

})

app.listen(port, function () {
  console.log(`infra-sight running on ${port}`)
})
