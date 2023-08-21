import { useState, useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text} from 'ol/style'
import {FullScreen} from 'ol/control'
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';;
import { Spin, Checkbox  } from 'antd'
import json from '../../geojson'
import useFetch from '../hooks/useFetch';
import { Button, Drawer, Select } from 'antd';
import ContextMenu from './ContextMenu';
import { Layout, theme } from 'antd';
import {SettingOutlined} from '@ant-design/icons';


const optionsSelect = [
        {
          value: '',
          label: 'Sem categoria',
        },
        {
          value: 'ULTIMA_VENDA',
          label: 'Por data',
        },
        {
          value: 'QUANTIDADE_VENDAS',
          label: 'N° vendas',
        },
        {
          value: 'QUANTIDADE_CLIENTES_CIDADE',
          label: 'N° clientes',
        },
      ]

export default function MapPage({url, handleContext, handleClick, setGeometry, contextMenu, geometry}){
    useGeographic();
    const { token } = theme.useToken();

    const handleChange = (value) => {
       setSelectedOption(value)
       console.log(selectedOption)
    };

    const [open, setOpen] = useState(false);
    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url}`);
    const [baseLayerEnable, setBaseLayerEnable] = useState(true);
    const [isFullScreen ,setIsFullscreen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

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
                x = Math.floor(label[option] / 2)
                x = tailwindColors[x]
            case 'QUANTIDADE_CLIENTES_CIDADE':
                x = Math.floor(label[option] / 1.5)
                x = tailwindColors[x]
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
                            text: JSON.stringify(feature.getProperties().QUANTIDADE_VENDAS),
                            font: 'sans-serif bold'
                        })
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
          
    },[data, baseLayerEnable, selectedOption])


    useEffect(()=>{
        console.log(isFullScreen)
    },[isFullScreen])

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
                        <Drawer
                            title="Opções"
                            placement="left"
                            closable={true}
                            onClose={()=>{setOpen(false);}}
                            open={open}
                            getContainer={false}
                
                        >
                            <div className='w-full flex flex-col gap-4 justify-center'>
                                    <Checkbox  onClick={(e)=>{setBaseLayerEnable(e.target.checked)}} checked={baseLayerEnable}>Enable base layer</Checkbox>
                                    <div className='flex flex-col'>
                                        <label className='font-bold text-base' htmlFor='category'>Layer category</label>
                                        <Select defaultActiveFirstOption={true} name='category' options={optionsSelect} defaultValue="Sem categoria" className='w-[160px]' onChange={handleChange}/>
                                    </div>
                            </div>

                        </Drawer>       
                    </div>
                   
           
                }
            </section>
  
  )
}



