import { useState } from 'react';

function ProductsContainer(props) {
    return (
        <div>
            <h2>produtos</h2>
            <ul>{props.list}</ul>
        </div>
    );
}

// function ProductsListCard(props) {
//     return (
//         <>
//             <h3>{props.product}</h3>
//         </>
//     );
// }

export default ProductsContainer;
