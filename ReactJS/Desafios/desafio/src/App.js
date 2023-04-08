import './App.css';
import moment from 'moment';

export function App(prop) {
    return (
        <>
            <section className="cep_input_field">
                <h2>Buscador de CEP</h2>
                <div>
                    <input type="text" placeholder="Insira um cep..." className="input_cep"></input>
                    <button onClick={prop.function}>Buscar</button>
                </div>
            </section>
        </>
    );
}

export function CepDetail(prop) {
    console.log(prop);
    return (
        <>
            <App function={prop.function} />
            <section className="api_cep_section">
                <h3>CEP {prop.cep_info.code}</h3>
                <ul>
                    <li>Estado: {prop.cep_info.state}</li>
                    <li>Cidade: {prop.cep_info.city}</li>
                    <li>Bairro: {prop.cep_info.district}</li>
                    <li>Rua: {prop.cep_info.address}</li>
                    <li>hora da consulta: {moment().format('DD/MM/YYYY HH:mm')}</li>
                </ul>
            </section>
        </>
    );
}
