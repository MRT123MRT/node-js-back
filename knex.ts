import config from './knexfile';
const database = require('knex')(config);
export default database;
console.log(config)