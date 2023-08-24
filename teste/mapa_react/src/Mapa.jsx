import { useContext, useEffect } from "react";
import { MapaContext } from "./context/MapaContext";

export default function Mapa(){
    const {map, status, setStatus} = useContext(MapaContext)

    useEffect(()=>{
        map.setTarget('map');
    }, [status])

    return(
        <>
            <h3>Current status: {JSON.stringify(status)}</h3>
            <button onClick={()=>{setStatus((pv)=>{return !pv})}}>change status</button>
            <div style={{backgroundColor: '#123', width:'100vw', height:'70vh', marginTop: '14px', position: 'relative'}}>
                <div id="map" style={{position: 'absolute', top: '0', bottom: '0', width: '100%', height:'100%'}} />
            </div>
        </>
    )
}

// bg-white absolute top-0 bottom-0 w-full h-full