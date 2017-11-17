import 'babel-polyfill'

import server from './src/server'
import db from './src/db'

console.log()
console.log(' _____        __                      _       _     _   ')
console.log('|_   _|      / _|                    (_)     | |   | |  ')
console.log('  | |  _ __ | |_ _ __ __ _ ______ ___ _  __ _| |__ | |_ ')
console.log('  | | | \'_ \\|  _| \'__/ _` |______/ __| |/ _` | \'_ \\| __|')
console.log(' _| |_| | | | | | | | (_| |      \\__ \\ | (_| | | | | |_ ')
console.log('|_____|_| |_|_| |_|  \\__,_|      |___/_|\\__, |_| |_|\\__|')
console.log('                                         __/ |          ')
console.log('    An unofficial API for Overwatch.    |___/           ')
console.log()

Promise.resolve()
  .then(db.connect)
  .then(server.connect)
