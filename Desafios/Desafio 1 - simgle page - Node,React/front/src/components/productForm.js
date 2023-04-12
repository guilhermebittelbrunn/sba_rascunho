import { useState } from 'react';

function ProductForm() {
    return (
        <>
            <form method="POST" action="http://localhost:4000/product">
                <input type="text" required placeholder="título" name="title"></input>
                <input type="text" placeholder="descrição" name="description"></input>
                <input type="number" required name="price"></input>
                <select required name="collection">
                    <option>1A</option>
                    <option>1B</option>
                    <option>2A</option>
                    <option>2B</option>
                    <option>3A</option>
                    <option>3B</option>
                </select>
                <button type="submit">Adicionar</button>
            </form>
        </>
    );
}

export default ProductForm;
