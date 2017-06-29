import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`)

const rootPath = path.join(__dirname, '..', '..', '..');

const defaults = {
  databaseUri: `mongodb://localhost:27017/infra-sight`
};

export default Object.assign(defaults, config);
