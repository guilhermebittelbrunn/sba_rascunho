import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Appication() {
    // // const [api, setApi] = useState(1);
    // // async function buscarValor() {
    // //     // const apidata = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    // //     // const apijson = await apidata.json();
    // //     // return apijson;
    // //     await fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
    // //         .then((res) => {
    // //             return res.json();
    // //         })
    // //         .then((data) => {
    // //             setApi(data);
    // //         });
    // // }
    // // console.log(api);
    // // const moeda = buscarValor();
    // // console.log('moeda teste ' + moeda);

    // async function buscarValor() {
    //     const apidata = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL');
    //     const apijson = await apidata.data;
    //     return apijson;
    // }

    // // useEffect(() => {
    // //     (async () => {
    // //         await buscarValor();
    // //     })();
    // // }, []);

    // // useEffect(() => {
    // //     console.log(api);
    // // }, [api]);

    let moeda = 1;

    async function buscarValor() {
        const api = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL');
        const apidata = await api.data;
        return apidata;
    }

    return (
        <>
            <App moeda={buscarValor} />;
        </>
    );
}

root.render(<Appication />);
