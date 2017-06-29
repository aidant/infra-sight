export default function (mode, $) {
  let result = {};

  $(`#${mode} .hero-comparison-section .is-active`).children()
  .each((i, el) => {
    let name = $(el).children('.bar-container').children('.bar-text').children('.title').html().toLowerCase().replace('.', '').replace(': ','').replace('&#xf6;','o').replace('&#xfa;', 'u')
    result[name] = $(el).children('img').attr('src');
  })

  return result
}
