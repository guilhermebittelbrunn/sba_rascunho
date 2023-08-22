import { useState, useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text} from 'ol/style'
import {FullScreen} from 'ol/control'
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';;
import { Button, Select, theme, Slider, Switch, InputNumber, Spin, Checkbox  } from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import useFetch from '../hooks/useFetch';
import ContextMenu from './ContextMenu';
import json from '../../geojson'
import moment from 'moment/moment';
import Drawer from './Drawer';




export default function MapPage({url, handleContext, handleClick, setGeometry, contextMenu, geometry}){
    useGeographic();

    const [open, setOpen] = useState(false);
    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url}`);
    const [isFullScreen ,setIsFullscreen] = useState(false)
    const [baseLayerEnable, setBaseLayerEnable] = useState(true);
    const [selectedOption, setSelectedOption] = useState('')
    const [fontSize, setFontSize] = useState(10)


    const map1 = useRef(null);

    function colorCategory(label, option){
        if(!label[option]){
            return 'rgba(221,221,223,0.7)'
        }
        const tailwindColors = {
            0: 'rgba(221,221,223,0.7)',
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
                            text: feature.getProperties().NM_MUN,
                            // text: JSON.stringify(feature.getProperties().QUANTIDADE_VENDAS),
                            scale: fontSize / 10
                        }),
                    })
                },
                className: 'stateLayer',
              
                
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

            const fullscreen = new FullScreen({source: 'fullscreen'})
        
            const map = new Map({
                    view: new View({
                        extent: [-75, -35, -32, 6],
                        center: [-50, -16],
                        zoom: 4,
                        maxZoom: 12,
                        minZoom: 6
                    }),
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

            map1.current = map;
            baseLayer.setProperties({visible: baseLayerEnable})

            return () => {
                map1.current.setTarget(null);
            };
        }
          
    },[data, baseLayerEnable, selectedOption, fontSize])


    useEffect(()=>{
        setSelectedOption('')
    },[data])

  return (
   
            <section>
                { loading ? <Spin size='large' className='spin'/> : 
                    <div id="fullscreen" className={`fullscreen relative m-auto flex items-center w-[100%] h-[90vh] max-lg:flex-col`}>
      
                        <div className={`w-full relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>
                            <div type="primary" id="settings" onClick={()=>{setOpen(true);}} style={{transform: 'translateY(300%)'}} 
                                className={`hover:cursor-pointer hover:bg-slate-400 transition-opacity rounded-r-lg 
                                hover:w-12 absolute left-50 top-50 h-28 p-2 flex justify-center items-center w-8 bg-slate-300 z-20 opacity-80
                                `}>
                                <SettingOutlined className='text-gray-900 text-lg font-black'/>
                            </div>
                            <div id='map' onMouseDown={handleClick} className='absolute top-0 bottom-0 w-full h-full' onContextMenu={(e)=>{handleContext(e)}}/> 
                        </div>
                       {isFullScreen && <ContextMenu contextMenu={contextMenu} geometry={geometry}/>}
                        <Drawer open={open}  setOpen={setOpen} selectedOption={selectedOption} setSelectedOption={setSelectedOption} baseLayerEnable={baseLayerEnable} setFontSize={setFontSize} fontSize={fontSize} setBaseLayerEnable={setBaseLayerEnable}/>
                    </div>
                   
           
                }
            </section>
  
  )
}



