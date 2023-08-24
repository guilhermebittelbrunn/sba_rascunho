import { MapaContext } from "./context/MapaContext"
import { useContext } from "react"

export default function Drawer(){
    const {zoomLevel, setZoomLevel} = useContext(MapaContext);

    function handleChange(e){
        setZoomLevel(e.target.value);
    }

    return(
        <>
            <div>
                <input type="range" min={0} defaultValue={zoomLevel} max={12} onChange={(e)=>{handleChange(e)}}/>
            </div>
        </>
    )
}