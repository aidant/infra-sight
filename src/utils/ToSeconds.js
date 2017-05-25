export default function (TimePlayed) {

  TimePlayed = TimePlayed.split(' ');

  let TimePlayedSeconds

  if (TimePlayed[1].toLowerCase() == 'hours') {
    TimePlayedSeconds = parseInt(TimePlayed) * 3600
  }

  if (TimePlayed[1].toLowerCase() == 'minutes') {
    TimePlayedSeconds = parseInt(TimePlayed) * 60
  }

  if (TimePlayed[1].toLowerCase() == 'seconds') {
    TimePlayedSeconds = parseInt(TimePlayed)
  }

  return TimePlayedSeconds

}