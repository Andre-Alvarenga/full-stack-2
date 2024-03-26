import conectar from "./conexao.js";
import Operacao from "../Modelo/operacao.js";

export default class OperacaoDAO {
    async gravar(operacao) {
        if (!(operacao instanceof Operacao)) {
            throw new Error('O objeto passado não é uma instância de Operacao.');
        }

        try {
            const sql = `INSERT INTO operacao (operacao_descricao) VALUES (?)`;
            const parametros = [operacao.nome];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

        } catch (erro) {
            throw new Error(`Erro ao gravar a operação: ${erro.message}`);
        }
    }

    async atualizar(operacao) {
        if (!(operacao instanceof Operacao)) {
            throw new Error('O objeto passado não é uma instância de Operacao.');
        }

        try {
            const sql = `UPDATE operacao SET operacao_descricao = ? WHERE operacao_codigo = ?`;
            const parametros = [operacao.nome, operacao.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

        } catch (erro) {
            throw new Error(`Erro ao atualizar a operação: ${erro.message}`);
        }
    }

    async excluir(codigo) {
        try {
            const sql = `DELETE FROM operacao WHERE operacao_codigo = ?`;
            const parametros = [codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

        } catch (erro) {
            throw new Error(`Erro ao excluir a operação: ${erro.message}`);
        }
    }

    async consultar(termo) {
        try {
            const sql = `SELECT * FROM operacao WHERE operacao_descricao LIKE ?`;
            const parametros = [`%${termo}%`];

            const conexao = await conectar();
            const [rows] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            return rows;

        } catch (erro) {
            throw new Error(`Erro ao consultar a operação: ${erro.message}`);
        }
    }

}
