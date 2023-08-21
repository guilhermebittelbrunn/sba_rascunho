import { useState, useEffect } from "react";

export default function ContextMenu({geometry, contextMenu}){
    const [properties, setPropertis] = useState({status: false, pageX: 0, pageY: 0, geometry: {}});

    useEffect(()=>{ 

        setPropertis({
            ...contextMenu,
            ...geometry,
            // pageX: contextMenu.pageX > 980 ? contextMenu.pageX - 80 : contextMenu.pageX,
            // pageY: contextMenu.pageY > 790 ? contextMenu.pageY - 120 : contextMenu.pageY,
        })
        console.log(properties)
    }, [contextMenu])
  
    return(
     
      
            <div id="contextMenu" className={`w-[100] p-6 bg-white absolute hover:cursor-pointer ${contextMenu.status || 'hidden'}`} style={{top: properties.pageY+'px', left: properties.pageX +'px'}}>
                <ul>
                    <li>option</li>
                    <li>option</li>
                    <li>option</li>
                </ul>
            </div>

    )

}

