import { useState } from 'react';

function InputContainer(props) {
    const [text, setText] = useState('');

    function handleChange(event) {
        const event_value = event.target.value;
        setText(event_value);
    }

    function addItem(event) {
        event.preventDefault();
        text ? props.onAddItem(text) : alert('Informe uma atividade');
        setText('');
    }

    return (
        <>
            <form className="input_form">
                <input type="text" placeholder="Insira uma atividade..." onChange={handleChange} value={text}></input>
                <button onClick={addItem}>+</button>
            </form>
        </>
    );
}

export default InputContainer;
