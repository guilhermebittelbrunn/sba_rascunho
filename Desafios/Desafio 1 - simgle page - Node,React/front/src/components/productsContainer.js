import Card from './Card.js';
import Filter from './filter.js';

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
            <Filter findCollection={props.findCollection} />
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

export default ProductsContainer;
