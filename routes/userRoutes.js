const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Criar usuário (CREATE)
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, data: user, message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Email já cadastrado!' });
    } else {
      res.status(400).json({ success: false, message: error.message });
    }
  }
});

// Listar todos os usuários (READ)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Buscar usuário por ID (READ)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Atualizar usuário (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }
    res.json({ success: true, data: user, message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Deletar usuário (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }
    res.json({ success: true, message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
