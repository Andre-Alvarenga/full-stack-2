import MaquinaOperacao from "../Modelo/maquinaOperacao.js";

export default class MaquinaOperacaoCtrl {
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                const nomeMaquina = dados.nomeMaquina;
                const nomeOperacao = dados.nomeOperacao;
                
                if (nomeMaquina && nomeOperacao) {
                    const maquinaOperacao = new MaquinaOperacao(nomeMaquina, nomeOperacao);
                    await maquinaOperacao.associarOperacaoMaquina();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Associação entre operação e máquina realizada com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o nome da máquina e da operação!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao associar operação e máquina: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para associar operação e máquina!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                const nomeMaquina = dados.nomeMaquina;
                const nomeOperacao = dados.nomeOperacao;
                
                if (nomeMaquina && nomeOperacao) {
                    const maquinaOperacao = new MaquinaOperacao(nomeMaquina, nomeOperacao);
                    await maquinaOperacao.desassociarOperacaoMaquina();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Desassociação entre operação e máquina realizada com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o nome da máquina e da operação!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao desassociar operação e máquina: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para desassociar operação e máquina!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                const nomeMaquinaAntiga = dados.nomeMaquinaAntiga;
                const nomeOperacaoAntiga = dados.nomeOperacaoAntiga;
                const nomeMaquinaNova = dados.nomeMaquinaNova;
                const nomeOperacaoNova = dados.nomeOperacaoNova;
                
                if (nomeMaquinaAntiga && nomeOperacaoAntiga && nomeMaquinaNova && nomeOperacaoNova) {
                    const maquinaOperacao = new MaquinaOperacao(nomeMaquinaAntiga, nomeOperacaoAntiga);
                    await maquinaOperacao.atualizarOperacaoMaquina(nomeMaquinaNova, nomeOperacaoNova);
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Associação entre operação e máquina atualizada com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe os nomes da máquina e da operação antigos e novos!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao atualizar associação entre operação e máquina: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar associação entre operação e máquina!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');

        try {
            if (requisicao.method === "GET") {
                // Recuperar o termo de busca, se houver
                const termo = requisicao.params.termo || "";

                // Consultar associações entre operações e máquinas com base no termo
                const maquinaOperacao = new MaquinaOperacao();
                const resultados = await maquinaOperacao.consultarAssociacoes(termo);

                // Responder com os resultados da consulta
                resposta.status(200).json({
                    status: true,
                    associacoes: resultados
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, utilize o método GET para consultar associações entre operações e máquinas!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: "Erro ao consultar associações entre operações e máquinas: " + erro.message
            });
        }
    }
}
