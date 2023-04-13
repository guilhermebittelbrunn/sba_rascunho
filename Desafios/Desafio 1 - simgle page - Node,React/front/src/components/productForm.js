import { useState } from 'react';

function ProductForm(props) {
    const [values, setValues] = useState({ collection: '1A' });

    function haddleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    }

    function addProduct(e) {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: new Headers({ 'Content-type': 'application/json' }),
            body: JSON.stringify(values),
        };
        fetch('http://localhost:4000/product', options).then((res) => {
            const form = document.getElementsByClassName('productForm')[0];
            for (let item of form) {
                if (item.type === 'text' || item.type === 'number') {
                    item.value = '';
                }
            }
        });
    }

    return (
        <>
            <form className="productForm" style={props.style}>
                <h3>Inserir um produto</h3>
                <input type="text" required placeholder="título" name="title" onChange={haddleChange}></input>
                <input type="text" placeholder="descrição" name="description" onChange={haddleChange}></input>
                <input type="number" required name="price" onChange={haddleChange}></input>
                <select required name="collection" onChange={haddleChange}>
                    <option>1A</option>
                    <option>1B</option>
                    <option>2A</option>
                    <option>2B</option>
                    <option>3A</option>
                    <option>3B</option>
                </select>
                <button type="submit" onClick={addProduct}>
                    Adicionar
                </button>
            </form>
        </>
    );
}

export default ProductForm;
