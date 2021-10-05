import jwt_decode from "jwt-decode";


const pegaAutenticacao = () => {

    const localStorageAutenticacao = localStorage.getItem('NODECRUDSEG/autenticacao');
    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;      
    var decoded = jwt_decode(autenticacao.token);
    // verificando se o token não expirou
    if (decoded.exp <= Math.floor(new Date() / 1000)) {
        console.log('Token expirado');
        logout();
        return null;
    } else {
        console.log('Token não expirado');
        return autenticacao;
    }
}


const gravaAutenticacao = (json) => {
    localStorage.setItem('NODECRUDSEG/autenticacao', JSON.stringify(json));
}

const logout = () => {
   // localStorage.removeItem('NODECRUDSEG/autenticacao');
   localStorage.setItem('NODECRUDSEG/autenticacao', JSON.stringify({"auth":false,"token":""}));
}

export default pegaAutenticacao;
export { gravaAutenticacao, logout };



