import toName from '../utils/toName';
import toNumber from '../utils/toNumber';
import parseStatName from '../utils/parseStatName';

export default function(gamemode, $) {
  let result = [];

  $(`#${gamemode} .career-stats-section div .toggle-display`).children().children().children().children('tbody').children()
  .each((i, el) => {
    let tmp = toNumber($(el).children().next().html(), parseStatName($(el).children().html()))
    result.push({ gamemode, hero: toName($(el).parent().parent().parent().parent().parent().attr('data-category-id')), stat: tmp.stat, value: tmp.value})
  })
  return result;
}
