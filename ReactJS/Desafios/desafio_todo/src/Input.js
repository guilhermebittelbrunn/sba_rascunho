import { useState } from 'react';

function Input() {
    const [text, setText] = useState('');

    return (
        <div>
            <h3>To-do List</h3>
            <section className="form_container">
                <input type="text" placeholder="Informe uma atividade"></input>
                <button>+</button>
            </section>
        </div>
    );
}

export default Input;
