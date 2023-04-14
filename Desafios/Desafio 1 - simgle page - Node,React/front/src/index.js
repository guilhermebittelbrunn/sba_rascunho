import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Footer from './components/footer';
import ProductsContainer from './components/productsContainer';
import Modal from './components/modal';
import Nav from './components/nav';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Application() {
    const [state, setState] = useState(false);
    const [func, setFunc] = useState('Adicionar um produto');
    const [products, setProducts] = useState([]);
    const [item, setItem] = useState({});

    function findAllProducts() {
        fetch('http://localhost:4000/product')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProducts(data);
            });
    }

    function findCollection(item) {
        console.log(item);
        fetch(`http://localhost:4000/product/${item}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProducts(data);
            });
    }

    useEffect(() => {
        findAllProducts();
    }, []);

    useEffect(() => {
        findAllProducts();
    }, [func, state]);

    function changeState(status, func, item) {
        setState(status);
        setFunc(func);
        setItem(item);
    }

    return (
        <>
            {state ? <Modal item={item ?? ''} state={state} title={func} changeState={changeState} /> : false}
            <Nav title="FakeStore" links={['About', 'Products', 'Contact', 'More']} changeState={changeState} />
            <main>
                <ProductsContainer changeState={changeState} products={products} findCollection={findCollection} />
            </main>
            <Footer />
        </>
    );
}

root.render(<Application />);
