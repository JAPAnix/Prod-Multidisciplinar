const connectToDatabase = require('./_db');
const User = require('../models/User');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  try {
    await connectToDatabase();
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erro ao conectar ao banco', detail: err.message });
  }

  const { method } = req;

  try {
    if (method === 'GET') {
      const users = await User.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: users });
    }

    if (method === 'POST') {
      try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({ success: true, data: user, message: 'Usuário cadastrado com sucesso!' });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ success: false, message: 'Email já cadastrado!' });
        }
        return res.status(400).json({ success: false, message: error.message });
      }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
