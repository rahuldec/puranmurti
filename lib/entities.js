const fs = require('fs');
const path = require('path');

function loadConfig() {
  if (process.env.ENTITIES_JSON) {
    return JSON.parse(process.env.ENTITIES_JSON);
  }
  const configPath = path.join(__dirname, '..', 'config', 'entities.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  return { token: null, entities: [] };
}

module.exports = { loadConfig };
