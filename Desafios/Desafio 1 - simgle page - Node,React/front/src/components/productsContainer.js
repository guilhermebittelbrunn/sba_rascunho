function ProductsContainer(props) {
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
        <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
            <h2>produtos</h2>
            <ul style={ulStyle}>
                {props.products.map((p) => {
                    return (
                        <li key={p.id} id={p.id}>
                            <Card item={p} changeState={props.changeState} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function Card(props) {
    const style = {
        backgroundColor: 'whitesmoke',
        boxShadow: '2px 2px 2px #2f2f2f',
        padding: '12px',
        width: '275px',
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        justifyContent: 'space-between',
    };

    function deleteItem(item) {
        const options = {
            method: 'DELETE',
        };
        fetch('http://localhost:4000/product/' + item, options).then((res) => {});
    }

    return (
        <div className="Card" style={style}>
            <h3>{props.item.title}</h3>
            <p>Descrição: {props.item.description}</p>
            <p>Collection: {props.item.collection}</p>
            <p>Price: R${props.item.price}</p>
            <div>
                <button
                    onClick={() => {
                        deleteItem(props.item.id);
                    }}
                >
                    ❌
                </button>
                <button
                    onClick={() => {
                        props.changeState(true, props.item);
                    }}
                >
                    ✏
                </button>
            </div>
        </div>
    );
}
export default ProductsContainer;
