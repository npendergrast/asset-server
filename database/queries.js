const { pool } = require('../database/db_init');
const bcrypt = require('bcrypt');

async function queryUserCredentials(userName, password) {
  try {
    const { rows } = await pool.query(
      `SELECT id, pw_hash FROM users WHERE user_name = $1`,
      [userName]
    );
    if (rows.length === 0) {
      return 'invalid';
    } else {
      const passwordIsValid = await bcrypt.compare(password, rows[0].pw_hash);
      if (passwordIsValid) {
        return rows[0].id;
      } else {
        return 'invalid';
      }
    }
  } catch (error) {
    return 'error';
  }
}

async function queryUserAssets(userID) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM assets WHERE user_id = $1`,
      [userID]
    );
    return rows;
  } catch (error) {
    return 'failed';
  }
}

module.exports = {
  queryUserCredentials,
  queryUserAssets,
};
