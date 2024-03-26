import { Router } from "express";
import OperacaoCtrl from "../Controle/operacaoCtrl.js";

const operacaoCtrl = new OperacaoCtrl();
const rotaOperacao = new Router();

rotaOperacao
    .get('/', operacaoCtrl.consultar)
    .get('/:termo', operacaoCtrl.consultar)
    .post('/', operacaoCtrl.gravar)
    .put('/', operacaoCtrl.atualizar)
    .patch('/', operacaoCtrl.atualizar)
    .delete('/', operacaoCtrl.excluir);

export default rotaOperacao;
