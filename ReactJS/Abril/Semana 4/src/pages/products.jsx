export default function Products(){
    const products = [
        'item 1',
        'item 1',
        'item 1',
        'item 1',
        'item 1',
        'item 1',
        'item 1',
        'item 1',
        'item 1',
        'item 1',
    ]
    return(
        <>
            <h1>
                Our products
            </h1>
            <section>
                <ul>
                    {products.map((product, key)=>{
                        return <Card product={product} key={key}/>
                    })}
                </ul>
            </section>
        </>
    )
}



function Card(props){
    return(
        <li key={props.k * 30}>{props.product}</li>
    )
}