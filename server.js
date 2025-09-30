import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();         // Carrega e processa o arquivo .env
const { Pool } = pkg;    // Utiliza a Classe Pool do Postgres
import express from "express";      // Requisição do pacote do express
const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta

let pool = null;


function conectarBD(){
  if(!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    })
  }
  return pool;
}

app.get("/", async (req, res) => {        // Cria endpoint na rota da raiz do projeto
  const db = conectarBD();
  console.log("Rota GET / solicitada");

  let dbStatus = "ok";
  try {
    await db.query("SELECT 1")
  } catch (e) {
    dbStatus = e.message;
  }

  res.json({
		message: "API para ganha dinheiro",      // Substitua pelo conteúdo da sua API
    author: "Ana Luysa Rocha do Nascimento",    // Substitua pelo seu nome
    statusBD: dbStatus
  });
});

app.get("/questoes", async (req, res) => {
  const db = conectarBD();
  console.log("Rota GET /questoes solicitadas");

  try {
    const resultado = await db.query("SELECT * FROM questoes");
    const dados = resultado.rows;
    res.json(dados);
  } catch (e) {
    console.error("Erro ao buscar questões:" e);
    res.status(500).json({
      erro: "Erro interno do servidor",
      mensagem: "Não foi possível buscar as questões",
    });
  }
});

app.listen(port, () => {
  console.log('Serviço rodando na porta: ${port}');
});