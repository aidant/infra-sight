import toName from '../utils/toName';
import toNumber from '../utils/toNumber'

export default function(gamemode, $) {
  let result = {};

  $(`#${gamemode} .hero-comparison-section .toggle-display`).children()
  .each((i, el) => {
    let id = toName($(el).parent().attr('data-category-id'))
    result[id] = result[id] || [];
    result[id].push({
      hero: $(el).children('.bar-container').children('.bar-text').children('.title').html().toLowerCase().replace('.', '').replace(': ','').replace('&#xf6;','o').replace('&#xfa;', 'u'),
      percentage: parseFloat($(el).attr('data-overwatch-progress-percent')),
      value: toNumber($(el).children('.bar-container').children('.bar-text').children('.description').html(), id).value })
  })

  return result;
}
