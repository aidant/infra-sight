import toName from './utils/ToName';
import toNumber from './utils/ToNumber'

export default function (mode, $) {

  let result = {};

  $(`#${mode} .hero-comparison-section .toggle-display`).each(function (i, element) {
    let id = $(element).attr('data-category-id');
    result[toName(id)] = [];
    $(`#${mode} .hero-comparison-section [data-category-id="${id}"]`).each(function (j, elem) {
      $(`#${mode} .hero-comparison-section [data-category-id="${id}"] div .bar-text .title`).each(function (k, el) {
        result[toName(id)][k] = {}
        result[toName(id)][k].hero = $(el).html()        
        .toLowerCase()
        .replace('.', '')
        .replace(': ','')
        .replace('&#xf6;','o')
        .replace('&#xfa;', 'u')
      })
      $(`#${mode} .hero-comparison-section [data-category-id="${id}"] div .bar-text .description`).each(function (k, el) {
        result[toName(id)][k].value = toNumber($(el).html(), toName(id)).value
      })
      $(`#${mode} .hero-comparison-section [data-category-id="${id}"] .progress-category-item`).each(function (k, el) {
        result[toName(id)][k].percentage = parseFloat($(el).attr('data-overwatch-progress-percent'))
      })
    })
  })
  return result
}