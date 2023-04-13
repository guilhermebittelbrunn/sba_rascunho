import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductForm from './components/productForm';
import ProductsContainer from './components/productsContainer';
import Modal from './components/modal';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Application() {
    const [state, setState] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/product')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProducts(data);
            });
    }, []);

    function changeState(status) {
        console.log(status);
        setState(status);
    }

    return (
        <>
            {state ? <Modal changeState={changeState} /> : false}
            <main>
                <ProductForm />
                <ProductsContainer changeState={changeState} products={products} />
            </main>
        </>
    );
}

root.render(<Application />);
