import color from 'css-color-converter';

export default function (gamemode, $) {
  let result = { url: {}, color: {} };

  $(`#${gamemode} .hero-comparison-section .is-active`).children()
  .each((i, el) => {
    let name = $(el).children('.bar-container').children('.bar-text').children('.title').html().toLowerCase().replace('.', '').replace(': ','').replace('&#xf6;','o').replace('&#xfa;', 'u')
    result.url[name] = $(el).children('img').attr('src')
    result.color[name] = color($(el).children('.bar-container').children('.bar').css('background-color')).toHexString()
  })

  return result;
}
