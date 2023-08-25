import {Map, View} from 'ol';
import {MapboxVector, Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text, Fill} from 'ol/style'
import {FullScreen, Zoom} from 'ol/control'
import { get, useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import json from '../../geojson'

// const fullscreen = new FullScreen({source: 'fullscreen', className:'btn_control'});


export const MapaContext = createContext();

export default function MapaProvider({url, children}){
    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url}`);
    // const [selectedOption, setSelectedOption] = useState('')
    const [open, setOpen] = useState(false);

    const [citiesCoordinates, setCitiesCoordinates] = useState({});
  
    
    const [map, setMap] = useState(null)
    const [stateLayer, setStateLayer] = useState(null)
    const [countryLayer, setCountryLayer] = useState(null)
    const [baseLayer, setBaseLayer] = useState(null);


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

        // mapObj.addControl()
    },[url])


    useEffect(()=>{
        if(!map) return
        if(!loading){

            const baseLayer = new TileLayer({source: new OSM(), zIndex: 0});

            const stateLayer = new vector({
                source: new Vector({
                    features: new GeoJSON().readFeatures(data),
                }),
                style: (feature,res)=>{
                    return new Style({
                        fill: new Stroke({
                            color: feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)"
                        }),
                        stroke: new Stroke({
                            color: "rgba(30,30,30)",
                            width: 1,
                        }),
                        text: new Text({
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

            const cities = data['features'].reduce((acc,city)=>{
                const rawCityName = city.properties.NM_MUN.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
                // console.log(rawCityName.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
                if(!acc[rawCityName]){
                    acc[rawCityName] = [];
                }
                acc[rawCityName].push(city.geometry.coordinates[0][0]);
                return acc
            }, {})

            setCitiesCoordinates(cities);
            
            map.getView().setCenter(data.features[0].geometry.coordinates[0][0])
            
        }
    },[data])



    
    return(
        <MapaContext.Provider value={{map, err, loading, countryLayer, baseLayer, stateLayer,open, setOpen, citiesCoordinates}}>
            {children}
        </MapaContext.Provider>
    )
}