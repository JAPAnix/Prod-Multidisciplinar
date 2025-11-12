const connectToDatabase = require('./_db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const startedAt = Date.now();
  try {
    await connectToDatabase();
    return res.status(200).json({ success: true, status: 'ok', latencyMs: Date.now() - startedAt });
  } catch (err) {
    return res.status(500).json({ success: false, status: 'db_error', message: 'Erro ao conectar ao banco', detail: err.message });
  }
};
