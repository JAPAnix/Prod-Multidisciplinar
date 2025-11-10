const connectToDatabase = require('../_db');
const User = require('../../models/User');

module.exports = async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  try {
    await connectToDatabase();
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erro ao conectar ao banco', detail: err.message });
  }

  try {
    if (method === 'GET') {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
      return res.status(200).json({ success: true, data: user });
    }

    if (method === 'PUT') {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
      return res.status(200).json({ success: true, data: user, message: 'Usuário atualizado com sucesso!' });
    }

    if (method === 'DELETE') {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
      return res.status(200).json({ success: true, message: 'Usuário deletado com sucesso!' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
