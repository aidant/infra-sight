export default function (mode, $) {

  let result = {};
  let image = [];
  let name = [];

  $(`#${mode} .hero-comparison-section .is-active div .bar-text .title`).each( function(i, elem){
    name[i] = $(elem).html()
    .toLowerCase()
    .replace('.', '')
    .replace(': ','')
    .replace('&#xf6;','o')
    .replace('&#xfa;', 'u')
  })
  $(`#${mode} .hero-comparison-section .is-active div img`).each( function(i, elem){
    result[name[i]] = $(elem).attr('src');
  })

  return result
}
