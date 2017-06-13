import toName from './utils/ToName';
import toNumber from './utils/ToNumber';
import parseStatName from './utils/ParseStatName';

export default function (mode, $) {

  let pos = 0;
  let result = [];
  let tmp;
  $(`#${mode} .career-stats-section .toggle-display`).each(function (i, elem) {
    $(`#${mode} .career-stats-section [data-category-id="${$(elem).attr('data-category-id')}"] div tr`).each(function (j, el) {

      let hero = toName($(elem).attr('data-category-id'));
      let stat = $(el).children('td').html();
      let value = $(el).children('td').next().html()

      if(stat && value) {

          tmp = toNumber(value, parseStatName(stat))

        result[pos] = { mode, hero, stat: tmp.name, value: tmp.value };
        pos++;
      }

    })

    //console.log(`\nname:\n${$(elem).children('td').html()} \nvalue:\n${$(elem).children('td').next().html()}`)
    //console.log(`number: ${i}`)
  })
  return result;
}
