import { createContext, useEffect, useState } from 'react';
import { Map, View } from 'ol';
import { Vector as vector } from 'ol/layer'
import { OSM, Vector } from 'ol/source';
import { GeoJSON } from 'ol/format'
import { Style,Stroke, Text, Fill } from 'ol/style'
import { DEVICE_PIXEL_RATIO } from 'ol/has';
import TileLayer from 'ol/layer/Tile';
import Select from 'ol/interaction/Select.js';
import { pointerMove } from 'ol/events/condition.js';
import useFetch from '../hooks/useFetch';
import json from '../../geojson'


 function createAARotatedPattern(lineWidth, spacing, ang, color) {
    const can = document.createElement('canvas');
    const ctx = can.getContext('2d');
    const w = (can.width = 2);
    const h = (can.height = spacing);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 2, lineWidth);

    const pat = ctx.createPattern(can, 'repeat');
    const xAx = Math.cos(ang);
    const xAy = Math.sin(ang);
    pat.setTransform(new DOMMatrix([xAx, xAy, -xAy, xAx, 0, 0]));
    return pat;
}

function colorCategory(label, option){
        if(!label[option]){
            return 'rgba(221,221,223,0.7)'
        }
        const tailwindColors = {
            0: 'rgba(221,221,223,0.8)',
            1: 'rgba(240,253,244, 0.8)',
            2: 'rgba(187,247,208, 0.8)',
            3: 'rgba(74,222,128, 0.8)',
            4: 'rgba(22,163,74, 0.8)',
            5: 'rgba(28, 122, 64, 0.8)',
        }
        let points;
        switch (option){
            case 'QUANTIDADE_VENDAS':
                points = label[option] / 2
                points = points > 5 ? 5 : points
                points = points > 0 && points < 1 ? 1 : points
                points = tailwindColors[Math.floor(points)]
            case 'QUANTIDADE_CLIENTES_CIDADE':
                points = label[option] / 1.5
                points = points > 5 ? 5 : points
                points = (points > 0 && points < 1) ? 1 : points
                points = tailwindColors[Math.floor(points)]
            case 'ULTIMA_VENDA':
                return points
        }
        return points
} 

function subtitleCategory(label, option){
        let res;
        switch(option){
            case 'ULTIMA_VENDA':
                res = moment(label).format('DD/MM/YYYY');
                break
            case 'AREA_KM2':
                res = label + " km²";
                break
            default: 
                res = label
        }
        return res
}

function createColor(feature, selectedOption, layer){
    let color;

    if(feature.SELECTED) color = 'rgb(255,238,0)';
    else{
        if(feature.NUMERO_PEDIDO){
            if(layer?.value === 'stateLayer'){
                if(selectedOption) color = colorCategory(feature, selectedOption);
                else color = "rgba(34, 156, 34, 0.7)";
            }
            else{
                if(feature.fillStyle){
                    color = createAARotatedPattern(4, 10, feature.fillStyle, feature.fillColor) || "rgba(34, 156, 34, 0.7)";
                }
                else color = feature.fillColor || "rgba(34, 156, 34, 0.7)";
            }
        }
        else{
            if(feature.fillStyle){
                color = createAARotatedPattern(2, 10, feature.fillStyle, feature.fillColor) || "rgba(221,221,223,0.7)";
                // color = createAARotatedPattern(2, 10, 110, "rgba(221,221,223,0.7)") || "rgba(221,221,223,0.7)";
            }
            else color = feature.fillColor || "rgba(221,221,223,0.7)";
        }
    }
    return color
}

// list = [false, 110, 45, 90, 300]


function createFeatureStyle(feature, settings, layer){

    const {selectedOption, fontSize, subTitle, fontColor, strokeColor, strokeWidth, zIndex} = settings;
    const featureProperties = feature.getProperties();
    const color = createColor(featureProperties, selectedOption, layer);

    let newStyle = new Style({
              fill: new Fill({color}),
              stroke: new Stroke({
                  color: featureProperties.strokeColor || (strokeColor || "rgba(0,0,0, 1)"),
                  width: featureProperties.strokeWidth || (strokeWidth || 1),
              }),
              text: new Text({
                  text: subTitle === '' ? featureProperties.NM_MUN : 
                  (featureProperties[subTitle]? `${featureProperties.NM_MUN} \n ${subtitleCategory(featureProperties[subTitle], subTitle)}` : 
                  featureProperties.NM_MUN),  
                  font: `bold ${fontSize}px ${"Segoe UI"}`,
                  fill: new Fill({
                        color: (featureProperties.fontColor || fontColor) || (featureProperties.NUMERO_PEDIDO ? 'rgb(0, 0, 0)' : 'rgb(0,0,0)')
                  }),
                //   overflow: true
                  // backgroundFill: new Stroke({
                  //   color: "rgba(255,255,255)",
                  //   width: 1,
                  // }),
              }),
    })  

    // if(zIndex){
    //     console.log('zIndex', zIndex)
    //     newStyle.setZIndex(zIndex);
    //     console.log(newStyle)
    // }


    return newStyle
}



function handleSelectInteration(settings){

    const select = new Select({
        condition: pointerMove,
        style: (feature)=> {
            const newStyle = createFeatureStyle(feature, {...settings, strokeWidth: 3, fontSize: settings.fontSize + 0.5}, {value: 'stateLayer'});
            return newStyle
        },
    });
    return select
}
   
export const MapaContext = createContext();

export default function MapaProvider({url, children, setIsLoading}){

    const { data, err, loading } = useFetch(`http://localhost:3535/api/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`);
    const [settings, setSettings] = useState({fontSize: 10, subTitle: '', selectedOption: '', interaction: false});
    const [layers, setLayers] = useState([]);
    const [error,setError] = useState(err);
    const [map, setMap] = useState(null);
    const [countSelectedFeatures, setCountSelectedFeatures] = useState(0);

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
        });
        setLayers([]);
        setMap(mapObj);

    },[url])

    useEffect(()=>{
        if(!map) return
        if(!loading){
            try{
                const baseLayer = new TileLayer({source: new OSM(), zIndex: 1, className: 'baseLayer'});

                const stateLayer = new vector({
                    source: new Vector({
                        features: new GeoJSON().readFeatures(data),
                    }),
                    style: (feature,res)=>{
                        return createFeatureStyle(feature, settings);
                    },
                    zIndex: 3,
                    className: 'stateLayer',
                    rc: url.rc
                });

                const countryLayer = new vector({
                        source: new Vector({
                            features: new GeoJSON().readFeatures(json),
                        }),
                        style: (feature,res)=>{
                            feature.setProperties({fillColor: 'rgba(0,0,0,0)', strokeColor: 'rgba(30,30,30)', strokeWidth: 1});
                            return createFeatureStyle(feature, {...settings});
                        },
                        zIndex: 2,
                        className: 'countryLayer'
                });

                const newLayers = [
                     {
                        name: 'Camada Base',
                        value: 'baseLayer',
                        properties: baseLayer,
                        status: true,
                        key: 1,
                    },
                    {
                        name: 'Camada País',
                        value: 'countryLayer',
                        properties: countryLayer,
                        status: true,
                        key: 2,
                    },
                    {
                        name: `Camada RC (${stateLayer.values_.rc})`,
                        value: 'stateLayer',
                        properties: stateLayer,
                        status: true,
                        key: 3,
                        data: {
                            fillColor: "rgba(34, 156, 34, 0.7)",
                            fillStyle: false,
                        },
                    },
                ]

                setLayers(newLayers);

                newLayers.forEach(layer=>{map.addLayer(layer.properties)});
                map.getView().setCenter(data.features[0].geometry.coordinates[0][0]);
                setError(false);
            }catch(error){
                setError(error);
                // setMap(null)
            }
        }
    },[data])

    useEffect(()=>{

        const stateLayer = layers.findIndex(layer=>layer.value === 'stateLayer');
        if(!map || stateLayer === -1)return

        layers.forEach(layer=>{
            if(layer.properties.className_ !== 'baseLayer' && layer.properties.className_ !== 'countryLayer'){
                layer.properties.getSource().getFeatures().forEach(feature=>{
                    const newStyle = createFeatureStyle(feature, settings, layer);
                    feature.setStyle(newStyle);
                    feature.setProperties({stylesConfig: settings});
                });
            }
        })

        map.getInteractions().remove(map.getInteractions().item(9));
        settings.interaction && map.addInteraction(handleSelectInteration(settings))

    },[settings])


    useEffect(()=>{
        setIsLoading(loading);
    },[loading])

    return(
        <MapaContext.Provider value={{map, error, loading, error, layers, setLayers,subtitleCategory,rc: url.rc,  url, settings, setSettings,
            createFeatureStyle, countSelectedFeatures, setCountSelectedFeatures
        }}>
            {children}
        </MapaContext.Provider>
    )
}