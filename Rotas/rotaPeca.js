import { Router } from "express";
import PecaCtrl from "../Controle/pecaCtrl.js";

const pecaCtrl = new PecaCtrl();
const rotaPeca = new Router();

rotaPeca
    .post('/', pecaCtrl.gravar)
    .put('/', pecaCtrl.atualizar)
    .delete('/', pecaCtrl.excluir)
    .get('/:termo', pecaCtrl.consultar)
    .get('/', pecaCtrl.consultar);
    

export default rotaPeca;
