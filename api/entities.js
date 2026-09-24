const { loadConfig } = require('../lib/entities');

module.exports = async (req, res) => {
  const { entities } = loadConfig();
  res.status(200).json(entities);
};
