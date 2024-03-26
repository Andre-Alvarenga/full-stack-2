import express from 'express';
import cors from 'cors';
import rotaMaquina from './Rotas/rotaMaquina.js';
import rotaInstrucao from './Rotas/rotaInstrucao.js';
import rotaPeca from './Rotas/rotaPeca.js';
//import rotaMaquinaOperacao from './Rotas/rotaMaquinaOperacao.js';
import rotaOperacao from './Rotas/rotaOperacao.js';
import rotaOperacaoPeca from './Rotas/rotaOperacaoPeca.js';
import rotaLogin from './Rotas/rotaLogin.js';
import { verificarAcesso } from './Seguranca/autenticacao.js';
import dotenv from 'dotenv';
import session from 'express-session';

const host = "0.0.0.0";
const porta = "3003"

dotenv.config();

const app = express();

//console.log(process.env);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SEGREDO,
    resolve: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login', rotaLogin);
app.use('/maquina', /*verificarAcesso, */rotaMaquina);
app.use('/peca', /*verificarAcesso,*/ rotaPeca);
app.use('/peca/:termo', rotaPeca);

app.use('/instrucao', /*verificarAcesso, */rotaInstrucao);
app.use('/instrucao/maquina/:termo', /*verificarAcesso, */rotaInstrucao);
//app.use('/maquinaoperacao', verificarAcesso, rotaMaquinaOperacao);
app.use('/operacao', /*verificarAcesso,*/ rotaOperacao);
app.use('/operacaopeca', /*verificarAcesso,*/ rotaOperacaoPeca);
app.use('/operacaopeca/:termo', rotaOperacaoPeca);

app.listen(porta, host, ()=>{
    console.log(`inicio`);
});