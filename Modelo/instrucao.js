import InstrucaoDAO from "../Persistencia/instrucaoDAO.js";



export default class Instrucao {

    #codigo;
    #descricao;
    codMaquina;


    constructor(codigo = 0, descricao = '', codMaquina) 
    {
        this.codigo = codigo;
        this.#descricao = descricao;
        this.codMaquina = codMaquina;
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
        return this.codMaquina;
    }

    set maquina(codMaquina) {
        this.codMaquina = codMaquina;
    }

    toJson() {
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            codMaquina:this.codMaquina,
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
     async consultarMaquina(termo){
        const instrucaoDAO = new InstrucaoDAO();
        return await instrucaoDAO.consultarMaquina(termo);
     }


}