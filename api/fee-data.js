const { loadConfig } = require('../lib/entities');

const ERP_BASE = 'https://others-api.odpay.in/api';

module.exports = async (req, res) => {
  const { entity, session } = req.query;

  if (!entity || !session) {
    res.status(400).json({ error: 'entity and session are required' });
    return;
  }

  const { token, entities } = loadConfig();
  const match = entities.find((e) => e.id === entity);

  if (!match) {
    res.status(404).json({ error: 'unknown entity' });
    return;
  }

  try {
    const erpSession = session + (match.sessionSuffix || '');
    const url = `${ERP_BASE}/getEstimatedCollections/dashboard?entity=${encodeURIComponent(entity)}&session=${encodeURIComponent(erpSession)}`;
    const erpRes = await fetch(url, {
      headers: { Authorization: token },
    });

    if (!erpRes.ok) {
      const text = await erpRes.text();
      res.status(erpRes.status).json({ error: 'ERP request failed', detail: text });
      return;
    }

    const data = await erpRes.json();
    res.status(200).json({ entity: { id: match.id, name: match.name }, session, installments: data });
  } catch (err) {
    res.status(502).json({ error: 'ERP request failed', detail: err.message });
  }
};
