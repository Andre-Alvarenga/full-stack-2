import { Router } from "express";
import MaquinaCtrl from "../Controle/maquinaCtrl.js";

const maqCtrl = new MaquinaCtrl();
const rotaMaquinas = new Router();

rotaMaquinas
.post('/', maqCtrl.gravar)
.put('/', maqCtrl.atualizar)
.patch('/', maqCtrl.atualizar)
.get('/', maqCtrl.consultar)
.get('/:termo', maqCtrl.consultar)
.delete('/', maqCtrl.excluir)

export default rotaMaquinas;