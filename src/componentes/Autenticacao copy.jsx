const jwt_decode = require('jwt-decode');
import jwt_decode from "jwt-decode";
const pegaAutenticacao = () => {
    
     const localStorageAutenticacao = localStorage.getItem('NODECRUDSEG/autenticacao');
     const autenticacao = localStorageAutenticacao ? 
                          JSON.parse(localStorageAutenticacao) : null;
     var dateNow = new Date();     
     var decoded = jwt_decode(autenticacao.token);
     if (decoded.exp < dateNow.getTime() - decoded.iat){
        return autenticacao;
     } else {
         return null;
     }     
}

module.exports.pegaAutenticacao = pegaAutenticacao;


const gravaAutenticacao = (json) => {
    localStorage.setItem('NODECRUDSEG/autenticacao',JSON.stringify(json));
}

module.exports.gravaAutenticacao = gravaAutenticacao;

const logout = () => {
    localStorage.removeItem('NODECRUDSEG/autenticacao');
}

module.exports.logout = logout;



