import { useState, useEffect } from "react";

export default function ContextMenu({props}){
  
    return(
        <>
            {props.status && 
            <div className={`w-[100] p-6 h-[300] bg-white absolute hover:cursor-pointer`} style={{top: props.pageY+'px', left: props.pageX +'px'}}>
                <ul>
                    <li>option</li>
                    <li>option</li>
                    <li>option</li>
                </ul>
            </div>}
        </>
    )

}

