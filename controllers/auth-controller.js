const jwt = require('jsonwebtoken');
const query = require('../database/queries');
const keys = require('../keys');

async function loginUser(req, res) {
  const { userName, password } = req.body;
  const auth = await query.queryUserCredentials(userName, password);
  if (auth === 'failed') {
    res.sendStatus(500);
  } else if (auth === 'invalid') {
    res.sendStatus(401);
  } else {
    const token = jwt.sign(
      {
        userName: userName,
        userID: auth.id,
      },
      keys.jwtSecret,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      success: true,
      token: token,
      userID: 'b3eba6d5-c1e6-40a5-8842-79229999a59b',
    });
  }
}

module.exports = {
  loginUser,
};
