import Peca from "../Modelo/peca.js";

export default class PecaCtrl {
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                const nome = dados.nome;
                if (nome) {
                    const peca = new Peca(0, nome);
                    await peca.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Peça incluída com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o nome da Peça!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar a peça: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma peça!"
            });
        }
    }
    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                const codigo = dados.codigo;
                const nome = dados.nome;
                if (codigo && nome) {
                    const peca = new Peca(codigo, nome);
                    await peca.atualizar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Peça atualizada com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o código e o nome da peça!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao atualizar a peça: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma peça!"
            });
        }
    }

    // Implementação do método de exclusão
    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                const codigo = dados.codigo;
                if (codigo) {
                    const peca = new Peca(codigo);
                    await peca.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Peça excluída com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o código da peça!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao excluir a peça: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma peça!"
            });
        }
    }

    // Implementação do método de consulta
    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            try {
                const originalUrl = requisicao.originalUrl;
                const parametros = originalUrl.split('/');
                let termo = parametros[parametros.length - 1];
                let listaPecas = [];
                
                if(termo == "peca" || termo == ""){
                    termo = "";                    
                    const peca = new Peca();    
                    listaPecas = await peca.consultar(termo);
                } else{                    
                    const peca = new Peca();
                    listaPecas = await peca.consultarCodigo(termo);
                }
                                
                resposta.json({
                    status: true,
                    listaPecas
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter as peças: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar peças!"
            });
        }
    }
}
