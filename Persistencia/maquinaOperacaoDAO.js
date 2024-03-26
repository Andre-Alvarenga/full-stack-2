import conectar from "./conexao.js";

export default class MaquinaOperacaoDAO {
    async associarMaquinaOperacao(maquinaCodigo, operacaoCodigo) {
        try {
            const sql = `INSERT INTO maquina_operacao (maquina_codigo, operacao_codigo) VALUES (?, ?)`;
            const parametros = [maquinaCodigo, operacaoCodigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

        } catch (erro) {
            throw new Error(`Erro ao associar máquina e operação: ${erro.message}`);
        }
    }

    async desassociarMaquinaOperacao(maquinaCodigo, operacaoCodigo) {
        try {
            const sql = `DELETE FROM maquina_operacao WHERE maquina_codigo = ? AND operacao_codigo = ?`;
            const parametros = [maquinaCodigo, operacaoCodigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

        } catch (erro) {
            throw new Error(`Erro ao desassociar máquina e operação: ${erro.message}`);
        }
    }

    async obterOperacoesPorMaquina(maquinaCodigo) {
        try {
            const sql = `SELECT operacao_codigo FROM maquina_operacao WHERE maquina_codigo = ?`;
            const parametros = [maquinaCodigo];

            const conexao = await conectar();
            const [registros] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            return registros.map(registro => registro.operacao_codigo);

        } catch (erro) {
            throw new Error(`Erro ao obter operações associadas à máquina: ${erro.message}`);
        }
    }

    async obterMaquinasPorOperacao(operacaoCodigo) {
        try {
            const sql = `SELECT maquina_codigo FROM maquina_operacao WHERE operacao_codigo = ?`;
            const parametros = [operacaoCodigo];

            const conexao = await conectar();
            const [registros] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            return registros.map(registro => registro.maquina_codigo);

        } catch (erro) {
            throw new Error(`Erro ao obter máquinas associadas à operação: ${erro.message}`);
        }
    }
}
