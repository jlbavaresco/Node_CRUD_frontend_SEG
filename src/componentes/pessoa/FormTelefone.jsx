import { useContext } from 'react'
import PessoaContext from './PessoaContext';
import { Dropdown } from 'primereact/dropdown';

function FormTelefone() {

    const { telefone, handleChange, acaoCadastrarTelefone, handleChangeTelefone } = useContext(PessoaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edição de Pessoa</h2>
            <form id="formulario" onSubmit={acaoCadastrarTelefone}>
                <div className="form-group">
                    <label htmlFor="txtCodigo" className="form-label">Código</label>
                    <input type="text" readOnly className="form-control" id="txtCodigo"
                        value={telefone.codigo}
                        name="codigo"
                        onChange={handleChangeTelefone} />
                </div>
                <div className="form-group">
                    <label htmlFor="txtNumero" className="form-label">Número</label>
                    <input type="text" required className="form-control" id="txtNumero" size="14" maxLength="14"
                        value={telefone.numero}
                        name="numero"
                        onChange={handleChangeTelefone} />
                </div>
                <div className="form-group">
                    <label htmlFor="txtDescricao" className="form-label">Descrição</label>
                    <input type="text" required className="form-control" id="txtDescricao"
                        value={telefone.descricao}
                        name="descricao"
                        onChange={handleChangeTelefone} />
                </div>

                <button type="submit" className="btn btn-success">
                    Salvar  <i className="bi bi-save"></i>
                </button>
            </form>
        </div>

    )
}

export default FormTelefone;