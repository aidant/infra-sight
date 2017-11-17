import cheerio from 'cheerio'

import topHeroes from './topHeroes'
import careerStats from './careerStats'
import heroImages from './heroImages'
import toSeconds from '../utils/toSeconds'
import parseNumber from '../utils/parseNumber'

export default function (account) {
  return new Promise((resolve, reject) => {
    try {
      let $ = cheerio.load(account.html)
      let qp = {}
      let comp = {}
      let images = {}

      let username = $('.header-masthead').text()
      let rank = $('.competitive-rank div').html()
      comp.games_won = $('#competitive td:contains("Games Won")').next().html()
      comp.games_played = $('#competitive td:contains("Games Played")').next().html()
      comp.games_lost = $('#competitive td:contains("Games Lost")').next().html()
      comp.games_tied = $('#competitive td:contains("Games Tied")').next().html()
      comp.time_played = $('#competitive td:contains("Time Played")').next().html()
      qp.games_won = $('#quickplay td:contains("Games Won")').next().html()
      qp.time_played = $('#quickplay td:contains("Time Played")').next().html()
      images.rank = $('.competitive-rank img').attr('src')
      images.level_border = $('.player-level').attr('style')
      images.level_star = $('.player-rank').attr('style')

      qp.heroes = topHeroes('quickplay', $)
      comp.heroes = topHeroes('competitive', $)
      images.heroes = heroImages('quickplay', $)
      qp.career_stats = careerStats('quickplay', $)
      comp.career_stats = careerStats('competitive', $)
      // eslint-disable-next-line camelcase
      let career_stats = qp.career_stats.concat(comp.career_stats)

      rank = parseNumber(rank)
      comp.games_won = parseNumber(comp.games_won) || 0
      comp.games_played = parseNumber(comp.games_played) || 0
      comp.games_lost = parseNumber(comp.games_lost) || 0
      comp.games_tied = parseNumber(comp.games_tied) || 0
      comp.time_played_seconds = toSeconds(comp.time_played) || 0
      qp.games_won = parseNumber(qp.games_won) || 0
      qp.time_played_seconds = toSeconds(qp.time_played) || 0
      images.level_border = images.level_border.replace(/(background-image:url\()(.+)(\))/, '$2')

      if (images.level_star && Math.floor((account.level - 1) % 600 / 100) > 0) {
        images.level_star = images.level_star.replace(/(background-image:url\()(.+)(\))/, '$2')
      } else {
        images.level_star = null
      }

      const Profile = {
        career_stats,
        competitive: {
          games: {
            lost: comp.games_lost,
            played: comp.games_played,
            tied: comp.games_tied,
            won: comp.games_won
          },
          heroes: comp.heroes,
          time_played_seconds: comp.time_played_seconds,
          rank
        },
        images: {
          color: images.heroes.color,
          heroes: images.heroes.url,
          portrait: {
            border: images.level_border,
            star: images.level_star
          },
          player_icon: account.portrait,
          rank: images.rank
        },
        profile: {
          platform_username: account.platform_username,
          level: account.level,
          url: account.url,
          username
        },
        quickplay: {
          games: {
            won: qp.games_won
          },
          heroes: qp.heroes,
          time_played_seconds: qp.time_played_seconds
        }
      }

      resolve(Profile)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
