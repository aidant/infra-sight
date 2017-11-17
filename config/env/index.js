const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`)

const defaults = {
  databaseUri: false
}

export default Object.assign(defaults, config)
