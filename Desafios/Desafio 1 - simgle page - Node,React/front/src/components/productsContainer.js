function ProductsContainer(props) {
    console.log(props);
    const ulStyle = {
        border: '1px solid black',
        width: '95%',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '24px',
        gap: '12px',
        listStyle: 'none',
        justifyContent: 'center',
        padding: '24px',
    };

    return (
        <div className="ProductsContainer">
            <h2>Our Products: </h2>
            <ul style={ulStyle}>
                {props.products.map((p) => {
                    return (
                        <li key={p.id} id={p.id}>
                            <Card item={p} changeState={props.changeState} id={p.id} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

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
            <p>Description: {props.item.description}</p>
            <p>Collection: {props.item.collection}</p>
            <p>Price: R${props.item.price}</p>
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
export default ProductsContainer;
