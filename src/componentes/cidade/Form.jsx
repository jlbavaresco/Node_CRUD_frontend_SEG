import { useContext } from 'react'
import CidadeContext from './CidadeContext';
import { Dropdown } from 'primereact/dropdown';

function Form() {

    const { objeto, handleChange, acaoCadastrar, listaEstados } = useContext(CidadeContext);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edição de Cidade</h2>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <div className="form-group">
                    <label htmlFor="txtCodigo" className="form-label">Código</label>
                    <input type="text" readOnly className="form-control" id="txtCodigo"
                        value={objeto.codigo}
                        name="codigo"
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="txtNome" className="form-label">Nome</label>
                    <input type="text" required className="form-control" id="txtNome" size="40" maxLength="40"
                        value={objeto.nome}
                        name="nome"
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                        <label htmlFor="selectEstado" className="form-label">Estado</label>

                        <Dropdown style={{ padding: '0' }}
                            className="form-control" id="selectEstado"
                            res
                            value={objeto.estado_codigo}
                            name="estado_codigo"
                            options={listaEstados}
                            onChange={handleChange}
                            optionLabel="nome"
                            optionValue="codigo" filter filterBy="nome"
                            placeholder="Selecione o estado"
                        />
                    </div>

                <button type="submit" className="btn btn-success">
                    Salvar  <i className="bi bi-save"></i>
                </button>
            </form>
        </div>

    )
}

export default Form;