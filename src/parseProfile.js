import cheerio from 'cheerio'

import toSeconds from './utils/ToSeconds'

export default function (body, profileInfo) {

  let $ = cheerio.load(body)

  const username = $('.header-masthead').text();
  const rank = parseInt($('.competitive-rank div').html().replace(',',''));
  const compGamesWon = parseInt($('#competitive td:contains("Games Won")').next().html().replace(',',''));
  const compGamesPlayed = parseInt($('#competitive td:contains("Games Played")').next().html().replace(',',''));
  const compTimePlayed = $('#competitive td:contains("Time Played")').next().html();
  const qpGamesWon = parseInt($('#quickplay td:contains("Games Won")').next().html().replace(',',''));
  const qpTimePlayed = $('#quickplay td:contains("Time Played")').next().html();
  const rankImg = $('.competitive-rank img').attr('src');
  const levelBorder = $('.player-level').attr('style').slice(21, 109);
  const levelStar = $('.player-rank').attr('style').slice(21, 107);

  const compGamesLost = compGamesPlayed - compGamesWon;
  const compWinrate = (compGamesWon / compGamesPlayed)
  const qpTimePlayedSeconds = toSeconds(qpTimePlayed)
  const compTimePlayedSeconds = toSeconds(compTimePlayed)

  const Profile = {
                    competitive: { //missing games tied
                      games_lost: compGamesLost,
                      games_played: compGamesPlayed,
                      games_won: compGamesWon,
                      heroes: [],
                      playtime_seconds: compTimePlayedSeconds,
                      rank,
                      winrate: compWinrate
                    },
                    images: {
                      level_border: levelBorder,
                      level_star: levelStar,
                      portrait: profileInfo.portrait,
                      rank: rankImg
                    },
                    profile:{
                      display_name: profileInfo.platformDisplayName,
                      level: profileInfo.level,
                      url: `https://playoverwatch.com/en-us${profileInfo.careerLink}`,
                      username
                    },
                    quickplay: {
                      games_won: qpGamesWon,
                      heroes: [],
                      playtime_seconds: qpTimePlayedSeconds
                    }
                  }

  return Profile

}
