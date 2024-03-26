import Instrucao from "../Modelo/instrucao.js"
import MaquinaCtrl from "./maquinaCtrl.js";
import Maquina from "../Modelo/maquina.js"


export default class InstrucaoCtrl {


    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            if (dados && dados.descricao && dados.codigoMaquina) { 
                const { descricao, codigoMaquina } = dados; 
                
                const instrucao = new Instrucao(0, descricao, codigoMaquina);
    
                instrucao.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Instrucao gravada com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a instrucao:" + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça os dados da instrucao conforme a documentação da API!"+dados
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma instrucao!"
            });
        }
    }
    
    
    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const codigoMaquina = dados.codigoMaquina; // Alterado para autorCodigo
    
            if (codigo && descricao && codigoMaquina) {
                // Aqui vamos criar um objeto Autor com base no autorCodigo fornecido
                const maquina = new Maquina(codigoMaquina);
    
                const instrucao = new Instrucao(codigo, descricao, maquina);
                // Resolver a promise
                instrucao.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Instrucao atualizado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a instrucao:" + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da instrucao segundo a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma instrucao!"
            });
        }
    }
    

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const instrucao = new Instrucao(codigo);
                //resolver a promise
                instrucao.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Instrucao excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a instrucao:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da instrucao!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma instrucao!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        const originalUrl = requisicao.originalUrl;
        const parametros = originalUrl.split('/');
        let termo = parametros[parametros.length - 1];
        let listaInstrucoes = [];

        if(termo == ""){           
            const instrucao = new Instrucao();
            listaInstrucoes = await instrucao.consultar(termo);
        } else{                    
            const instrucao = new Instrucao();
            listaInstrucoes = await instrucao.consultar(termo);
        }
        
        if (requisicao.method === "GET") {
            const instrucao = new Instrucao();
            instrucao.consultar(termo).then((listaInstrucoes) => {
                resposta.json(
                    {
                        status: true,
                        listaInstrucoes
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter as instrucoes: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar instrucoes!"
            });
        }
    }
    async consultarMaquina(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        const originalUrl = requisicao.originalUrl;
        const parametros = originalUrl.split('/');
        let termo = parametros[parametros.length - 1];
        let listaInstrucoes = [];
        //console.log(termo);        
        const instrucao = new Instrucao();
        listaInstrucoes = await instrucao.consultarMaquina(termo);        
        
        if (requisicao.method === "GET") {
            const instrucao = new Instrucao();
            instrucao.consultarMaquina(termo).then((listaInstrucoes) => {
                resposta.json(
                    {
                        status: true,
                        listaInstrucoes
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter as instrucoes: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar instrucoes!"
            });
        }
    }


}