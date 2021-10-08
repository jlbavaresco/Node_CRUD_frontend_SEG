import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";


const AutenticacaoContext = createContext({})

export const AuthProvider = ({ children }) => {
    
    const [autenticacao, setAutenticacao] = useState(null);
    
    const pegaAutenticacao = () => {

        const localStorageAutenticacao = localStorage.getItem('NODECRUDSEG/autenticacao');
        const autenticacao = localStorageAutenticacao ?
            JSON.parse(localStorageAutenticacao) : null;
        console.log("autenticação: " + JSON.stringify(autenticacao));
        if (autenticacao.auth === false) {
            return null;
        } else {
            var decoded = jwt_decode(autenticacao.token);
            // verificando se o token não expirou
            if (decoded.exp <= Math.floor(new Date() / 1000)) {
                console.log('Token expirado');
                logout();
                return null;
            } else {
                console.log('Token não expirado');
                //setAutenticacao(autenticacao);
                return autenticacao;
            }
        }
    }


    const gravaAutenticacao = (json) => {
        // decodificando para pegar o nome de usuário
        const decodificado = jwt_decode(json.token);
        json.nome_usuario = decodificado.nome_usuario; 
        setAutenticacao(json);
        console.log("autenticacao no grava autenticacao: " + JSON.stringify(json))       ;
        localStorage.setItem('NODECRUDSEG/autenticacao', JSON.stringify(json));
    }

    const logout = () => {
        // localStorage.removeItem('NODECRUDSEG/autenticacao');
        localStorage.setItem('NODECRUDSEG/autenticacao', JSON.stringify({ "auth": false, "token": "" }));
    }

    useEffect(() => {
       //setAutenticacao(pegaAutenticacao());
      // if (!autenticacao) setAutenticacao({ "auth": false, "token": "" })  
      if (autenticacao == null){
          setAutenticacao(pegaAutenticacao());
      }
    }, [])

    return (
        <AutenticacaoContext.Provider value={{
            pegaAutenticacao,
            logout,
            gravaAutenticacao,
            autenticacao,
            setAutenticacao
        }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}


export default AutenticacaoContext
