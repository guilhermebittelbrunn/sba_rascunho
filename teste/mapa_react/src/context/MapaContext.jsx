import { useState, createContext, useEffect } from "react";
import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text, Fill} from 'ol/style'
import {FullScreen, Zoom} from 'ol/control'
// import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

export const MapaContext = createContext();

const view = new View({
        center: [0,0],
        zoom: 2
    })

const map = new Map({

    view: view,
    layers: [new TileLayer({source: new OSM()})],
})





export default function MapaProvider({children}){
    const [status,setStatus] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(Math.floor(view.getZoom()));

    useEffect(()=>{
        view.setZoom(zoomLevel)
    },[zoomLevel])

    return (
        <MapaContext.Provider value={{map, status, setStatus, zoomLevel, setZoomLevel}}>
            {children}
        </MapaContext.Provider>
    )
}