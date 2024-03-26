import MaquinaOperacaoDAO from "../Persistencia/maquinaOperacaoDAO.js";

export default class MaquinaOperacao {
    #maquinaCodigo;
    #operacaoCodigo;

    constructor(maquinaCodigo, operacaoCodigo) {
        this.#maquinaCodigo = maquinaCodigo;
        this.#operacaoCodigo = operacaoCodigo;
    }

    get maquinaCodigo() {
        return this.#maquinaCodigo;
    }

    set maquinaCodigo(maquinaCodigo) {
        this.#maquinaCodigo = maquinaCodigo;
    }

    get operacaoCodigo() {
        return this.#operacaoCodigo;
    }

    set operacaoCodigo(operacaoCodigo) {
        this.#operacaoCodigo = operacaoCodigo;
    }

    toJson() {
        return {
            maquinaCodigo: this.#maquinaCodigo,
            operacaoCodigo: this.#operacaoCodigo
        };
    }

    async gravar() {
        const maquinaOperacaoDAO = new MaquinaOperacaoDAO();
        await maquinaOperacaoDAO.gravar(this);
    }

    async excluir() {
        const maquinaOperacaoDAO = new MaquinaOperacaoDAO();
        await maquinaOperacaoDAO.excluir(this);
    }

    async atualizar() {
        const maquinaOperacaoDAO = new MaquinaOperacaoDAO();
        await maquinaOperacaoDAO.atualizar(this);
    }
}
