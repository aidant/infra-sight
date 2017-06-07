export default function (TimePlayed) {

  TimePlayed = TimePlayed.split(' ');

  let TimePlayedSeconds

  if (TimePlayed == '--') {
    TimePlayedSeconds = 0
    return TimePlayedSeconds
  }

  if (TimePlayed[1].toLowerCase() == 'hours' || TimePlayed[1].toLowerCase() == 'hour') {
    TimePlayedSeconds = parseInt(TimePlayed) * 3600
    return TimePlayedSeconds
  }

  if (TimePlayed[1].toLowerCase() == 'minutes' || TimePlayed[1].toLowerCase() == 'minute') {
    TimePlayedSeconds = parseInt(TimePlayed) * 60
    return TimePlayedSeconds
  }

  if (TimePlayed[1].toLowerCase() == 'seconds' || TimePlayed[1].toLowerCase() == 'second') {
    TimePlayedSeconds = parseInt(TimePlayed)
    return TimePlayedSeconds
  }

}
