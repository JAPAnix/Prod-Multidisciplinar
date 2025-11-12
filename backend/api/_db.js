const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  // Fallback inseguro: ideal usar variável de ambiente MONGODB_URI na Vercel.
  const uri = process.env.MONGODB_URI || 'mongodb+srv://admin:admin123@multi.nj6dzjk.mongodb.net/cadastroDB?retryWrites=true&w=majority&appName=Multi';

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectToDatabase;
