import { useContext } from 'react'
import PessoaContext from './PessoaContext';
import { Dropdown } from 'primereact/dropdown';

function Form() {

    const { objeto, handleChange, acaoCadastrar, listaCidades } = useContext(PessoaContext);


    const cidadeOptionTemplate = (option) => {
        return (
            <div >
                {option.codigo} - {option.nome}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edição de Pessoa</h2>
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
                        <label htmlFor="txtNascimento" className="form-label">Nascimento</label>
                        <input type="date" required className="form-control" id="txtNascimento"
                             value={objeto.nascimento}
                            name="nascimento"
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtSalario" className="form-label">Salário</label>
                        <input type="number" required className="form-control" id="txtSalario" size="40" maxLength="40"
                            value={objeto.salario}
                            name="salario"
                            onChange={handleChange} />
                    </div>                
                <div className="form-group">
                        <label htmlFor="selectCidade" className="form-label">Cidade</label>
                        <Dropdown style={{ padding: '0' }}
                            className="form-control" id="selectCidade"
                            res
                            value={objeto.cidade_codigo}
                            name="cidade_codigo"
                            options={listaCidades}
                            onChange={handleChange}
                            optionLabel="nome"
                            optionValue="codigo" filter filterBy="nome"
                            placeholder="Selecione a cidade"
                            itemTemplate={cidadeOptionTemplate}
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