import InstrucaoDAO from "../Persistencia/instrucaoDAO.js";



export default class Instrucao {

    #codigo;
    #descricao;
    #maquina;


    constructor(codigo = 0, descricao = '', maquina={}) 
    {
        this.codigo = codigo;
        this.#descricao = descricao;
        this.#maquina = maquina;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(codigo) {
        this.#codigo = codigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(descricao) {
        this.#descricao = descricao;
    }

    get maquina() {
        return this.#maquina;
    }

    set maquina(maquina) {
        this.#maquina = maquina;
    }

    toJson() {
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            maquina:this.#maquina,
        }
    }

    async gravar(){
        const instrucaoDAO = new InstrucaoDAO();
        await instrucaoDAO.gravar(this);
     }
 
     async excluir(){
        const instrucaoDAO = new InstrucaoDAO();
        await instrucaoDAO.excluir(this);
     }
 
     async alterar(){
        const instrucaoDAO = new InstrucaoDAO();
        await instrucaoDAO.atualizar(this);
     }
 
     async consultar(termo){
        const instrucaoDAO = new InstrucaoDAO();
        return await instrucaoDAO.consultar(termo);
     }
}