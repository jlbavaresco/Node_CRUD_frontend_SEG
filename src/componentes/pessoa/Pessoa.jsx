import { useState, useEffect } from 'react';
import config from '../../Config';
import PessoaContext from './PessoaContext';
import Tabela from './Tabela';
import Form from './Form';
import TabelaTelefones from './TabelaTelefones';
import FormTelefone from './FormTelefone';

function Pessoa() {

  const [alerta, setAlerta] = useState({ status: "", mensagem: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaCidades, setListaCidades] = useState([]);
  const [telefones, setTelefones] = useState([]);
  const [editar, setEditar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTabela, setShowTabela] = useState(true);
  const [showFormTelefone, setShowFormTelefone] = useState(false);
  const [showTabelaTelefone, setShowTabelaTelefone] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: 0, nome: "", nascimento: "", salario: "", cidade_codigo: ""
  })
  const [telefone, setTelefone] = useState({
    codigo: "",
    numero: "",
    descricao: "",
    pessoa: ""
  })
  const [editarTelefone, setEditarTelefone] = useState(false);


  const recuperaPessoas = async () => {
    await fetch(`${config.enderecoapi}/api/pessoas`)
      .then(response => response.json())
      .then(data => setListaObjetos(data))
      .catch(err => console.log('Erro: ' + err))
  }

  const recuperaCidades = async () => {
    await fetch(`${config.enderecoapi}/api/cidades`)
      .then(response => response.json())
      .then(data => setListaCidades(data))
      .catch(err => console.log('Erro: ' + err))
  }

  const remover = async objeto => {
    if (window.confirm('Deseja remover este objeto?')) {
      try {
        await fetch(`${config.enderecoapi}/api/pessoas/${objeto.codigo}`,
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
    await fetch(`${config.enderecoapi}/api/pessoas/${codigo}`)
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
          nascimento: objeto.nascimento,
          salario: objeto.salario,
          cidade: objeto.cidade_codigo
        };
        await fetch(config.enderecoapi + '/api/pessoas', {
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
          nascimento: objeto.nascimento,
          salario: objeto.salario,
          cidade: objeto.cidade_codigo
        };
        await fetch(config.enderecoapi + '/api/pessoas', {
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
    recuperaPessoas();
    setShowForm(false);
    setShowTabela(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  }

  const removerTelefone = async telefone => {
    //var atualizaAlerta = this.props.atualizaAlerta;
    if (window.confirm("Remover este objeto?")) {
      try {
        await fetch(
          `${config.enderecoapi}/api/telefones/${telefone.codigo}`,
          {
            method: "DELETE",
          }
        ).then(response => response.json())
          .then(json => {
            //console.log("JSON retorno: " + "status: " + json.status  + " Message: " + json.message)          
            setAlerta({ status: json.status, mensagem: json.message });
          })
        // window.location = `/editartelefones/${this.state.objeto.codigo}`;
        setTelefones([]);
        recuperarTelefones(objeto.codigo);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  const recuperarTelefones = async codigo => {
    // aqui eu recupero um unico objeto passando o id
    setTelefones([]);
    await fetch(`${config.enderecoapi}/api/telefones/${codigo}`)
      .then(response => response.json())
      .then(data => setTelefones(data))
      .catch(err => console.log(err))
    //console.log("Telefenes recuperados: " + this.state.telefones.length)
  }

  const acaoCadastrarTelefone = async e => {
    e.preventDefault();
    if (editarTelefone) {
      try {
        const body = {
          codigo: telefone.codigo,
          numero: telefone.numero,
          descricao: telefone.descricao,
          pessoa: telefone.pessoa
        };
        const response = await fetch(config.enderecoapi + '/api/telefones', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(response => response.json())
          .then(json => {
            //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
            setAlerta({ status: json.status, mensagem: json.message });
          });
      } catch (err) {
        console.error(err.message);
      }
    } else {
      try {
        const body = {
          numero: telefone.numero,
          descricao: telefone.descricao,
          pessoa: telefone.pessoa
        };
        const response = await fetch(config.enderecoapi + '/api/telefones', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(response => response.json())
          .then(json => {
            //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
            setAlerta({ status: json.status, mensagem: json.message });
          });
      } catch (err) {
        console.error(err.message);
      }
    }    
    setTelefones([]);
    recuperarTelefones(objeto.codigo);
    setShowTabelaTelefone(true);
    setShowFormTelefone(false);
    
    
  };

  const recuperarTelefone = async codigo => {
    // aqui eu recupero um unico objeto passando o id
    await fetch(`${config.enderecoapi}/api/telefone/${codigo}`)
      .then(response => response.json())
      .then(data => setTelefone(data[0]))
      .catch(err => console.log(err))
    //console.log("Objeto recuperado: " + this.state.objeto.codigo +
    //    " Nome: " + this.state.objeto.nome + " Nascimento: " + this.state.objeto.nascimento)
  }

  const handleChangeTelefone = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTelefone({ ...telefone, [name]: value });
  }  

  useEffect(() => {
    recuperaPessoas();
    recuperaCidades();
  }, []);



  return (
    <PessoaContext.Provider value={
      {
        objeto, setObjeto,
        alerta, setAlerta,
        listaObjetos, setListaObjetos,
        listaCidades, setListaCidades,
        telefones, setTelefones,
        editar, setEditar,
        recuperar,
        remover,
        acaoCadastrar,
        handleChange,
        showForm, setShowForm,
        showTabela, setShowTabela,
        showFormTelefone, setShowFormTelefone,
        showTabelaTelefone, setShowTabelaTelefone,
        removerTelefone, recuperarTelefones, 
        telefone, setTelefone, 
        acaoCadastrarTelefone, recuperarTelefone,
        editarTelefone, setEditarTelefone, handleChangeTelefone
      }
    }>
      {showTabela && <Tabela />}
      {showForm && <Form />}
      {showTabelaTelefone && <TabelaTelefones />}
      {showFormTelefone && <FormTelefone />}

    </PessoaContext.Provider>
  );
}

export default Pessoa;