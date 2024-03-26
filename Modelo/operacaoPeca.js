// operacaoPeca.js
import OperacaoPecaDAO from "../Persistencia/operacaoPecaDAO.js";

export default class OperacaoPeca {
    constructor(codigoPeca, codigoOperacao,peca_descricao, operacao_descricao) {
        this.codigoPeca = codigoPeca;
        this.codigoOperacao = codigoOperacao;
        this.peca_descricao = peca_descricao;
        this.operacao_descricao = operacao_descricao;
    }

    toJson() {
        return {
            codigoPeca: this.codigoPeca,
            codigoOperacao: this.codigoOperacao,
            peca_descricao: this.peca_descricao,
            operacao_descricao: this.operacao_descricao
        };
    }

    async gravar() {
        const operacaoPecaDAO = new OperacaoPecaDAO();
        await operacaoPecaDAO.gravar(this);
    }

    async excluir() {
        const operacaoPecaDAO = new OperacaoPecaDAO();
        await operacaoPecaDAO.excluir(this);
    }

    async alterar() {
        const operacaoPecaDAO = new OperacaoPecaDAO();
        await operacaoPecaDAO.atualizar(this);
    }

    async consultar(termo) {
        const operacaoPecaDAO = new OperacaoPecaDAO();
        return await operacaoPecaDAO.consultar(termo);
    }
    async consultarOperacoesPeca(codigoPeca) {
        try {
            const operacaoPecaDAO = new OperacaoPecaDAO();
            return await operacaoPecaDAO.consultar(codigoPeca);
        } catch (error) {
            throw new Error(`Erro ao consultar operações da peça: ${error.message}`);
        }
    }
    async verificarAssociacaoExistente(pecaCodigo, operacaoCodigo) {
        try {
            const operacaoPecaDAO = new OperacaoPecaDAO();
            return await operacaoPecaDAO.verificarAssociacaoExistente(pecaCodigo, operacaoCodigo);
        } catch (error) {
            throw new Error(`Erro ao verificar associação entre operação e peça2: ${error.message}`);
        }
    }
    async gravarAssociacao(pecaCodigo, operacaoCodigo) {
        try {
            const operacaoPecaDAO = new OperacaoPecaDAO();
            return await operacaoPecaDAO.gravarAssociacao(pecaCodigo, operacaoCodigo);
        } catch (error) {
            throw new Error(`Erro ao gravar associação entre operação e peça: ${error.message}`);
        }
    }
    async associarOperacaoPeca() {
        try {            
            const operacao = await this.obterOperacaoPorNome(this.codigoOperacao);
            const peca = await this.obterPecaPorNome(this.codigoPeca);
            
            if (!operacao || !peca) {
                throw new Error("Operação ou peça não encontrada.");
            }
            
            const associacaoExistente = await this.verificarAssociacaoExistente(peca[0].peca_codigo, operacao[0].operacao_codigo);
            
            if (associacaoExistente) {
                throw new Error("Associação entre operação e peça já existe.");
            }
            
            await this.gravarAssociacao(peca[0].peca_codigo, operacao[0].operacao_codigo);

        } catch (erro) {
            throw new Error(`Erro ao associar operação e peça: ${erro.message}`);
        }
    }
   
    async obterOperacaoPorNome(nomeOperacao) {
        try {            
            const operacaoPecaDAO = new OperacaoPecaDAO();
            const operacao = await operacaoPecaDAO.obterOperacaoPorNomeBD(nomeOperacao);
            
            return operacao; 
        } catch (erro) {
            throw new Error(`Erro ao obter a operação por nome 3: ${erro.message}`);
        }
    }
    
    async obterPecaPorNome(nomePeca) {
        try {
            const operacaoPecaDAO = new OperacaoPecaDAO();
            const peca = await operacaoPecaDAO.obterPecaPorNomeBD(nomePeca);
            
            return peca; 
        } catch (erro) {
            throw new Error(`Erro ao obter a peça por nome: ${erro.message}`);
        }
    }
    async excluirOperacaoPeca() {
        try {
            const operacaoPecaDAO = new OperacaoPecaDAO();
            await operacaoPecaDAO.excluir(this);
        } catch (erro) {
            throw new Error(`Erro ao excluir a associação entre operação e peça: ${erro.message}`);
        }
    }
}
