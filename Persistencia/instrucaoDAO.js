import Instrucao from "../Modelo/instrucao.js";
import Maquina from "../Modelo/maquina.js";
import conectar from "./conexao.js";


export default class InstrucaoDAO{
    async gravar(instrucao){
        if (instrucao instanceof Instrucao) {
            const sql = `INSERT INTO instrucao(instrucao_descricao, maquina_codigo)
                VALUES(?,?)`;
            const parametros = [instrucao.descricao, instrucao.codMaquina];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            instrucao.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(instrucao){
        if (instrucao instanceof Instrucao) {
            const sql = `UPDATE instrucao SET instrucao_descricao = ?, maquina_codigo = ?
            WHERE instrucao_codigo = ?`;
            const parametros = [instrucao.descricao, instrucao.maquina.codigo, instrucao.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(instrucao){
        if (instrucao instanceof Instrucao) {
            const sql = `DELETE FROM instrucao WHERE instrucao_codigo = ?`;
            const parametros = [instrucao.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

     async consultar(termo) {
        if (termo === undefined || termo === null) {
            termo = ""; // Define termo como uma string vazia apenas se for undefined ou null
        }
        
        //termo é um número
        const conexao = await conectar();
        let listaInstrucoes = [];
        if (termo === "") {
            
            const sql = `SELECT i.instrucao_codigo, i.instrucao_descricao, m.maquina_codigo, m.maquina_codigo
              FROM instrucao i 
              INNER JOIN maquina m ON i.maquina_codigo = m.maquina_codigo              
             ORDER BY i.instrucao_descricao              
            `;            
            const [registros] = await conexao.execute(sql);
            for (const registro of registros){
                const maquina = new Maquina(registro.maquina_codigo, registro.maquina_nome);
                const instrucao = new Instrucao(registro.instrucao_codigo, registro.instrucao_descricao, registro.maquina_codigo);
                listaInstrucoes.push({
                    codigo: instrucao.codigo,
                    descricao: instrucao.descricao,
                    maquina: instrucao.codMaquina
                });
            }
        }
        else
        {            
            //consulta pelo titulo do livro
            const sql = `
              SELECT i.instrucao_codigo, i.instrucao_descricao, m.maquina_codigo, m.maquina_nome
              FROM instrucao i 
              INNER JOIN maquina m ON i.maquina_codigo = m.maquina_codigo
              WHERE i.instrucao_codigo = ?
              ORDER BY i.instrucao_descricao   
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const maquina = new Maquina(registro.maquina_codigo, registro.maquina_nome);
                const instrucao = new Instrucao(registro.instrucao_codigo,registro.instrucao_descricao, registro.maquina_codigo);
                listaInstrucoes.push({
                    codigo: instrucao.codigo,
                    descricao: instrucao.descricao,
                    maquina: instrucao.codMaquina
                });
                
            }
        }

        return listaInstrucoes;
    }
    async consultarMaquina(termo) {
        if (termo === undefined || termo === null) {
            termo = ""; // Define termo como uma string vazia apenas se for undefined ou null
        }
        
        //termo é um número
        const conexao = await conectar();
        let listaInstrucoes = [];
        
        const sql = `
            SELECT i.instrucao_codigo, i.instrucao_descricao, m.maquina_codigo, m.maquina_nome
            FROM instrucao i 
            INNER JOIN maquina m ON i.maquina_codigo = m.maquina_codigo
            WHERE m.maquina_codigo = ?
            ORDER BY i.instrucao_descricao   
        `;
        const parametros=[termo];
        const [registros, campos] = await conexao.execute(sql,parametros);
        for (const registro of registros){
            const maquina = new Maquina(registro.maquina_codigo, registro.maquina_nome);
            const instrucao = new Instrucao(registro.instrucao_codigo,registro.instrucao_descricao,registro.maquina_codigo);
            listaInstrucoes.push({
                codigo: instrucao.codigo,
                descricao: instrucao.descricao,
                maquina: instrucao.codMaquina
            });
            
        }
        

        return listaInstrucoes;
    }
}