import { createContext, useEffect, useState } from 'react';
import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text, Fill} from 'ol/style'
import TileLayer from 'ol/layer/Tile';
import useFetch from '../hooks/useFetch';
import json from '../../geojson'
import Select from 'ol/interaction/Select.js';
import {pointerMove} from 'ol/events/condition.js';


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



function setStyle(feature, settings){
    const {selectedOption, fontSize, subTitle, fillColor, strokeColor, strokeWidth, fontColor} = settings;

    const newStyle = new Style({
              fill: new Fill({
                  color: feature.getProperties().SELECTED ? 'rgb(255,238,0)' :  ((feature.getProperties().fillColor || fillColor) || (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgba(34, 156, 34, 0.7)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption))),
              }),
              stroke: new Stroke({
                  color: strokeColor || "rgba(0,0,0, 1)",
                  width: strokeWidth || 1,
              }),
              text: new Text({
                  text: subTitle === '' ? feature.getProperties().NM_MUN : 
                  (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
                  feature.getProperties().NM_MUN),  
                  font: `bold ${fontSize}px ${"Segoe UI"}`,
                  fill: new Fill({
                        color: (feature.getProperties().fontColor || fontColor) || (feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 0, 0)' : 'rgb(0,0,0)')
                  }),
                  // backgroundFill: new Stroke({
                  //   color: "rgba(255,255,255)",
                  //   width: 1,
                  // }),
              }),
    })  
    return newStyle
}

function handleSelectInteration(settings){

    const select = new Select({
        condition: pointerMove,
        style: (feature, l)=> {
            // console.log('s',feature)    
            const newStyle = feature.getProperties().CD_MUN ? setStyle(feature, {...settings, strokeWidth: 3, fontSize: settings.fontSize + 0.5}) : setStyle(feature, {...settings, fillColor: ''});
            return newStyle
        },
    });
    return select
}
   

export const MapaContext = createContext();

export default function MapaProvider({url, children, setIsLoading}){

    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`);
    const [settings, setSettings] = useState({fontSize: 10, subTitle: '', selectedOption: '', interaction: false});
    const [layers, setLayers] = useState([]);
    const [error,setError] = useState(err);
    const [open, setOpen] = useState(false); 
    const [map, setMap] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState({status: false, type: ''});
    const [countSeletectedFeatures, setCountSeletectedFeatures] = useState(0)
    const [searchValue, setSearchValue] = useState('');

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
                        return setStyle(feature, settings);
                    },
                    zIndex: 3,
                    className: 'stateLayer',
                });

                const countryLayer = new vector({
                        source: new Vector({
                            features: new GeoJSON().readFeatures(json),
                        }),
                        style: (feature,res)=>{
                            return setStyle(feature, {...settings, fillColor: 'rgba(0,0,0,0)', strokeColor: 'rgba(30,30,30)'})
                        },
                        zIndex: 2,
                        className: 'countryLayer'
                });

                const newLayers = [
                    {
                        name: 'Camada Estado',
                        value: 'stateLayer',
                        properties: stateLayer,
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
                        name: 'Camada Base',
                        value: 'baseLayer',
                        properties: baseLayer,
                        status: true,
                        key: 3,
                    },
                ]

                setLayers(newLayers);

                newLayers.forEach(layer=>{
                    map.addLayer(layer.properties);
                });
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
                    const newStyle = setStyle(feature, settings);
                    feature.setStyle(newStyle);
                    feature.setProperties({stylesConfig: settings});
                });
            }
        })

        map.getInteractions().remove(map.getInteractions().item(9));
        settings.interaction && map.addInteraction(handleSelectInteration(settings))

    },[settings, searchValue])


    useEffect(()=>{
        setIsLoading(loading);
    },[loading])

    function addLayer(data){
        const stateLayer = layers.findIndex(layer=>layer.value === 'stateLayer');
        let {layerName, fontColor, fillColor} = data;
        fontColor = typeof fontColor === 'object' ?  fontColor.toRgbString() : fontColor;
        fillColor = typeof fillColor === 'object' ?  fillColor.toRgbString() : fillColor;
        layerName = layerName ||  `Camada ${layers.length + 1}`;

        if(stateLayer === -1)return
        const features = layers[stateLayer].properties.getSource().getFeatures();
        const featuresSelecteds =  features.filter(fs=> fs.getProperties().SELECTED);

        const geoJSON = {
            features: featuresSelecteds.map(f=>{return {type: 'Feature',properties:{...f.getProperties(), fontColor, fillColor} ,geometry: {type: 'Polygon',coordinates: f.getProperties().geometry.getCoordinates()}}}),
            type: "FeatureCollection"
        }

        featuresSelecteds.forEach(fs=>{
            fs.setProperties({SELECTED: false});
            fs.setStyle(setStyle(fs, {...settings}));
        });

        const newLayer = {
            name: layerName || `Camada ${layers.length + 1}`,
            value: `custom_layer${layers.length + 1}`,
            status: true,
            data: {...data},
            key: layers.length + 1,
            properties: new vector({
                source: new Vector({
                    features: new GeoJSON().readFeatures(geoJSON),
                }),
                style: (feature,res)=>{
                    feature.setProperties({SELECTED:false, stylesConfig: {...settings, fillColor, fontColor}});
                    return setStyle(feature, {...feature.getProperties().stylesConfig});
                },
                zIndex: 4,
                className: `custom_layer${layers.length + 1}`,
                // properties: {color: (feature,res)=>(selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption))},
            })
        }

        setLayers(pv=>[...pv, newLayer]);
        setCountSeletectedFeatures(0)
        setSettings((pv)=>pv);
        map.addLayer(newLayer.properties);
    }

    function changeLayer(data, layer){

        let {layerName, fontColor, fillColor} = data
        const features = layer.properties.getSource().getFeatures();

        fontColor = typeof fontColor === 'object' ?  fontColor.toRgbString() : fontColor;
        fillColor = typeof fillColor === 'object' ?  fillColor.toRgbString() : fillColor;

        features.map(feature=>{
            feature.setProperties({fontColor, fillColor, SELECTED:false, stylesConfig: {...settings, fillColor, fontColor}});
            feature.setStyle(setStyle(feature, {...feature.getProperties().stylesConfig}));
        });

        if(layerName.trim() !== ''){
            layer.name = layerName;
        }
    }

    
    return(
        <MapaContext.Provider value={{map, error, loading, open, setOpen, error, layers, setLayers,subtitleCategory,
            isModalOpen, changeLayer, setIsModalOpen,rc: url.rc,  url, searchValue, setSearchValue, settings, setSettings,
            setStyle, addLayer, countSeletectedFeatures, setCountSeletectedFeatures
        }}>
            {children}
        </MapaContext.Provider>
    )
}