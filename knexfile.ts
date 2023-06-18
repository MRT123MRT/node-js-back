require('dotenv').config();

export default {
  client: 'pg',
  connection: {
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: 5432,
    host: 'localhost'
  }
};