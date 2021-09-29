import { useContext, useEffect } from 'react';
import PessoaContext from './PessoaContext';
import Alerta from '../Alerta';
import MaterialTable from 'material-table'
import { Icon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIcon from '@material-ui/icons/Phone'

function TabelaTelefones() {

  const { objeto,  alerta, setAlerta, setShowForm, setShowTabela, telefones, 
    setShowTabelaTelefone,removerTelefone, setShowFormTelefone, 
    setTelefone, recuperarTelefone, setEditarTelefone, setTelefones
    } = useContext(PessoaContext);


  return (
    <div style={{ padding: '20px' }}>

      <Alerta alerta={alerta} />
      <button type="button" className="btn btn-primary"
        onClick={() => {
          setTelefone({
            codigo: 0, numero: "",
            descricao: "", pessoa: objeto.codigo
          });
          setEditarTelefone(false);
          setAlerta({ status: "", mensagem: "" });
          setShowFormTelefone(true);
          setShowTabelaTelefone(false);
        }}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </button>
      <button type="button" className="btn btn-info"
        onClick={() => {
          setShowTabelaTelefone(false);
          setShowTabela(true);
          setShowForm(false);
          setAlerta({ status: "", mensagem: "" });
          setTelefones([]);
        }}>
        Voltar para a listagem <i className="bi bi-arrow-left"></i>
      </button>


      <MaterialTable
        title={`Telefones do ${objeto.nome} - Código ${objeto.codigo}`}
        columns={[
          { title: 'Código', field: 'codigo', type: 'numeric' },
          { title: 'Numero', field: 'numero' },
          { title: 'Descrição', field: 'descricao' }
        ]}
        data={telefones}
        options={{
          filtering: true
        }}
        actions={[
          rowData => ({
            icon: () => <div
              onClick={() => {
                recuperarTelefone(rowData.codigo);
                setEditarTelefone(true);
                setAlerta({ status: "", mensagem: "" });
                setShowFormTelefone(true);
                setShowTabelaTelefone(false);
              }}>
              <EditIcon>Editar</EditIcon>
            </div>,
            tooltip: 'Editar '
          }),
          rowData => ({
            icon: () => <div
              onClick={() => {
                removerTelefone(rowData);
              }}>
              <DeleteIcon>Remover</DeleteIcon>
            </div>,
            tooltip: 'Remover '
          })
        ]}
      />


    </div>
  )
}

export default TabelaTelefones;