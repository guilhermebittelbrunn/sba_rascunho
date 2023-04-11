import ListItems from './ListContainer';
import InputContainer from './InputContainer';
import { useState } from 'react';

function ContentContainer() {
    const [items, setItems] = useState([]);

    function onAddItem(item) {
        setItems([...items, item]);
    }

    return (
        <>
            <h3>To-do list</h3>
            <InputContainer onAddItem={onAddItem} />
            <ListItems list={items} />
        </>
    );
}

export default ContentContainer;
