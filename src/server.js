const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
//const bodyParser = require('body-parser');

const app = express();
let port = 3000;

//app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/v1/:name', function (req, res) {

    let account = [{error: 'no account found'}];

    if(req.query.p && /^(us|eu|kr|xbl|psn)$/.test(req.query.p)){

        rp({uri: `https://playoverwatch.com/en-us/search/account-by-name/${req.params.name}`, json: true})
        .then(function (accountInfo) {


            for (var i = 0; i < accountInfo.length; i++) {
                if( accountInfo[i].careerLink === `/career/${req.query.p.replace('us','pc/us').replace('eu','pc/eu').replace('kr','pc/kr')}/${req.params.name}` ) {
                    account[0] = accountInfo[i];
                } 
            }

            res.send(account);

        })
        .catch(function (err) {
            res.json({error: 'scrape failed'})
        });

    } else {

        rp({uri: `https://playoverwatch.com/en-us/search/account-by-name/${req.params.name}`, json: true})
        .then(function (accountInfo) {

            let level = 0;
            
            for (var i = 0; i < accountInfo.length; i++) {
                if(accountInfo[i].level > level) {
                    level = accountInfo[i].level
                }
            }
            for (var i = 0; i < accountInfo.length; i++) {
                if (accountInfo[i].level === level){
                    account[0] = accountInfo[i];
                }
            }
            
            res.json(account)

        })
        .catch(function (err) {
            res.json({error: 'scrape failed'})
        });

    }
})

app.listen(port, function () {
  console.log(`infra-sight running on ${port}`)
})

