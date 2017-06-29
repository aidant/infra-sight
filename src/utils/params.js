export default function (accountTag, region) {
  let result = {};

  if (region && region.match(/^(us|eu|kr|psn|xbl)$/)) {
    result.region = region;
  } else {
    result.region = '';
  }

  if (accountTag) {
    result.accountTag = accountTag.replace('~', '#');
    result.accountTagUrl = accountTag.replace('~', '-');
    if (/^.{3,12}~[0-9]{4,6}$/.test(accountTag)) {
      result.platform = 'pc';
    }
  }
  return result
}
