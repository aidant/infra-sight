import cheerio from 'cheerio';

import topHeroes from './TopHeroes';
import careerStats from './CareerStats';
import heroImages from './HeroImages';
import toName from './utils/ToName';
import toNumber from './utils/ToNumber';
import toSeconds from './utils/ToSeconds';

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


  rank = parseFloat(rank);
  comp.games_lost = comp.games_played - comp.games_won;
  comp.games_won = parseFloat(comp.games_won.replace(/,/g, ''));
  qp.games_won = parseFloat(qp.games_won.replace(/,/g, ''));
  comp.games_played = parseFloat(comp.games_played.replace(/,/g, ''));
  comp.time_played_seconds = toSeconds(comp.time_played);
  qp.time_played_seconds = toSeconds(qp.time_played);
  images.level_border = images.level_border.slice(21, 109);
  if (images.level_star) { images.level_star = images.level_star.slice(21, 107) }; 

  qp.heroes = topHeroes('quickplay', $)
  comp.heroes = topHeroes('competitive', $)
  images.heroes = heroImages('quickplay', $)

  let career_stats = careerStats('quickplay', $).concat(careerStats('competitive', $))

  const Profile = {
                    career_stats,
                    competitive: { //missing games_tied
                      games_lost: comp.games_lost,
                      games_played: comp.games_played,
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
                      display_name: profileInfo.platformDisplayName,
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