import MaquinaDAO from "../Persistencia/maquinaDAO.js"


export default class Maquina {

    #codigo;
    #nome;

    constructor(codigo = 0, nome = '')
    {
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

    toJson()
    {
        return {
            codigo: this.#codigo,
            nome: this.#nome
        }
    }

    async gravar(){
        const maqDAO = new MaquinaDAO();
        await maqDAO.gravar(this);
    }

    async excluir(){
        const maqDAO = new MaquinaDAO();
        await maqDAO.excluir(this);
    }

    async atualizar(){
        const maqDAO = new MaquinaDAO();
        await maqDAO.atualizar(this);

    }

    async consultar(parametro){
        const maqDAO = new MaquinaDAO();
        return await maqDAO.consultar(parametro);
    }
}