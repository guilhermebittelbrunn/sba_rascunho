import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductForm from './components/productForm';
import ProductsContainer from './components/productsContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Application() {
    const list = [];

    function buscar() {
        fetch('http://localhost:4000/product')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                list.push(data);
            })
            .finally(() => {
                console.log(list);
            });
    }

    return (
        <>
            <ProductForm />
            <ProductsContainer
                onLoad={buscar()}
                list={() => {
                    return buscar();
                }}
            />
        </>
    );
}

root.render(<Application />);
