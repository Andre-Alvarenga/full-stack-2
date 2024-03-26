import { Router } from "express";
import OperacaoPecaCtrl from "../Controle/operacaoPecaCtrl.js";

const operacaoPecaCtrl = new OperacaoPecaCtrl();
const rotaOperacaoPeca = new Router();

rotaOperacaoPeca
    .post('/', operacaoPecaCtrl.associarOperacaoPeca)
    .delete('/', operacaoPecaCtrl.excluirOperacaoPeca)
    .get('/', operacaoPecaCtrl.consultarOperacaoPeca)
    .get('/:termo', operacaoPecaCtrl.consultarOperacaoPeca);

export default rotaOperacaoPeca;
