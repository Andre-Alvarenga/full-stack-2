import PecaDAO from "../Persistencia/pecaDAO.js";

export default class Peca {
    #codigo;
    #nome;

    constructor(codigo = 0, nome = '') {
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

    toJson() {
        return {
            codigo: this.#codigo,
            nome: this.#nome
        };
    }

    async gravar() {
        try {
            const pecaDAO = new PecaDAO();
            await pecaDAO.gravar(this);
        } catch (erro) {
            throw new Error(`Erro ao gravar a peça: ${erro.message}`);
        }
    }

    async excluir() {
        try {
            const pecaDAO = new PecaDAO();
            await pecaDAO.excluir(this);
        } catch (erro) {
            throw new Error(`Erro ao excluir a peça: ${erro.message}`);
        }
    }

    async atualizar() {
        try {
            const pecaDAO = new PecaDAO();
            await pecaDAO.atualizar(this);
        } catch (erro) {
            throw new Error(`Erro ao atualizar a peça: ${erro.message}`);
        }
    }

    async consultar(parametro) {
        try {
            const pecaDAO = new PecaDAO();
            return await pecaDAO.consultar(parametro);
        } catch (erro) {
            throw new Error(`Erro ao consultar a peça: ${erro.message}`);
        }
    }
    async consultarCodigo(parametro) {
        try {
            const pecaDAO = new PecaDAO();
            return await pecaDAO.consultarCodigo(parametro);
        } catch (erro) {
            throw new Error(`Erro ao consultar a peça: ${erro.message}`);
        }
    }
}
