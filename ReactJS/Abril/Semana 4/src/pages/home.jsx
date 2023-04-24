import { useState, useEffect } from "react"

export default function Home(){
    const [show, setShow] = useState();

    useEffect(()=>{
        setShow(true);
    },[])

    return(
        <>
            <h1>
                Home-page
            </h1>
            <button onClick={()=>{setShow(!show)}}>{show ? 'show' : 'hidden'} information</button>
            <p>
               {!show && 
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Rerum sed, nemo fuga debitis nisi nihil beatae ab fugit delectus!
                Odit, rem. Excepturi cupiditate accusantium ad et odio vel quasi dolore?`
               }
            </p>
            <details>
                <summary>Items</summary>
               <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
               </ul>
            </details>
        </>
    )
}