import { useContext } from 'react'
import EstadoContext from './EstadoContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar } = useContext(EstadoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edição de estado</h2>
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
                    <label htmlFor="txtUF" className="form-label">UF</label>
                    <input type="text" required className="form-control" id="txtUF" size="2" maxLength="2"
                        value={objeto.uf}
                        name="uf"
                        onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">
                    Salvar  <i className="bi bi-save"></i>
                </button>
            </form>
        </div>

    )
}

export default Form;