export default function (accountInfo, name, region) {

  let account = {error: true};
  let err = {error: 'no account found'};

  if(accountInfo === '') {return err}

  if(region && /^(us|eu|kr|xbl|psn)$/.test(region)){


          for (var i = 0; i < accountInfo.length; i++) {
              if( accountInfo[i].careerLink === `/career/${region.replace('us','pc/us').replace('eu','pc/eu').replace('kr','pc/kr')}/${name}` ) {
                  account = accountInfo[i];
              }
          }

  } else {

          let level = 0;

          for (var i = 0; i < accountInfo.length; i++) {
              if(accountInfo[i].level > level) {
                  level = accountInfo[i].level
              }
          }
          for (var i = 0; i < accountInfo.length; i++) {
              if (accountInfo[i].level === level){
                  account = accountInfo[i];

              }
          }

  }

  return account

}
