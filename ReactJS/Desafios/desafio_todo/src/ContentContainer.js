import InputContainer from './InputContainer';
import ListContainer from './ListContainer';
import Item from './Item';
import { useState } from 'react';

function ContentContainer() {
    const [items, setItems] = useState([]);

    function onAddItem(text) {
        const ativ = new Item(text);
        setItems([...items, ativ]);
    }

    function deleteItem(item) {
        const new_list = items.filter((i) => {
            if (i.id != item.id) {
                return i;
            }
        });
        setItems(new_list);
    }

    return (
        <>
            <h3>To-do list</h3>
            <InputContainer onAddItem={onAddItem} />
            <ListContainer list={items} deleteItem={deleteItem} />
        </>
    );
}

export default ContentContainer;
