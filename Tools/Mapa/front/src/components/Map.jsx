import { useState, useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text, Fill} from 'ol/style'
import {FullScreen} from 'ol/control'
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';;
import { Button, theme, Slider, Switch, InputNumber, Spin, Checkbox, message  } from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import useFetch from '../hooks/useFetch';
import ContextMenu from './ContextMenu';
import json from '../../geojson'
import moment from 'moment/moment';
import Drawer from './Drawer';
import Select from 'ol/interaction/Select.js';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition.js';

    const [open, setOpen] = useState(false);
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
            5: 'rgb(22,101,52)',
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
        // console.log(label[option])
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


export default function MapPage({url, handleChangeCenterValue,handleContext, handleClick, setGeometry, contextMenu, geometry, viewSettingsValues}){
    useGeographic();

    const [open, setOpen] = useState(false);
    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url}`);
    const [citiesCoordinates, setCitiesCoordinates] = useState({});
    const [isFullScreen ,setIsFullscreen] = useState(false)
    const [baseLayerEnable, setBaseLayerEnable] = useState(true);
    const [countryLayerEnable, setCountryLayerEnable] = useState(true);
    const [selectedOption, setSelectedOption] = useState('')
    const [fontSize, setFontSize] = useState(10)
    const [searchCityValue, setSearchCityValue] = useState('')
    const [subTitle, setSubTitle] = useState('');

    const map1 = useRef(null);

    

    useEffect(()=>{
        
        if(!loading){

            const baseLayer = new TileLayer({source: new OSM()});

            const stateLayer = new vector({
                source: new Vector({
                    features: new GeoJSON().readFeatures(data),
                }),
                style: (feature,res)=>{

                    return new Style({
                        fill: new Stroke({
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
                            // subTitle
                            // text: JSON.stringify(feature.getProperties().QUANTIDADE_VENDAS),
                            scale: fontSize / 10
                        }),
                    })
                },
                className: 'stateLayer',
                properties: {color: (feature,res)=>(selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption))},
                
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
            });

            const ViewMap = new View({
                        extent: [-75, -35, -32, 6],
                        center: data.features[0].geometry.coordinates[0][0],
                        zoom: viewSettingsValues.zoom,
                        maxZoom: 12,
                        minZoom: 4
            })
   
            if(viewSettingsValues.type === 'changed')  ViewMap.setCenterInternal(viewSettingsValues.center);
      
            const fullscreen = new FullScreen({source: 'fullscreen'})
            const map = new Map({
                    view: ViewMap,
                    layers: [
                        baseLayer,
                        countryLayer,
                        stateLayer
                    ],
                    target: 'map',
                    controls: [fullscreen],
                  
            });

            // map.on('click', (e)=>{
            //     console.log('left click',e);
            //         map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
            //             let coordinate = e.coordinate;
            //             let featureTitle = feature.getProperties()
            //             // console.log(featureTitle)
            //     })
            // })

           map.addEventListener('contextmenu', (e)=>{
                const pixels = e.pixel
                
                // console.log('right click', e)
                map.forEachFeatureAtPixel(pixels, (feature, layer)=>{
                    const properties = feature.getProperties();
                    const layerName = layer.getClassName()
                    layerName === 'stateLayer' && setGeometry(properties)

                })
              
            })
    

            fullscreen.on('enterfullscreen', ()=>{
                setIsFullscreen(true)
            })
            fullscreen.on('leavefullscreen', ()=>{
                setIsFullscreen(false)
            })

            if(searchCityValue !== ''){
                const rawValue = searchCityValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
                const index = citiesCoordinates[rawValue];
                if(!index && !loading) message.error('Cidade não encontrada na região do representante');
                else if(index){
                    map.getView().setCenter(index[0])
                    map.getView().setZoom(10)
                    // setSearchCityValue('');
                }
            }
            map1.current = map;
        
            ViewMap.on('change:center', (e)=>{handleChangeCenterValue(e.oldValue, e.target.values_.zoom, 'changed')})

            // map.on('click', (e)=>{
                
            //     map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
            //         // const newStyle = {style: (feature,res)=>{
            //         //     return new Style({
                        
            //         //         stroke: new Stroke({
            //         //             color: "rgba(30,30,30)",
            //         //             width: 1,
            //         //         }),
            //         //     })
            //         //     },}


            //         console.log(layer.getProperties().style)                    
                               
            //         feature.setStyle(layer.getProperties().style)
                    
            //     })
            // })

            const select = new Select({
                condition: pointerMove,
                style: selectStyle,
                
            })

            const selected = new Style({
                fill: new Fill({
                    color: '#eeeeee',
                }),
                stroke: new Stroke({
                    color: 'rgb(30, 30, 30)',
                    width: 3,
                }),
            });

            function selectStyle(feature) {
                const color = (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption));
                selected.setText(new Text({text: feature.getProperties().NM_MUN, scale: fontSize / 9}))
                selected.getFill().setColor(color);
                return selected
            }

            if (select === null) {
                map.addInteraction(select);
            }

            

            baseLayer.setProperties({visible: baseLayerEnable})
            countryLayer.setProperties({visible: countryLayerEnable})

            return () => {  
                map1.current.setTarget(null);
            };
        }
          
    },[data, baseLayerEnable, selectedOption, fontSize, searchCityValue, subTitle, countryLayerEnable])


    useEffect(()=>{
        setSelectedOption('');
        setSearchCityValue('');
        setSubTitle('');
        if(!loading){
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
        }
    
    },[data])

  return (
   
            <section>
                { loading ? <Spin size='large' className='spin'/> : 
                    <div id="fullscreen" className={`fullscreen relative m-auto flex items-center w-[100%] h-[90vh] max-lg:flex-col`}>
      
                        <div className={`w-full relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>
                            <div type="primary" id="settings" onClick={()=>{setOpen(true);}} style={{transform: 'translateY(300%)', transition: 'all .4s'}} 
                                className={`hover:cursor-pointer hover:bg-slate-400  rounded-r-lg 
                                hover:w-12 absolute left-50 top-50 h-28 p-2 flex justify-center items-center w-8 bg-slate-300 z-20 opacity-80
                                `}>
                                <SettingOutlined className='text-gray-900 text-lg font-black'/>
                            </div>
                            <div id='map' onMouseDown={handleClick} className='bg-white absolute top-0 bottom-0 w-full h-full' onContextMenu={(e)=>{handleContext(e)}}/> 
                        </div>
                       {isFullScreen && <ContextMenu contextMenu={contextMenu} geometry={geometry}/>}
                        <Drawer 
                            open={open} setSubTitle={setSubTitle} setSearchCityValue={setSearchCityValue} setOpen={setOpen} selectedOption={selectedOption} 
                            setSelectedOption={setSelectedOption} baseLayerEnable={baseLayerEnable} setFontSize={setFontSize} fontSize={fontSize} countryLayerEnable={countryLayerEnable} 
                            setCountryLayerEnable={setCountryLayerEnable} setBaseLayerEnable={setBaseLayerEnable}
                        />
                    </div>
                   
           
                }
            </section>
  
  )
}


