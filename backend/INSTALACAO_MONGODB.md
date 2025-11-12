# 📦 Guia de Instalação do MongoDB

## Opção 1: MongoDB Local (Windows)

### Passo 1: Download
1. Acesse: https://www.mongodb.com/try/download/community
2. Selecione:
   - **Version**: Última versão disponível
   - **Platform**: Windows
   - **Package**: MSI
3. Clique em **Download**

### Passo 2: Instalação
1. Execute o arquivo `.msi` baixado
2. Escolha **Complete** (instalação completa)
3. **IMPORTANTE**: Marque a opção "Install MongoDB as a Service"
4. Deixe marcado "Run service as Network Service user"
5. **IMPORTANTE**: Marque "Install MongoDB Compass" (interface gráfica)
6. Clique em **Install**

### Passo 3: Verificar Instalação
Abra o PowerShell e execute:
```powershell
mongod --version
```

Se aparecer "O termo 'mongod' não é reconhecido", adicione ao PATH:
1. Abra "Variáveis de Ambiente"
2. Em "Variáveis do Sistema", edite "Path"
3. Adicione: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Reinicie o PowerShell

### Passo 4: Iniciar o MongoDB
O MongoDB deve iniciar automaticamente como serviço. Para verificar:
```powershell
# Ver status do serviço
Get-Service MongoDB

# Iniciar manualmente (se necessário)
net start MongoDB
```

---

## Opção 2: MongoDB Atlas (Nuvem - GRÁTIS) ⭐ RECOMENDADO

### Vantagens:
- ✅ Não precisa instalar nada
- ✅ Totalmente gratuito (até 512MB)
- ✅ Funciona de qualquer lugar
- ✅ Mais fácil e rápido

### Passo 1: Criar Conta
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita (pode usar Google/GitHub)

### Passo 2: Criar Cluster
1. Escolha a opção **FREE** (M0 Sandbox)
2. Selecione uma região próxima (ex: São Paulo)
3. Clique em **Create Cluster**

### Passo 3: Configurar Acesso
1. **Database Access**:
   - Clique em "Add New Database User"
   - Username: `admin` (ou outro nome)
   - Password: Crie uma senha forte (anote!)
   - Permissions: "Read and write to any database"
   - Clique em "Add User"

2. **Network Access**:
   - Clique em "Add IP Address"
   - Clique em "Allow Access from Anywhere" (0.0.0.0/0)
   - Clique em "Confirm"

### Passo 4: Obter Connection String
1. Volte para "Database"
2. Clique em "Connect" no seu cluster
3. Escolha "Connect your application"
4. Copie a connection string (parecida com):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/
   ```
5. Substitua `<password>` pela senha criada

### Passo 5: Configurar no Projeto
1. Abra o arquivo `server.js`
2. Substitua a linha da conexão MongoDB por:
   ```javascript
   const MONGODB_URI = 'mongodb+srv://admin:SUA_SENHA@cluster0.xxxxx.mongodb.net/cadastroDB';
   ```

---

## 🚀 Testando a Conexão

Depois de configurar (opção 1 ou 2), execute:

```powershell
npm start
```

Se aparecer:
```
✅ Conectado ao MongoDB
🚀 Servidor rodando em http://localhost:3000
```

**SUCESSO!** Acesse http://localhost:3000 no navegador.

---

## ❌ Problemas Comuns

### Erro: "MongoNetworkError"
- **MongoDB Local**: Verifique se o serviço está rodando
- **MongoDB Atlas**: Verifique o IP whitelist e connection string

### Erro: "Authentication failed"
- Verifique usuário e senha no MongoDB Atlas

### Erro: "connect ECONNREFUSED"
- MongoDB local não está rodando
- Execute: `net start MongoDB`

---

## 💡 Dica

Para desenvolvimento, **use MongoDB Atlas** (opção 2). É mais fácil e você não precisa se preocupar com instalação ou serviços rodando!
