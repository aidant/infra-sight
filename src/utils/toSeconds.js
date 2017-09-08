export default function (timePlayed) {

  if(!timePlayed) return 0

  timePlayed = timePlayed.split(' ');

  let timePlayedSeconds

  if (timePlayed == '--') {
    timePlayedSeconds = 0
    return timePlayedSeconds
  }

  if (timePlayed[1].toLowerCase() == 'hours' || timePlayed[1].toLowerCase() == 'hour') {
    timePlayedSeconds = parseInt(timePlayed) * 3600
    return timePlayedSeconds
  }

  if (timePlayed[1].toLowerCase() == 'minutes' || timePlayed[1].toLowerCase() == 'minute') {
    timePlayedSeconds = parseInt(timePlayed) * 60
    return timePlayedSeconds
  }

  if (timePlayed[1].toLowerCase() == 'seconds' || timePlayed[1].toLowerCase() == 'second') {
    timePlayedSeconds = parseInt(timePlayed)
    return timePlayedSeconds
  }

}
