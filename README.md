# 📋 Sistema de Cadastro

Sistema de cadastro simples com Node.js, MongoDB, HTML, CSS e JavaScript.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB + Mongoose
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Outras**: Body-parser, CORS

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (versão 4.4 ou superior)

## 🔧 Instalação

1. **Clone ou navegue até o diretório do projeto:**
   ```bash
   cd c:\Users\Administrador\Documents\multi
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Certifique-se de que o MongoDB está rodando:**
   ```bash
   mongod
   ```
   Ou inicie o serviço MongoDB no Windows:
   - Abra "Serviços" (services.msc)
   - Procure por "MongoDB Server"
   - Clique em "Iniciar"

## ▶️ Como Executar

1. **Inicie o servidor:**
   ```bash
   npm start
   ```
   
   Ou para desenvolvimento com auto-reload:
   ```bash
   npm run dev
   ```

2. **Acesse a aplicação:**
   Abra seu navegador e acesse: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
multi/
├── models/
│   └── User.js           # Schema do usuário (Mongoose)
├── routes/
│   └── userRoutes.js     # Rotas da API (CRUD)
├── public/
│   ├── index.html        # Interface do usuário
│   ├── styles.css        # Estilos da aplicação
│   └── script.js         # Lógica do frontend
├── server.js             # Servidor Express
├── package.json          # Dependências do projeto
└── README.md             # Documentação
```

## 🎯 Funcionalidades

- ✅ **Criar** usuário (nome, email, telefone, data de nascimento)
- ✅ **Listar** todos os usuários cadastrados
- ✅ **Editar** informações de um usuário
- ✅ **Excluir** usuário
- ✅ Validação de dados (email único, campos obrigatórios)
- ✅ Interface responsiva e moderna
- ✅ Mensagens de feedback para o usuário

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/api/users` | Criar novo usuário |
| GET    | `/api/users` | Listar todos os usuários |
| GET    | `/api/users/:id` | Buscar usuário por ID |
| PUT    | `/api/users/:id` | Atualizar usuário |
| DELETE | `/api/users/:id` | Excluir usuário |

### Exemplo de Requisição (POST)

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 98765-4321",
  "dataNascimento": "1990-05-15"
}
```

## 🎨 Interface

A interface possui:
- Formulário de cadastro com validação
- Lista de usuários cadastrados com cards
- Botões para editar e excluir
- Design responsivo (funciona em mobile)
- Feedback visual com mensagens de sucesso/erro
- Gradiente moderno e animações suaves

## 🛠️ Possíveis Melhorias

- [ ] Adicionar paginação na listagem
- [ ] Implementar busca/filtro de usuários
- [ ] Adicionar autenticação de usuários
- [ ] Melhorar validação de telefone
- [ ] Adicionar mais campos (endereço, CPF, etc.)
- [ ] Implementar upload de foto de perfil

## ⚠️ Solução de Problemas

### Erro ao conectar com MongoDB
```
❌ Erro ao conectar ao MongoDB
```
**Solução**: Verifique se o MongoDB está instalado e rodando. Execute `mongod` ou inicie o serviço.

### Porta 3000 já em uso
**Solução**: Mude a porta no arquivo `server.js` ou encerre o processo usando a porta 3000.

### Dependências não encontradas
**Solução**: Execute `npm install` novamente.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido como exemplo de sistema CRUD com Node.js e MongoDB.
