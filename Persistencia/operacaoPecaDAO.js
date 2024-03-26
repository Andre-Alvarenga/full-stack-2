import conectar from "./conexao.js";
import OperacaoPeca from "../Modelo/operacaoPeca.js";
import PecaDAO from "./pecaDAO.js";
import OperacaoDAO from "./operacaoDAO.js";

export default class OperacaoPecaDAO {
    async gravar(pecaNova, operacaoNova) {
        try {
            const pecaDAO = new PecaDAO();
            const operacaoDAO = new OperacaoDAO();

            // Verificar se a peça já existe
            let pecaCodigo = await pecaDAO.obterCodigoPorNome(pecaNova.nome);
            if (!pecaCodigo) {
                // Se a peça não existir, gravá-la e obter o código gerado
                await pecaDAO.gravar(pecaNova);
                pecaCodigo = pecaNova.codigo;
            }

            // Verificar se a operação já existe
            let operacaoCodigo = await operacaoDAO.obterCodigoPorNome(operacaoNova.nome);
            if (!operacaoCodigo) {
                // Se a operação não existir, gravá-la e obter o código gerado
                await operacaoDAO.gravar(operacaoNova);
                operacaoCodigo = operacaoNova.codigo;
            }

            // Gravar a associação entre a peça e a operação
            const sql = `INSERT INTO peca_operacao (peca_codigo, operacao_codigo) VALUES (?, ?)`;
            const parametros = [pecaCodigo, operacaoCodigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

        } catch (erro) {
            throw new Error(`Erro ao gravar a associação entre peça e operação: ${erro.message}`);
        }
    }

    async atualizar(operacaoPeca) {
        try {
            if (operacaoPeca instanceof OperacaoPeca) {
                const sql = `UPDATE peca_operacao SET operacao_codigo = ? WHERE peca_codigo = ?`;
                const parametros = [operacaoPeca.operacaoCodigo, operacaoPeca.pecaCodigo];
    
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            } else {
                throw new Error('O objeto fornecido não é uma instância válida de OperacaoPeca.');
            }
        } catch (erro) {
            throw new Error(`Erro ao atualizar a associação entre peça e operação: ${erro.message}`);
        }
    }
    
    async excluir(operacaoPeca) {
        try {
            if (operacaoPeca instanceof OperacaoPeca) {
                const sql = `DELETE FROM peca_operacao WHERE peca_codigo = ? AND operacao_codigo = ?`;
                const parametros = [operacaoPeca.codigoPeca, operacaoPeca.codigoOperacao];
    
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            } else {
                throw new Error('O objeto fornecido não é uma instância válida de OperacaoPeca.');
            }
        } catch (erro) {
            throw new Error(`Erro ao excluir a associação entre peça e operação: ${erro.message}`);
        }
    }

    async consultar(termo) {
        try {
            const sql = `SELECT * FROM peca_operacao PO INNER JOIN peca P ON PO.peca_codigo = P.peca_codigo INNER JOIN operacao O ON PO.operacao_codigo = O.operacao_codigo WHERE PO.peca_codigo = ?`;
            const parametros = [`${termo}`];
    
            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
    
            // Mapear os resultados para objetos OperacaoPeca
            const operacoesPeca = resultados.map((resultado) => {
                return new OperacaoPeca(resultado.peca_codigo, resultado.operacao_codigo, resultado.peca_descricao, resultado.operacao_descricao);
            });
    
            return operacoesPeca;
        } catch (erro) {
            throw new Error(`Erro ao consultar a associação entre peça e operação: ${erro.message}`);
        }
    }
    async obterOperacaoPorNomeBD(termo) {
        try {
            const sql = `SELECT * FROM operacao WHERE operacao_descricao = ? OR operacao_codigo = ?`;
            const parametros = [`${termo}`, `${termo}`];
    
            const conexao = await conectar();
            const [rows] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            

            // Se não houver resultados, retornar null
            if (rows.length === 0) {
                return null;
            }
            //console.log(rows);
            //console.log(termo);
            return rows;
        } catch (erro) {
            throw new Error(`Erro ao consultar a operação: ${erro.message}`);
        }
    }
    
    async obterPecaPorNomeBD(termo) {
        try {
            const sql = `SELECT * FROM peca WHERE peca_nome = ? OR peca_codigo = ?`;
            const parametros = [`${termo}`, `${termo}`];
    
            const conexao = await conectar();
            const [rows] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            
            // Se não houver resultados, retornar null
            if (rows.length === 0) {
                return null;
            }
            //console.log(termo);
            //console.log(rows);
            return rows;
        } catch (erro) {
            throw new Error(`Erro ao consultar a peça: ${erro.message}`);
        }
    }
    
    async verificarAssociacaoExistente(peca, operacao) {
        try {
            const sql = `SELECT * FROM peca_operacao WHERE peca_codigo = ? AND operacao_codigo = ?`;
            const valores = [peca, operacao];

            const conexao = await conectar();
            const [rows] = await conexao.execute(sql, valores);
            global.poolConexoes.releaseConnection(conexao);

            return rows.length > 0;
        } catch (erro) {
            throw new Error(`Erro ao verificar a associação entre peça e operação: ${erro.message}`);
        }
    }
    async gravarAssociacao(peca, operacao) {
        try {
            const sql = `INSERT INTO peca_operacao (peca_codigo, operacao_codigo) VALUES (?, ?)`;
            const valores = [peca, operacao];

            const conexao = await conectar();
            await conexao.execute(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        } catch (erro) {
            throw new Error(`Erro ao gravar a associação entre peça e operação: ${erro.message}`);
        }
    }
}
