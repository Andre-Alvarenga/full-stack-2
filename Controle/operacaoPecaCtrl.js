import OperacaoPeca from "../Modelo/operacaoPeca.js";

export default class OperacaoPecaCtrl {

    // Método para associar uma operação a uma peça
    async associarOperacaoPeca(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nomePeca = dados.nomePeca;
            const nomeOperacao = dados.nomeOperacao;

            try {
                // Criar uma nova instância de OperacaoPeca
                const operacaoPeca = new OperacaoPeca(nomePeca, nomeOperacao,"","");
                // Chamar o método para associar operação e peça
                await operacaoPeca.associarOperacaoPeca();
                // Responder com uma mensagem de sucesso
                resposta.status(200).json({
                    status: true,
                    mensagem: "Operação associada à peça com sucesso!"
                });
            } catch (erro) {
                // Se ocorrer um erro, responder com uma mensagem de erro
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao associar operação à peça 1: " + erro.message
                });
            }
        } else {
            // Se o método da requisição não for POST ou não for JSON, responder com uma mensagem de erro
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método POST e forneça dados no formato JSON para associar operação à peça!"
            });
        }
    }

    async atualizarOperacaoPeca(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idAssociacao = dados.id; // Supondo que você tenha uma identificação única para a associação
            const novoNomePeca = dados.novoNomePeca;
            const novoNomeOperacao = dados.novoNomeOperacao;

            try {
                // Criar uma nova instância de OperacaoPeca
                const operacaoPeca = new OperacaoPeca(novoNomePeca, novoNomeOperacao);
                // Chamar o método para atualizar a associação operação-peça
                await operacaoPeca.atualizarOperacaoPeca(idAssociacao);
                // Responder com uma mensagem de sucesso
                resposta.status(200).json({
                    status: true,
                    mensagem: "Associação operação-peça atualizada com sucesso!"
                });
            } catch (erro) {
                // Se ocorrer um erro, responder com uma mensagem de erro
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao atualizar associação operação-peça: " + erro.message
                });
            }
        } else {
            // Se o método da requisição não for PUT ou não for JSON, responder com uma mensagem de erro
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método PUT e forneça dados no formato JSON para atualizar a associação operação-peça!"
            });
        }
    }
    async consultarOperacaoPeca(requisicao, resposta) {
        resposta.type('application/json');
        const operacaoPeca = new OperacaoPeca();

        // Verificar o método da requisição
        if (requisicao.method === 'GET') {
            try {
                const originalUrl = requisicao.originalUrl;
                const parametros = originalUrl.split('/');
                let termo = parametros[parametros.length - 1];
                let listaOperacoesPeca = [];

                if(termo == "peca" || termo == ""){
                    
                } else{                    
                    listaOperacoesPeca = await operacaoPeca.consultarOperacoesPeca(termo);
                    // Responder com a lista de operações associadas à peça
                    resposta.status(200).json({
                        status: true,
                        operacoesPeca: listaOperacoesPeca
                    });
                }

                
            } catch (erro) {
                // Se ocorrer um erro, responder com uma mensagem de erro
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar associações entre operações e peçasss: " + erro.message
                });
            }
        } else {
            // Se o método da requisição não for GET, responder com uma mensagem de erro
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método GET para consultar associações entre operações e peças!"
            });
        }
    }
    
    async excluirOperacaoPeca(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idPeca = dados.idPeca;
            const idOperacao = dados.idOperacao;

            try {
                // Criar uma nova instância de OperacaoPeca
                const operacaoPeca = new OperacaoPeca(idPeca, idOperacao,"","");
                // Chamar o método para excluir a associação entre operação e peça
                await operacaoPeca.excluirOperacaoPeca();
                // Responder com uma mensagem de sucesso
                resposta.status(200).json({
                    status: true,
                    mensagem: "Associação entre operação e peça excluída com sucesso!"
                });
            } catch (erro) {
                // Se ocorrer um erro, responder com uma mensagem de erro
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao excluir associação entre operação e peça: " + erro.message
                });
            }
        } else {
            // Se o método da requisição não for DELETE ou não for JSON, responder com uma mensagem de erro
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método DELETE e forneça dados no formato JSON para excluir associação entre operação e peça!"
            });
        }
    }
}
