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
    const {selectedOption, fontSize, subTitle, fillColor, strokeColor, strokeWidth} = settings;

    const newStyle = new Style({
              fill: new Fill({
                  color: fillColor || (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption)),
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
                        color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 0, 0)' : 'rgb(0,0,0)'
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
        style: (feature)=> {    
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
    const [featuresSelected, setFeaturesSelected] = useState([]);

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

        const stateLayer = layers.findIndex(layer=>layer.value === 'stateLayer');
        if(!map || stateLayer === -1)return
        layers[stateLayer].properties.getSource().getFeatures().forEach(feature=>{
          const newStyle = setStyle(feature, settings);
          feature.setStyle(newStyle);
        });

        map.getInteractions().remove(map.getInteractions().item(9));
        const select = handleSelectInteration(settings);
        settings.interaction && map.addInteraction(select)

    },[settings, searchValue])

    useEffect(()=>{
    //    const newlist = featuresSelected.reduce((acc,fs)=>{
    //         const index = acc.findIndex(element=> element.CD_MUN === fs.CD_MUN);
    //         index === -1 && acc.push(fs);
    //         return acc
    //    },[]);
    //    setFeaturesSelected(newlist);
    //    featuresSelected.forEach(fs=>{
    //         console.log(fs)
    //    })
        featuresSelected.forEach(fs=>{
            const isSeleted = fs.getProperties().SELECTED;
    
            const style = isSeleted ? setStyle(fs, {...settings, fillColor: 'rgb(255,238,0)'}) : setStyle(fs, settings);
             fs.setStyle(style);
        })
    }, [featuresSelected]);


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
                        return setStyle(feature, settings);
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


                const newLayers = [
                    {
                        name: 'Camada Estado',
                        value: 'stateLayer',
                        properties: stateLayer
                    },
                    {
                        name: 'Camada País',
                        value: 'countryLayer',
                        properties: countryLayer
                    },
                    {
                        name: 'Camada base',
                        value: 'baseLayer',
                        properties: baseLayer
                    },
                ]

                setLayers(newLayers)

                newLayers.forEach(layer=>{
                    map.addLayer(layer.properties);
                })


                map.getView().setCenter(data.features[0].geometry.coordinates[0][0]);
                setError(false);
            }catch(error){
                setError(error);
                // setMap(null)
            }
            
        }
    },[data])


    useEffect(()=>{
        setIsLoading(loading);
    },[loading])

    // function addFeatureSelected(feature){
    //     console.log(feature);
    //     console.log('featuresSelected', featuresSelected);
    //     const index = featuresSelected.findIndex(fs=>fs.CD_MUN === feature.getProperties().CD_MUN);
    //     if(index === -1){
    //         setFeaturesSelected(pv=>[...pv, feature]);
    //     }                
            
    // }

    function addLayer(){
        const newlist = featuresSelected.reduce((acc,fs)=>{
            const index = acc.findIndex(element=> element.getProperties().CD_MUN === fs.getProperties().CD_MUN);
            index === -1 && acc.push(fs);
            return acc
        },[]);
        // setFeaturesSelected(newlist);
        // console.log(newlist);
        const Features = {
            features: newlist.map(f=>f.getProperties().geometry.getCoordinates()),
            type: "FeatureCollection"
        }
        // console.log(data);
        // // console.log(newlist[0].getProperties().geometry.getCoordinates());
        // console.log(Features)
        // // getCoordinates
        const newLayer = {
            name: 'Layer Nova',
            value: 'newLayer',
            properties: new vector({
                source: new Vector({
                    features: new GeoJSON().readFeatures(Features),
                }),
                style: (feature,res)=>{
                    return setStyle(feature, {...settings, fillColor: 'rgb(0,0,200)'});
                },
                zIndex: 4,
                className: 'newLayer',
                // properties: {color: (feature,res)=>(selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption))},
            })
        }
        setLayers(pv=>[...pv, newLayer]);
        map.addLayer(newLayer.properties);

    }


    
    return(
        <MapaContext.Provider value={{map, error, loading,featuresSelected, setFeaturesSelected, open, setOpen, error, layers, subtitleCategory,
            isModalOpen,setIsModalOpen, rc: url.rc,  url, searchValue, setSearchValue, settings, setSettings, setStyle, addLayer
        }}>
            {children}
        </MapaContext.Provider>
    )
}