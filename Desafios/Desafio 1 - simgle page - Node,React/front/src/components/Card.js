function Card(props) {
    function deleteItem(item) {
        const options = {
            method: 'DELETE',
        };
        fetch('http://localhost:4000/product/' + item, options).then((res) => {});
    }

    return (
        <div className="Card">
            <h3>{props.item.title}</h3>
            <p>
                Description: <span>{props.item.description}</span>
            </p>
            <p>
                Collection: <span>{props.item.collection}</span>
            </p>
            <p>
                Price:<span> R${props.item.price}</span>
            </p>
            <div className="CardButtons">
                <button
                    onClick={() => {
                        props.changeState(false, props.id);
                        deleteItem(props.item.id);
                    }}
                >
                    ❌
                </button>
                <button
                    onClick={() => {
                        props.changeState(true, 'Editar produto', props.item);
                    }}
                >
                    ✏
                </button>
            </div>
        </div>
    );
}

export default Card;
