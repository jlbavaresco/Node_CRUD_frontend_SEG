import { useContext } from 'react'
import EstadoContext from './EstadoContext';
import Alerta from '../Alerta';
import MaterialTable from 'material-table'
import { Icon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function Tabela() {

  const { setObjeto, alerta, setAlerta, listaObjetos,
    setEditar, recuperar, remover, setShowForm } = useContext(EstadoContext);

  return (
    <div style={{ padding: '20px' }}>

      <Alerta alerta={alerta} />
      <button type="button" className="btn btn-primary"
        onClick={() => {
          setObjeto({
            codigo: 0,
            nome: "",
            uf: ""
          });
          setEditar(false);
          setAlerta({ status: "", mensagem: "" });
          setShowForm(true);
        }}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </button>
      <MaterialTable
        title="CRUD de Estados"
        columns={[
          { title: 'Código', field: 'codigo', type: 'numeric' },
          { title: 'Nome', field: 'nome' },
          { title: 'UF', field: 'uf' }
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
              }}>
              <EditIcon>Editar</EditIcon>
            </div>,
            tooltip: 'Editar '
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