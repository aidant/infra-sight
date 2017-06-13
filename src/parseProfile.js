import cheerio from 'cheerio';

import topHeroes from './TopHeroes';
import careerStats from './CareerStats';
import heroImages from './HeroImages';
import toName from './utils/ToName';
import toNumber from './utils/ToNumber';
import toSeconds from './utils/ToSeconds';
import parseNumber from './utils/ParseNumber';

export default function (body, profileInfo) {

  let $ = cheerio.load(body);
  let qp = {};
  let comp = {};
  let images = {};

  let username = $('.header-masthead').text();
  let rank = $('.competitive-rank div').html();
  comp.games_won = $('#competitive td:contains("Games Won")').next().html();
  comp.games_played = $('#competitive td:contains("Games Played")').next().html();
  comp.time_played = $('#competitive td:contains("Time Played")').next().html();
  qp.games_won = $('#quickplay td:contains("Games Won")').next().html();
  qp.time_played = $('#quickplay td:contains("Time Played")').next().html();
  images.rank = $('.competitive-rank img').attr('src');
  images.level_border = $('.player-level').attr('style');
  images.level_star = $('.player-rank').attr('style');

  qp.heroes = topHeroes('quickplay', $)
  comp.heroes = topHeroes('competitive', $)
  images.heroes = heroImages('quickplay', $)
  qp.career_stats = careerStats('quickplay', $)
  comp.career_stats = careerStats('competitive', $)
  let career_stats = qp.career_stats.concat(comp.career_stats)

  comp.games_lost = null
  for (var i = 0; i < comp.career_stats.length; i++) {
    if (comp.career_stats[i].hero === 'all' && comp.career_stats[i].stat === 'games_lost') {
      comp.games_lost = comp.career_stats[i].value
    }
  }

  rank = parseNumber(rank);
  comp.games_won = parseNumber(comp.games_won);
  qp.games_won = parseNumber(qp.games_won);
  comp.games_played = parseNumber(comp.games_played);
  comp.time_played_seconds = toSeconds(comp.time_played);
  qp.time_played_seconds = toSeconds(qp.time_played);
  images.level_border = images.level_border.slice(21, 109);

  if (images.level_star) {
    images.level_star = images.level_star.slice(21, 107)
  } else {
    images.level_star = null
  }

  if (comp.games_played === null) {
    comp.games_tied = null
  } else {
    comp.games_tied = comp.games_played - (comp.games_won + comp.games_lost)
  }

  if (comp.time_played_seconds === undefined) {
    comp.time_played_seconds = 0
  }

  if (profileInfo.level < 101 || (profileInfo.level > 600 && profileInfo.level < 701) || (profileInfo.level > 1200 && profileInfo.level < 1301)) {
    images.level_star = null
  }

  const Profile = {
                    career_stats,
                    competitive: {
                      games_lost: comp.games_lost,
                      games_played: comp.games_played,
                      games_tied: comp.games_tied,
                      games_won: comp.games_won,
                      heroes: comp.heroes,
                      time_played_seconds: comp.time_played_seconds,
                      rank
                    },
                    images: {
                      heroes: images.heroes,
                      portrait: {
                        border: images.level_border,
                        star: images.level_star
                      },
                      player_icon: profileInfo.portrait,
                      rank: images.rank
                    },
                    profile:{
                      platform_username: profileInfo.platformDisplayName,
                      level: profileInfo.level,
                      url: `https://playoverwatch.com/en-us${profileInfo.careerLink}`,
                      username
                    },
                    quickplay: { //missing games_played games_lost
                      games_won: qp.games_won,
                      heroes: qp.heroes,
                      time_played_seconds: qp.time_played_seconds
                    }
                  };

  return Profile;
}
