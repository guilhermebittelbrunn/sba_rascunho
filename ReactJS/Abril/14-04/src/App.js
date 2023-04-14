import { useState } from 'react';

function StateButtons() {
    return (
        <div className="StateButtons">
            <ButtonString />
            <ButtonInteger />
            <ButtonBool />
            <ButtonArray />
            <ButtonObject />
        </div>
    );
}

export default StateButtons;

function ButtonString() {
    const [text, setText] = useState('');

    function addText() {
        setText((preventText) => {
            return preventText + ' teste';
        });
    }

    return (
        <>
            <h4>Button String</h4>
            <button onClick={addText}>Click-me (string)</button>
            <p>{text}</p>
            <hr></hr>
        </>
    );
}
function ButtonInteger() {
    const [value, setvalue] = useState(0);

    function addvalue() {
        setvalue((preventValue) => {
            return preventValue + 1;
        });
    }

    return (
        <>
            <h4>Button Integer</h4>
            <button onClick={addvalue}>Click-me (Integer)</button>
            <p>{value}</p>
            <hr></hr>
        </>
    );
}

function ButtonBool() {
    const [state, setState] = useState(true);

    function addState() {
        setState((preventState) => {
            return !preventState;
        });
    }

    return (
        <>
            <h4>Button Bool</h4>
            <button onClick={addState}>Click-me (Bool)</button>
            <p>{String(state)}</p>
            <hr></hr>
        </>
    );
}

function ButtonArray() {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);

    function addlist() {
        setCount((countatual) => {
            return countatual + 10;
        });
        setList((array) => {
            return [...array, count];
        });
        // setList([...list, count]);
    }

    return (
        <>
            <h4>Button Array</h4>
            <button onClick={addlist}>Click-me (Array)</button>
            <p>{list}</p>
            <hr></hr>
        </>
    );
}

function ButtonObject() {
    const [obj, setObj] = useState({});
    const [count, setCount] = useState(0);

    const stringOBJ = { category: '1' };

    function addobj() {
        setCount(count + 10);
        //setObj((preventState) => ({ ...preventState, [count]: '1' }));

        // setObj((obj) => {
        //     return {
        //         ...obj,
        //         endereco: 123,
        //     };
        // });

        setObj((preventValue) => {
            return { ...preventValue, [count]: '1' };
        });
    }

    return (
        <>
            <h4>Button Object</h4>
            <button onClick={addobj}>Click-me (Object)</button>
            <p>{JSON.stringify(obj)}</p>
            <hr></hr>
        </>
    );
}
