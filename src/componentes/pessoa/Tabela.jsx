import { useContext } from 'react'
import PessoaContext from './PessoaContext';
import Alerta from '../Alerta';
import MaterialTable from 'material-table'
import { Icon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIcon from '@material-ui/icons/Phone';

function Tabela() {

  const { setObjeto, alerta, setAlerta, listaObjetos,
    setEditar, recuperar, remover, setShowForm, setShowTabela, setShowTabelaTelefone, recuperarTelefones } = useContext(PessoaContext);

  return (
    <div style={{ padding: '20px' }}>

      <Alerta alerta={alerta} />
      <button type="button" className="btn btn-primary"
        onClick={() => {
          setObjeto({
            codigo: 0, nome: "", nascimento: "", salario: "", cidade_codigo: ""
          });
          setEditar(false);
          setAlerta({ status: "", mensagem: "" });
          setShowForm(true);
          setShowTabela(false);          
        }}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </button>
      <MaterialTable
        title="CRUD de Pessoas"
        columns={[
          { title: 'Código', field: 'codigo', type: 'numeric' },
          { title: 'Nome', field: 'nome' },
          { title: 'Nascimento', field: 'nascimento', type: 'date' },
          { title: 'Salário', field: 'salario', type: 'currency' },
          { title: 'Cidade', field: 'cidade' },
        ]}
        data={listaObjetos}
        options={{
          filtering: true
        }}
        actions={[
          rowData => ({
            icon: () => <div
              onClick={() => {
                recuperar(rowData.codigo);
                setEditar(true);
                setAlerta({ status: "", mensagem: "" });
                setShowForm(true);
                setShowTabela(false);
              }}>
              <EditIcon>Editar</EditIcon>
            </div>,
            tooltip: 'Editar '
          }),
          rowData => ({
            icon: () => <div
              onClick={() => {
                recuperar(rowData.codigo);
                recuperarTelefones(rowData.codigo);
                setEditar(true);
                setAlerta({ status: "", mensagem: "" });
                setShowForm(false);
                setShowTabela(false);
                setShowTabelaTelefone(true);
              }}>
              <PhoneIcon>Telefones</PhoneIcon>
            </div>,
            tooltip: 'Telefones '
          }),
          rowData => ({
            icon: () => <div
              onClick={() => {
                remover(rowData);
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

export default Tabela;