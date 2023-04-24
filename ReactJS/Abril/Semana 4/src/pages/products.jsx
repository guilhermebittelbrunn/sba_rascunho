import { useEffect } from "react"
import {useParams, useLocation , redirect} from "react-router-dom"

export default function Products(){

    const log = true;

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

    
    const location = useLocation();
    const params = useParams();
  

   console.log(location);
     console.log(params);


   
        
        return(
            (log && <>
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
            </>) || <h3>Acesso Negado</h3>
        )
    

}



function Card(props){
    return(
        <li key={props.k * 30}>{props.product}</li>
    )
}