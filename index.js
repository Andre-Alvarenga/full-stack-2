import express from 'express';
import cors from 'cors';
import rotaMaquina from './Rotas/rotaMaquina.js';
import rotaInstrucao from './Rotas/rotaInstrucao.js'

const host = "0.0.0.0";
const porta = "3000"

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/maquina', rotaMaquina);
app.use('/instrucao', rotaInstrucao)

app.listen(porta, host, ()=>{
    console.log(`inicio`);
});