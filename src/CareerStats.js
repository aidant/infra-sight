import toName from './utils/ToName';
import toNumber from './utils/ToNumber';

export default function (mode, $) {

  let pos = 0;
  let result = [];
  let tmp;

  $(`#${mode} .career-stats-section .toggle-display`).each(function (i, elem) {
    $(`#${mode} .career-stats-section [data-category-id="${$(elem).attr('data-category-id')}"] div tr`).each(function (j, el) {

      let name = toName($(elem).attr('data-category-id'));
      let stat = $(el).children('td').html();
      let value = $(el).children('td').next().html()

      if(stat && value) {

        stat = stat
          .toLowerCase()
          .trim()
          .replace(/ - /g, ' ')
          .replace(/ /g, '_')
          .replace(/(assist|blow|card|death|hit|kill|medal)s?$/, '$1s')
          .replace('shots_hits', 'shots_hit')
          .replace('teleporter_pad_destroyed', 'teleporter_pads_destroyed')

          tmp = toNumber(value, stat)

        result[pos] = { mode, name, stat: tmp.name, value: tmp.value };
        pos++;
      }

    })

    //console.log(`\nname:\n${$(elem).children('td').html()} \nvalue:\n${$(elem).children('td').next().html()}`)
    //console.log(`number: ${i}`)
  })
  return result;
}