import { useState, useEffect } from 'react';
import config from '../../Config';
import Alerta from '../Alerta';
import './signin.css';
//import './estilologin.css';
import jwt_decode from "jwt-decode";

import pegaAutenticacao from '../Autenticacao';
import { logout, gravaAutenticacao } from '../Autenticacao';

function Login() {

    const [nomeusuario, setNomeusuario] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", mensagem: "" });
   // const autenticacao = localStorage.getItem('NODECRUDSEG/autenticacao');

    const acaoLogin = async e => {

        e.preventDefault();

            try {
                const body = {
                    nomeusuario: nomeusuario,
                    senha: senha
                };
                await fetch(config.enderecoapi + '/api/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        setAlerta({ status: "success", mensagem: JSON.stringify(json) })
                        if (json.auth === true){
                           // localStorage.setItem('NODECRUDSEG/autenticacao',JSON.stringify(json));
                           gravaAutenticacao(json);
                        }
                    });
            } catch (err) {
                console.error(err.message);
            }

            const autenticacao = pegaAutenticacao();
            console.log(autenticacao);
            console.log("token: "+ autenticacao.token);
            console.log("decoded: " + JSON.stringify(jwt_decode(autenticacao.token)));
        
     
    };

    return (
        <div>
            <body className="text-center">
                <Alerta alerta={alerta} />
                <main className="form-signin">
                    <form onSubmit={acaoLogin}>
                        <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Nome de usuário"
                                value={nomeusuario}
                                name="nomeusuario"
                                onChange={e => setNomeusuario(e.target.value)} />
                            <label for="floatingInput">Nome de usuário</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"
                                value={senha}
                                name="senha"
                                onChange={e => setSenha(e.target.value)} />
                            <label for="floatingPassword">Senha</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>                        
                    </form>
                </main>
            </body>
        </div>
    )

}

export default Login;