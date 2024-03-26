import { assinar } from "./funcoesJWT.js";
import { verificarAssinatura } from "./funcoesJWT.js";

export function autenticar(requisicao, resposta) {
    const { usuario, senha } = requisicao.body;

    // Verifica se o usuário e a senha correspondem ao administrador
    if (usuario === 'admin' && senha === 'admin') {
        requisicao.session.usuarioAutenticado = usuario;
        resposta.json({ 
            "status": true, 
            "token": assinar({ usuario }) 
        });
    } else {
        requisicao.session.usuarioAutenticado = null;
        resposta.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
}
export function verificarAcesso(requisicao, resposta, next){

    const token = requisicao.headers['authorization'];
    let tokenDecodificado = '';
    if(token){
        tokenDecodificado = verificarAssinatura(token);
    }    

    if(tokenDecodificado.usuario.usuario == requisicao.session.usuarioAutenticado){
        next();
    }else{
        resposta.status(401).json({ 
            "status": false, 
            "mensagem": "Acesso não autorizado. Faça o login na aplicação!" 
        });
    }
}