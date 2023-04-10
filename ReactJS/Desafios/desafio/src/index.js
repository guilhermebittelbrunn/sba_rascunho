import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchCep } from './App';
import { CepDetail } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

function buscarCep() {
    const input_field = document.getElementsByClassName('input_cep')[0].value.trim();
    if (!input_field) return alert('Informe um CEP');
    fetch(`https://cdn.apicep.com/file/apicep/${input_field}.json`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const cep = data;
            root.render(<CepDetail cep_info={cep} function={buscarCep} />);
        })
        .catch((err) => {
            alert('CEP INVÁLIDO\n informe um cep no seguinte formato: 00000-000');
        });
}

root.render(<SearchCep function={buscarCep} />);
