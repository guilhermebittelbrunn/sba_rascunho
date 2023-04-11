import { useState } from 'react';

function InputContainer(props) {
    const [text, setText] = useState('');

    function handleChange(e) {
        const event_value = e.target.value;
        setText(event_value);
    }

    function addItem(e) {
        e.preventDefault();
        if (text) {
            props.onAddItem(text);
            setText('');
        }
    }

    return (
        <form>
            <input type="text" placeholder="Insira uma atividade..." onChange={handleChange} value={text}></input>
            <button onClick={addItem}>+</button>
        </form>
    );
}

export default InputContainer;
