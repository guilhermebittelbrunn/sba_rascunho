import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text, Fill} from 'ol/style'
import TileLayer from 'ol/layer/Tile';
import { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import json from '../../geojson'


function colorCategory(label, option){
        if(!label[option]){
            return 'rgba(221,221,223,0.7)'
        }
        const tailwindColors = {
            0: 'rgba(221,221,223,0.8)',
            1: 'rgb(240,253,244)',
            2: 'rgb(187,247,208)',
            3: 'rgb(74,222,128)',
            4: 'rgb(22,163,74)',
            5: 'rgb(28, 122, 64)',
        }
        let x;
        switch (option){
            case 'QUANTIDADE_VENDAS':
                x = label[option] / 2
                x = x > 5 ? 5 : x
                x = x > 0 && x < 1 ? 1 : x
                x = tailwindColors[Math.floor(x)]
            case 'QUANTIDADE_CLIENTES_CIDADE':
                x = label[option] / 1.5
                x = x > 5 ? 5 : x
                x = (x > 0 && x < 1) ? 1 : x
                x = tailwindColors[Math.floor(x)]
            case 'ULTIMA_VENDA':
                return x
        }
        return x
    } 


export const MapaContext = createContext();

export default function MapaProvider({url, children, setIsLoading}){

    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`);
    const [error,setError] = useState(false);
    const [open, setOpen] = useState(false); 
    const [map, setMap] = useState(null)
    const [stateLayer, setStateLayer] = useState(null)
    const [countryLayer, setCountryLayer] = useState(null)
    const [baseLayer, setBaseLayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState({status: false, type: ''});

    useEffect(()=>{
        const view = new View({
                extent: [-75, -35, -32, 6],
                center: [-56, -14],
                zoom: 6,
                maxZoom: 12,
                minZoom: 4
            });

        const mapObj = new Map({
            view: view,
            layers: [],
            controls: []
        })
        setMap(mapObj);
    },[url])

    useEffect(()=>{
        if(!map) return
        if(!loading){
            try{
                const baseLayer = new TileLayer({source: new OSM(), zIndex: 0});
                const stateLayer = new vector({
                    source: new Vector({
                        features: new GeoJSON().readFeatures(data),
                    }),
                    style: (feature,res)=>{
                        return new Style({
                            fill: new Fill({
                                color: feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)"
                            }),
                            stroke: new Stroke({
                                color: "rgba(30,30,30)",
                                width: 1,
                            }),
                            text: new Text({
                                fill: new Fill({
                                    color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 30, 30)' : 'rgb(0,0,0)'
                                }),
                                font: 'bold 10px "Segoe UI"',
                                text: feature.getProperties().NM_MUN,
                                scale: 1.0
                            })
                        })
                    },
                    zIndex: 3,
                    className: 'stateLayer',
                    // properties: {color: (feature,res)=>(selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption))},
                });

                
                const countryLayer = new vector({
                        source: new Vector({
                            features: new GeoJSON().readFeatures(json),
                        }),
                        style: (feature,res)=>{
                        return new Style({
                            fill: new Stroke({
                                color: "rgba(0,0,0,0)",
                            }),
                            stroke: new Stroke({
                                color: "rgba(30,30,30)",
                                width: 1,
                            }),
                        })
                        },
                        zIndex: 2
                });
                setBaseLayer(baseLayer);
                setStateLayer(stateLayer);
                setCountryLayer(countryLayer);

                map.addLayer(baseLayer);
                map.addLayer(countryLayer);
                map.addLayer(stateLayer);

                map.getView().setCenter(data.features[0].geometry.coordinates[0][0]);
                setError(false);
            }catch(error){
                setError(error);
                // setMap(null)
            }
            
        }
    },[data])


    useEffect(()=>{
        setIsLoading(loading)
    },[loading])


    
    return(
        <MapaContext.Provider value={{map, err, loading, countryLayer, baseLayer, stateLayer,open, setOpen, error, colorCategory, isModalOpen,setIsModalOpen, rc: url.rc,  url}}>
            {children}
        </MapaContext.Provider>
    )
}