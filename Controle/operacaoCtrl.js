import Operacao from "../Modelo/operacao.js";

export default class OperacaoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            // Verificar se o nome da operação foi fornecido
            if (nome) {
                const operacao = new Operacao(0, nome); // Criar uma nova instância de Operacao
                // Resolver a promise para gravar a operação no banco de dados
                operacao.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "nome": operacao.nome,
                        "mensagem": "Operação incluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a operação: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome da operação!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma operação!"
            });
        }
    }
    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            // Verificar se o código e o nome da operação foram fornecidos
            if (codigo && nome) {
                const operacao = new Operacao(codigo, nome); // Criar uma nova instância de Operacao
                // Resolver a promise para atualizar a operação no banco de dados
                operacao.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Operação atualizada com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a operação: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e o nome da operação!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma operação!"
            });
        }
    }

    // Método para excluir uma operação existente
    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            // Verificar se o código da operação foi fornecido
            if (codigo) {
                const operacao = new Operacao(codigo); // Criar uma nova instância de Operacao
                // Resolver a promise para excluir a operação do banco de dados
                operacao.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Operação excluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a operação: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da operação!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma operação!"
            });
        }
    }
    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        // Obter o termo de busca da requisição
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = ""; // Se nenhum termo for fornecido, definir como uma string vazia
        }
        if (requisicao.method === "GET") {
            // Criar uma nova instância de Operacao
            const operacao = new Operacao();
            try {
                // Chamar o método consultar no modelo Operacao
                const listaOperacoes = await operacao.consultar(termo);
                // Responder com um JSON contendo a lista de operações encontradas
                resposta.status(200).json({
                    status: true,
                    listaOperacoes
                });
            } catch (erro) {
                // Se ocorrer um erro ao consultar, responder com uma mensagem de erro
                resposta.status(500).json({
                    status: false,
                    mensagem: "Não foi possível obter as operações: " + erro.message
                });
            }
        } else {
            // Se o método da requisição não for GET, responder com uma mensagem de erro
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar operações!"
            });
        }
    }
}
