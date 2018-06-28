export default function (validRegions, region, user) {
  let account = {}

  if (validRegions === null) {
    validRegions = {}
    let regions = ['us', 'eu', 'kr', 'psn', 'xbl', 'pc']

    for (let i = 0; i < regions.length; i++) {
      if (user[regions[i]]) {
        validRegions[regions[i]] = user[regions[i]]
      }
    }
  }

  if (region === '') {
    let level = 0
    Object.values(validRegions).forEach((el, i) => {
      if (el.level > level) {
        account = el
        level = el.level
      }
    })
    return account
  } else if (validRegions[region]) {
    return validRegions[region]
  } else {
    return null
  }
}
