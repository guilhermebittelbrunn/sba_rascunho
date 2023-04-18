import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function StateButtons(props) {
    return (
        <div className="StateButtons">
            <ButtonString />
            <ButtonInteger />
            <ButtonBool />
            <ButtonArray />
            <ButtonObject />
            <MoedaApi moeda={props.moeda} />
            <ButtonEffect />
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

    function addobj() {
        setCount(count + 10);
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

function MoedaApi(props) {
    (async () => {
        let valor = await props.moeda();
        const h4 = document.getElementsByClassName('h6')[0];
        h4.innerHTML = `<h1>${JSON.stringify(valor)}</h1>`;
    })();

    return (
        <>
            <h3>Valor da moeda</h3>
            <h4>1</h4>
        </>
    );
}

function ButtonEffect() {
    const [text, setText] = useState('');
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const showValue = () => {
        if (text === '') {
            return alert('Digite algo');
        } else {
            console.log({ ok: true });
        }

        if (text) {
            return alert('Digite algo');
        }
        console.log({ ok: true });

        if (text) return alert('Digite algo');
        console.log({ ok: true });

        text || alert('digite algo');
        console.log({ ok: true });

        (text || alert('digite algo')) && console.log({ ok: true });
    };

    return (
        <>
            <h3>Teste</h3>
            <input type="number" onChange={handleChange}></input>
            <button onClick={showValue}>Click</button>
        </>
    );
}

export function CountButton() {
    // const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const contador = useSelector((state) => {
        return state;
    });

    function increment() {
        //     setCount((preventValue) => {
        //         return preventValue + 1;
        //     });
        return true;
        //
    }

    function decrement() {
        // count > 0 &&
        //     setCount((preventValue) => {
        //         return preventValue - 1;
        //     });
        return false;
    }

    return (
        <>
            <h3>Count button: {contador}</h3>
            <button
                onClick={() => {
                    dispatch({ type: 'INCREMENT' });
                }}
            >
                +
            </button>
            <button
                onClick={() => {
                    dispatch({ type: 'DECREMENT' });
                }}
            >
                -
            </button>
        </>
    );
}
