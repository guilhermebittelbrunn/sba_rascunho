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
    // const {strokeColor, textColor, fillColor} = style
    const {selectedOption, fontSize, subTitle} = settings 

    const newStyle = new Style({
              fill: new Fill({
                  color: (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption)),
              }),
              stroke: new Stroke({
                  color: "rgba(30,30,30)",
                  width: 1,
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
    const {selectedOption, fontSize, subTitle} = settings

    const select = new Select({
        condition: pointerMove,
        style: (feature)=>{ 
            return new Style({
                fill: new Fill({
                  color: (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption)),
                }),
                stroke: new Stroke({
                    color: 'rgb(30, 30, 30)',
                    width: 3,
                }),
                text: new Text({
                  text: subTitle === '' ? feature.getProperties().NM_MUN : 
                  (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
                  feature.getProperties().NM_MUN),  
                  font: `bold ${fontSize + .5}px ${"Segoe UI"}`,
                  fill: new Fill({
                        color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 0, 0)' : 'rgb(0,0,0)'
                  }),
              }),
            })      
        }    
    });
    return select
}
   

export const MapaContext = createContext();

export default function MapaProvider({url, children, setIsLoading}){

    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`);
    const [settings, setSettings] = useState({fontSize: 10, subTitle: '', selectedOption: '', interaction: false});
    // const [layers, setLayers] = useState({stateLayer, countryLayer, baseLayer})
    const [error,setError] = useState(false);
    const [open, setOpen] = useState(false); 
    const [map, setMap] = useState(null);

    const [stateLayer, setStateLayer] = useState(null);
    const [countryLayer, setCountryLayer] = useState(null);
    const [baseLayer, setBaseLayer] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState({status: false, type: ''});
    const [featuresSelected, setFeaturesSelected] = useState([]);

    // const [fontSize, setFontSize] = useState(10);
    // const [subTitle, setSubTitle] = useState('');
    // const [selectedOption, setSelectedOption] = useState('');
    // const [interaction, setInteraction] = useState(false);

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

        setMap(mapObj);
    },[url])


    useEffect(()=>{
        if(!map || !stateLayer)return

        stateLayer.getSource().getFeatures().forEach(feature=>{
          const newStyle = setStyle(feature, settings);
          feature.setStyle(newStyle);
        });

        map.getInteractions().remove(map.getInteractions().item(9));
        const select = handleSelectInteration(settings);
        settings.interaction && map.addInteraction(select)

    },[settings, searchValue])

    useEffect(()=>{
        console.log(featuresSelected);
    }, [featuresSelected])

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

                console.log(stateLayer);
                
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
        <MapaContext.Provider value={{map, err, loading, setFeaturesSelected, countryLayer, baseLayer, stateLayer,open, setOpen, error, 
            isModalOpen,setIsModalOpen, rc: url.rc,  url, searchValue, setSearchValue, settings, setSettings
  
            // setInteraction,colorCategory, fontSize, setFontSize, subTitle, setSubTitle, selectedOption, setSelectedOption,
        }}>
            {children}
        </MapaContext.Provider>
    )
}