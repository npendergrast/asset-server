const { Pool } = require('pg');
const keys = require('../keys');

const pool = new Pool({
  user: process.env.user || keys.user,
  host: process.env.host || keys.host,
  database: process.env.database || keys.database,
  password: process.env.password || keys.password,
  port: process.env.dbPort || keys.port,
});

module.exports = {
  pool,
};
