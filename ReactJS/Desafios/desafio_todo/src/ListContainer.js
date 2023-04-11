import { useState } from 'react';

function ListContainer(props) {
    const [status, setStatus] = useState(false);

    return (
        <>
            <ul>
                {props.list.map((item, k) => (
                    <li key={k} className={item.done ? 'itemDone' : ''}>
                        {item.text}
                        <button
                            onClick={() => {
                                props.deleteItem(item);
                            }}
                        >
                            ❌
                        </button>
                        <button
                            onClick={() => {
                                itemDone(item);
                            }}
                        >
                            ✔
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListContainer;
