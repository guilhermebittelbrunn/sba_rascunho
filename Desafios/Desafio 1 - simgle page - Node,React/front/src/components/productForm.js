import { useState } from 'react';

function ProductForm(props) {
    const [values, setValues] = useState(props.item);
    function haddleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setValues((prevState) => ({ ...prevState, [name]: value }));
        console.log(values);
    }

    function addProduct(e) {
        e.preventDefault();
        if (props.func === 'Adicionar produto' && (!values.title || !values.price)) {
            return alert('Informe todos os campos!');
        }
        const options = {
            method: props.func === 'Adicionar produto' ? 'POST' : 'PUT',
            headers: new Headers({ 'Content-type': 'application/json' }),
            body: JSON.stringify(values),
        };
        fetch(`http://localhost:4000/product/${props.item.id || ''}`, options).then((res) => {
            const form = document.getElementsByClassName('productForm')[0];
            for (let item of form) {
                if (item.type === 'text' || item.type === 'number') {
                    item.value = '';
                }
            }
            props.changeState(false);
        });
    }

    return (
        <>
            <div className="modal_form">
                <form className="productForm" style={props.style}>
                    <div className="headerForm">
                        <h3>{props.func}</h3>
                        <button
                            onClick={() => {
                                props.changeState(!props.state);
                            }}
                        >
                            ❌
                        </button>
                    </div>
                    <input
                        type="text"
                        required
                        placeholder={'title'}
                        name="title"
                        onChange={haddleChange}
                        value={values.title}
                    ></input>
                    <input
                        type="text"
                        placeholder={'description'}
                        name="description"
                        onChange={haddleChange}
                        value={values.description}
                    ></input>
                    <input
                        type="number"
                        placeholder={'price'}
                        required
                        name="price"
                        onChange={haddleChange}
                        value={values.price}
                    ></input>
                    <select required name="collection" onChange={haddleChange}>
                        <option>1A</option>
                        <option>1B</option>
                        <option>2A</option>
                        <option>2B</option>
                        <option>3A</option>
                        <option>3B</option>
                    </select>
                    <button type="submit" onClick={addProduct}>
                        {props.func === 'Adicionar produto' ? 'Adicionar' : 'Salvar'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default ProductForm;
