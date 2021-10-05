import { useState, useEffect } from 'react';
import config from '../../Config';
import EstadoContext from './EstadoContext';
import Tabela from './Tabela';
import Form from './Form';
import pegaAutenticacao from '../Autenticacao';

function Estado() {

  const [alerta, setAlerta] = useState({ status: "", mensagem: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: "", nome: "", uf: ""
  })

  const autenticacao = pegaAutenticacao();

  const recuperaEstados = async () => {
    await fetch(config.enderecoapi + '/api/estados', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": autenticacao.token
      }
    })
      .then(response => response.json())
      .then(data => setListaObjetos(data))
      .catch(err => console.log('Erro: ' + err))
  }

  const remover = async objeto => {
    if (window.confirm('Deseja remover este objeto?')) {
      try {
        await fetch(`${config.enderecoapi}/api/estados/${objeto.codigo}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": autenticacao.token
            }
          })
          .then(response => response.json())
          .then(json => setAlerta({ status: json.status, mensagem: json.message }))
        recuperaEstados();
      } catch (err) {
        console.log('Erro: ' + err)
      }
    }
  }

  const recuperar = async codigo => {
    await
      fetch(`${config.enderecoapi}/api/estados/${codigo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": autenticacao.token
        }
      })
        .then(response => response.json())
        .then(data => setObjeto(data[0]))
        .catch(err => console.log(err))
  }

  const acaoCadastrar = async e => {

    e.preventDefault();
    if (editar) {
      try {
        const body = {
          codigo: objeto.codigo,
          nome: objeto.nome,
          uf: objeto.uf
        };
        await fetch(config.enderecoapi + '/api/estados', {
          method: "PUT",
          headers: { "Content-Type": "application/json" ,
          "x-access-token": autenticacao.token},
          body: JSON.stringify(body),
        }).then(response => response.json())
          .then(json => {
            //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
            setAlerta({ status: json.status, mensagem: json.message })
          });
      } catch (err) {
        console.error(err.message);
      }
    } else {
      try {
        const body = {
          nome: objeto.nome,
          uf: objeto.uf
        };
        await fetch(config.enderecoapi + '/api/estados', {
          method: "POST",
          headers: { "Content-Type": "application/json",
          "x-access-token": autenticacao.token },
          body: JSON.stringify(body),
        }).then(response => response.json())
          .then(json => {
            //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
            setAlerta({ status: json.status, mensagem: json.message })
          });
      } catch (err) {
        console.error(err.message);
      }
    }
    recuperaEstados();
    setShowForm(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  }

  useEffect(() => {
    recuperaEstados();
  }, []);

  return (
    <EstadoContext.Provider value={
      {
        objeto, setObjeto,
        alerta, setAlerta,
        listaObjetos, setListaObjetos,
        editar, setEditar,
        recuperaEstados,
        recuperar,
        remover,
        acaoCadastrar,
        handleChange,
        showForm, setShowForm
      }
    }>
      {!showForm && <Tabela />}
      {showForm && <Form />}

    </EstadoContext.Provider>
  );
}

export default Estado;