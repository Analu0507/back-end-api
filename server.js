import express from "express";      // Requisição do pacote do express
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();         // Carrega e processa o arquivo .env
const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta

let pool = null;


function conectarBD() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    });
  }
  return pool;
}

app.get("/", async (req, res) => {        
  const db = conectarBD();
  console.log("Rota GET / solicitada"); // Log no terminal para indicar que a rota foi acessada

let dbStatus = "ok";
try {
  await db.query("SELECT 1");
} catch (e) {
  dbStatus = e.message;
}

  res.json({
		descricao: "API para gatos",    // Substitua pelo conteúdo da sua API
    author: "Ana Luysa Rocha do Nascimento",     // Substitua pelo seu nome
    statusBD: dbStatus
  });
});

app.get("/questoes", async (req, res) => {
	const db = conectarBD();
  console.log("Rota GET /questoes solicitada"); // Log no terminal para indicar que a rota foi acessada
	
try {
    const resultado = await db.query("SELECT * FROM questoes"); // Executa uma consulta SQL para selecionar todas as questões
    const dados = resultado.rows; // Obtém as linhas retornadas pela consulta
    res.json(dados); // Retorna o resultado da consulta como JSON
  } catch (e) {
    console.error("Erro ao buscar questões:", e); // Log do erro no servidor
    res.status(500).json({
      erro: "Erro interno do servidor",
      mensagem: "Não foi possível buscar as questões",
    });
  }
});

app.listen(port, () => {
  console.log(`Serviço rodando na porta:  ${port}`);
});
