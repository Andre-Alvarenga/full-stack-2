import { Router } from "express";
import MaquinaOperacaoCtrl from "../Controle/maquinaOperacaoCtrl.js";

const maquinaOperacaoCtrl = new MaquinaOperacaoCtrl();
const rotaMaquinaOperacao = new Router();

rotaMaquinaOperacao
    .get('/', maquinaOperacaoCtrl.consultar)
    .post('/', maquinaOperacaoCtrl.associarOperacaoMaquina)
    .delete('/', maquinaOperacaoCtrl.excluirAssociacao);

export default rotaMaquinaOperacao;
