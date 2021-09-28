import { useState, useEffect } from 'react';
import config from '../../Config';
import CidadeContext from './CidadeContext';
import Tabela from './Tabela';
import Form from './Form';

function Cidade() {

  const [alerta, setAlerta] = useState({ status: "", mensagem: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [editar, setEditar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: "", nome: "", estado_codigo: ""
  })

  const recuperaEstados = async () => {
    await fetch(`${config.enderecoapi}/api/estados`)
      .then(response => response.json())
      .then(data => setListaEstados(data))
      .catch(err => console.log('Erro: ' + err))
  }

  const recuperaCidades = async () => {
    await fetch(`${config.enderecoapi}/api/cidades`)
      .then(response => response.json())
      .then(data => setListaObjetos(data))
      .catch(err => console.log('Erro: ' + err))
  }

  const remover = async objeto => {
    if (window.confirm('Deseja remover este objeto?')) {
      try {
        await fetch(`${config.enderecoapi}/api/cidades/${objeto.codigo}`,
          { method: "DELETE" })
          .then(response => response.json())
          .then(json => setAlerta({ status: json.status, mensagem: json.message }))
        recuperaCidades();
      } catch (err) {
        console.log('Erro: ' + err)
      }
    }
  }

  const recuperar = async codigo => {
    await fetch(`${config.enderecoapi}/api/cidades/${codigo}`)
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
          estado: objeto.estado_codigo
        };
        await fetch(config.enderecoapi + '/api/cidades', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
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
          estado: objeto.estado_codigo
        };
        await fetch(config.enderecoapi + '/api/cidades', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
    recuperaCidades();
    setShowForm(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  }

  useEffect(() => {
    recuperaEstados();
    recuperaCidades();
  }, []);

  return (
    <CidadeContext.Provider value={
      {
        objeto, setObjeto,
        alerta, setAlerta,
        listaObjetos, setListaObjetos,
        listaEstados, setListaEstados,
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

    </CidadeContext.Provider>
  );
}

export default Cidade;