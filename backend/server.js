const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexão com MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://admin:admin1234@multi.nj6dzjk.mongodb.net/cadastroDB?retryWrites=true&w=majority&appName=Multi';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
  console.log('📊 Database: cadastroDB');
})
.catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB:', err.message);
  console.log('\n📝 Verifique:');
  console.log('1. Se o IP está liberado no MongoDB Atlas (Network Access)');
  console.log('2. Se o usuário e senha estão corretos');
  console.log('3. Se o cluster está ativo\n');
});

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
