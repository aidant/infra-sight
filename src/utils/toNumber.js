import moment from 'moment'

export default function (inp, stat) {
  let id = ''
  let result = {}

  stat = stat
  .split('_')

  for (let i = 0; i < stat.length; i++) {
    if (stat[i] === 'time') {
      id = 'time'
    }
    if (stat[i] === 'accuracy') {
      id = 'accuracy'
    }
  }

  if (id === 'time') {
    inp = inp
    .split(' ')

    if (inp.length > 1) {
      inp[0] = parseFloat(inp[0])
      result.value = moment.duration(inp[0], inp[1]).as('seconds')
      stat.push('seconds')
      result.stat = stat.join('_')
    } else {
      let time = inp[0].split(':').reverse()
      let timeCorrected = []

      timeCorrected[0] = time[2] || '00'
      timeCorrected[1] = time[1] || '00'
      timeCorrected[2] = time[0] || '00'
      timeCorrected = timeCorrected.join(':')

      result.value = moment.duration(timeCorrected).as('seconds')
      stat.push('seconds')
      result.stat = stat.join('_')
    }
  }

  if (id === 'accuracy') {
    inp = inp
    .replace('%', '')
    result.value = parseFloat(inp) / 100
    result.stat = stat.join('_')
  }

  if (id === '') {
    inp = inp
    .replace(/,/g, '')
    result.value = parseFloat(inp)
    result.stat = stat.join('_')
  }
  return result
}
