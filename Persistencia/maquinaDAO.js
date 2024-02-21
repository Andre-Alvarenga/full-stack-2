import Maquina from "../Modelo/maquina.js";
import conectar from "./conexao.js";



export default class MaquinaDAO {
    async gravar(maquina){
        if (maquina instanceof Maquina){
            const sql = "INSERT INTO maquina(maquina_nome) VALUES(?)"; 
            const parametros = [maquina.nome];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql,parametros); 
            maquina.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(maquina){
        if (maquina instanceof Maquina){
            const sql = "UPDATE maquina SET maquina_nome = ? WHERE maquina_codigo = ?"; 
            const parametros = [maquina.nome, maquina.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(maquina){
        if (maquina instanceof Maquina){
            const sql = "DELETE FROM maquina WHERE maquina_codigo = ?"; 
            const parametros = [maquina.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];

        if (!isNaN(parseInt(parametroConsulta))){
            sql='SELECT * FROM maquina WHERE maquina_codigo = ? order by maquina_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM maquina WHERE maquina_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaMaquinas = [];
        for (const registro of registros){
            const maquina = new Maquina(registro.maquina_codigo,registro.maquina_nome);
            listaMaquinas.push({
                codigo: maquina.codigo,
                nome: maquina.nome
            });
            console.log(listaMaquinas)
        }
        return listaMaquinas;
    }
}