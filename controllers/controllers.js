const query = require('../database/queries');

async function getUserAssets(req, res) {
  const userAssets = await query.queryUserAssets(
    '895a1c9f-a081-4488-9804-98dbc9386713'
  );
  res.status(200).json(userAssets);
}

module.exports = {
  getUserAssets,
};
