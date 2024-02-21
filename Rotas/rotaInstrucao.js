import { Router } from "express";
import InstrucaoCtrl from "../Controle/instrucaoCtrl.js";

const instrucaoCtrl = new InstrucaoCtrl();
const rotaInstrucao = new Router();

rotaInstrucao
.get('/', instrucaoCtrl.consultar)
.get('/:termo', instrucaoCtrl.consultar)
.post('/', instrucaoCtrl.gravar)
.patch('/', instrucaoCtrl.atualizar)
.put('/', instrucaoCtrl.atualizar)
.delete('/', instrucaoCtrl.excluir);


export default rotaInstrucao;