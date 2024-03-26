import conectar from "./conexao.js";
import Peca from "../Modelo/peca.js";

export default class PecaDAO {
    async gravar(peca) {
        try {
            if (peca instanceof Peca) {
                const sql = `INSERT INTO peca (peca_nome) VALUES (?)`;
                const parametros = [peca.nome];

                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            throw new Error(`Erro ao gravar a peça: ${erro.message}`);
        }
    }

    async obterCodigoPorNome(nome) {
        try {
            const sql = `SELECT peca_codigo FROM peca WHERE peca_nome = ?`;
            const parametros = [nome];

            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            if (resultados.length > 0) {
                return resultados[0].codigo;
            } else {
                return null;
            }
        } catch (erro) {
            throw new Error(`Erro ao obter o código da peça: ${erro.message}`);
        }
    }

    async atualizar(peca) {
        try {
            if (peca instanceof Peca) {
                const sql = `UPDATE peca SET peca_nome = ? WHERE peca_codigo = ?`;
                const parametros = [peca.nome, peca.codigo];

                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            throw new Error(`Erro ao atualizar a peça: ${erro.message}`);
        }
    }

    async excluir(peca) {
        try {
            const sql = `DELETE FROM peca WHERE peca_codigo = ?`;
            const parametros = [peca.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        } catch (erro) {
            throw new Error(`Erro ao excluir a speça: ${erro.message}`);
        }
    }
    
    async consultar(termo) {
        try {
            const sql = `SELECT * FROM peca WHERE peca_nome LIKE ?`;
            const parametros = [`%${termo}%`];

            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            return resultados;
        } catch (erro) {
            throw new Error(`Erro ao consultar as peças: ${erro.message}`);
        }
    }
    async consultarCodigo(termo) {
        try {
            const sql = `SELECT * FROM peca WHERE peca_codigo = ?`;
            const parametros = [`${termo}`];

            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            return resultados;
        } catch (erro) {
            throw new Error(`Erro ao consultar as peças: ${erro.message}`);
        }
    }
}
