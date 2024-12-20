// Importacao de módulos
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

// Configurações
const app = express();
const PORT = 3000;
const SECRET_KEY = "sua-chave-secreta"; // Substitua por uma chave mais segura em produção

// Middleware para processar JSON
app.use(bodyParser.json());

// Função auxiliar para gerar uma mensagem aleatória
function gerarMensagemAleatoria() {
  const mensagens = [
    "Olá, bem-vindo!",
    "Token gerado com sucesso!",
    "Hoje é um ótimo dia!",
    "Você está indo muito bem!",
    "Parabéns pela implementação!",
  ];
  const index = Math.floor(Math.random() * mensagens.length);
  return mensagens[index];
}

app.get("/", (req, res) => {
  res.json({
    mensagem: "Bem-vindo à API JWT!",
    rotas: {
      "/gerar-token": "GET - Gera um token JWT com uma mensagem aleatória",
      "/verificar-token":
        "POST - Recebe um token JWT e retorna a mensagem decodificada se for válido",
    },
  });
});

// Rota 1 - Gera um token JWT com uma mensagem aleatória
app.get("/gerar-token", (req, res) => {
  const mensagem = gerarMensagemAleatoria();
  const token = jwt.sign({ mensagem }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Rota 2 - Recebe um token e retorna a mensagem decodificada se for válido
app.post("/verificar-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ mensagem: decoded.mensagem });
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
