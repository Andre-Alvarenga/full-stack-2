// operacao.js

import OperacaoDAO from "../Persistencia/operacaoDAO.js";

export default class Operacao {
    #codigo;
    #nome;

    constructor(codigo, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(codigo) {
        this.#codigo = codigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }
    async consultar(parametro) {
        try {
            const operacaoDAO = new OperacaoDAO();
            return await operacaoDAO.consultar(parametro);
        } catch (erro) {
            throw new Error(`Erro ao consultar a operação: ${erro.message}`);
        }
    }
    async gravar() {
        try {
            const operacaoDAO = new OperacaoDAO();
            await operacaoDAO.gravar(this);
        } catch (erro) {
            throw new Error(`Erro ao gravar a operação: ${erro.message}`);
        }
    }

    async excluir() {
        try {
            const operacaoDAO = new OperacaoDAO();
            await operacaoDAO.excluir(this.#codigo);
        } catch (erro) {
            throw new Error(`Erro ao excluir a operação: ${erro.message}`);
        }
    }

    async atualizar() {
        try {
            const operacaoDAO = new OperacaoDAO();
            await operacaoDAO.atualizar(this);
        } catch (erro) {
            throw new Error(`Erro ao atualizar a operação: ${erro.message}`);
        }
    }
    toJson() {
        return {
            codigo: this.#codigo,
            nome: this.#nome
        };
    }
}
