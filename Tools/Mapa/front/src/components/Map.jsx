import { useState, useEffect, useRef, useContext } from 'react';
import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text, Fill} from 'ol/style'
import {FullScreen, Zoom} from 'ol/control'
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { Button, theme, Slider, Switch, InputNumber, Spin, Checkbox, message  } from 'antd';
import {SettingOutlined,SelectOutlined, FullscreenExitOutlined,FullscreenOutlined} from '@ant-design/icons';
import useFetch from '../hooks/useFetch';
import ContextMenu from './ContextMenu';
import json from '../../geojson'
import moment from 'moment/moment';
import Drawer from './Drawer';
import Select from 'ol/interaction/Select.js';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition.js';
import { MapaContext } from '../contexts/MapaContext';




    // const [open, setOpen] = useState(false);



   


export default function MapPage({handleClick, handleFullScreenAction, handleChangeCenterValue, handleContext, setGeometry, contextMenu, geometry, viewSettingsValues, isFullScreen, setFullSreen}){
    useGeographic();


    const { map, setIsMapOn, stateLayer,status,setStatus,err, view,loading, setOpen, open} = useContext(MapaContext)
    // const {data, err, loading} = useFetch(`http://localhost:3535/api/${url}`);
    // const [citiesCoordinates, setCitiesCoordinates] = useState({});
    // const [baseLayerEnable, setBaseLayerEnable] = useState(true);
    // const [countryLayerEnable, setCountryLayerEnable] = useState(true);
    // const [selectedOption, setSelectedOption] = useState('')
    // const [fontSize, setFontSize] = useState(10)
    // const [searchCityValue, setSearchCityValue] = useState('')
    // const [subTitle, setSubTitle] = useState('');
    const [interaction, setInteraction] = useState(false);

    const map1 = useRef(null);

    useEffect(()=>{
        if(!map) return
        map.setTarget('map');
        map1.current = map;
        return () => {  
                map1.current.setTarget(null);
        };
    })

    useEffect(()=>{
        if(!map)return
        map.addEventListener('contextmenu', (e)=>{
                handleContext(e.originalEvent)
                const pixels = e.pixel
                map.forEachFeatureAtPixel(pixels, (feature, layer)=>{
                    const properties = feature.getProperties();
                    const layerName = layer.getClassName()
                    layerName === 'stateLayer' && setGeometry(properties)
                })
        })
        // map.addControl(new FullScreen({source: 'fullscreen', className:'btn_control'}));

        // mapDiv.addEventListener('click', ()=>{
        //     map.requestFullscreen().then(res=>{
        //         console.log(res)
        //     })
        // })
    },[map])

    // useEffect(()=>{
    //     if(!map)return
    //     const mapDiv = document.getElementById('map');
    //     console.log(mapDiv)
    //     map.addEventListener('click', async()=>{
    //         try{
    //             const res = await mapDiv.requestFullscreen();
    //             console.log(res);
    //         }catch(err){
    //             console.log('err fullscreen', err);
    //         }
    //     })
    // }, [loading])

    // useEffect(()=>{
    //     if(!map) return
    //     const select = new Select({
    //         condition: pointerMove,
    //         style: selectStyle,
                
    //     })
    //     const selected = new Style({
    //         fill: new Fill({
    //             color: '#eeeeee',
    //         }),
    //         stroke: new Stroke({
    //             color: 'rgb(30, 30, 30)',
    //             width: 3,
    //         }),
    //     });

    //     function selectStyle(feature) {
    //         feature.getProperties().NUMERO_PEDIDO
    //         // stateLayer.-
    //         // const color = (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption));
    //         // selected.setText(new Text({text: feature.getProperties().NM_MUN, scale: fontSize / 9}))
    //         // selected.getFill().setColor(color);
    //         return selected
    //     }

    //     if(interaction) stateLayer.addInteraction(select);
    // },[interaction])

    

    // useEffect(()=>{
    //     if(err)return message.error(err);
   
    //     if(!loading){
    //         console.log(map)
    //         map.setTarget('map')
            
    //         // const stateLayer = new vector({
    //         //     source: new Vector({
    //         //         features: new GeoJSON().readFeatures(data),
    //         //     }),
    //         //     style: (feature,res)=>{

    //         //         return new Style({
    //         //             fill: new Stroke({
    //         //                 color: (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption)),
    //         //             }),
    //         //             stroke: new Stroke({
    //         //                 color: "rgba(30,30,30)",
    //         //                 width: 1,
    //         //             }),
    //         //             text: new Text({
    //         //                 text: subTitle === '' ? feature.getProperties().NM_MUN : 
    //         //                 (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
    //         //                 feature.getProperties().NM_MUN),
    //         //                 // subTitle
    //         //                 // text: JSON.stringify(feature.getProperties().QUANTIDADE_VENDAS),
    //         //                 scale: fontSize / 10
    //         //             }),
    //         //         })
    //         //     },
    //         //     className: 'stateLayer',
    //         //     properties: {color: (feature,res)=>(selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption))},
                
    //         // });
    //         // map.addLayer(new TileLayer({source: new OSM()}))
    //         // map.addLayer(stateLayer)
   
    //     //     const countryLayer = new vector({
    //     //         source: new Vector({
    //     //             features: new GeoJSON().readFeatures(json),
    //     //         }),
    //     //         style: (feature,res)=>{
    //     //         return new Style({
    //     //             fill: new Stroke({
    //     //                 color: "rgba(0,0,0,0)",
    //     //             }),
    //     //             stroke: new Stroke({
    //     //                 color: "rgba(30,30,30)",
    //     //                 width: 1,
    //     //             }),
    //     //         })
    //     //         },
    //     //     });

    //     //     const ViewMap = new View({
    //     //                 extent: [-75, -35, -32, 6],
    //     //                 center: data.features[0].geometry.coordinates[0][0],
    //     //                 zoom: viewSettingsValues.zoom,
    //     //                 maxZoom: 12,
    //     //                 minZoom: 4
    //     //     })
   
    //     //     if(viewSettingsValues.type === 'changed')  ViewMap.setCenterInternal(viewSettingsValues.center);
      
        
    //     //     const fullscreen = new FullScreen({source: 'fullscreen', className:'btn_control'});
             
    //     //     fullscreen.on('enterfullscreen', ()=> setIsFullscreen(true));
    //     //     fullscreen.on('leavefullscreen', ()=> setIsFullscreen(false));

    //     //     const map = new Map({
    //     //             view: ViewMap,
    //     //             layers: [
    //     //                 baseLayer,
    //     //                 countryLayer,
    //     //                 stateLayer
    //     //             ],
    //     //             target: 'map',
    //     //             controls: [fullscreen],
                  
    //     //     });

    //     //    map.addEventListener('contextmenu', (e)=>{
    //     //         const pixels = e.pixel

    //     //         map.forEachFeatureAtPixel(pixels, (feature, layer)=>{
    //     //             const properties = feature.getProperties();
    //     //             const layerName = layer.getClassName()
    //     //             layerName === 'stateLayer' && setGeometry(properties)
    //     //         })
    //     //     })
            
    //     //     const btnInteraction = document.getElementById('btn_interaction');
    //     //     btnInteraction.addEventListener('click', ()=>{setInteraction(!interaction)});

           

    //     //     if(searchCityValue){
    //     //         const rawValue = searchCityValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    //     //         const index = citiesCoordinates[rawValue];
    //     //         if(!index && !loading) message.error('Cidade não encontrada na região do representante');
    //     //         else if(index){
    //     //             map.getView().setCenter(index[0])
    //     //             map.getView().setZoom(10)
    //     //             // setSearchCityValue('');
    //     //         }
    //     //     }
    //     //     map1.current = map;
        
           


    //     //     const select = new Select({
    //     //         condition: pointerMove,
    //     //         style: selectStyle,
                
    //     //     })

    //     //     const selected = new Style({
    //     //         fill: new Fill({
    //     //             color: '#eeeeee',
    //     //         }),
    //     //         stroke: new Stroke({
    //     //             color: 'rgb(30, 30, 30)',
    //     //             width: 3,
    //     //         }),
    //     //     });

    //     //     function selectStyle(feature) {
    //     //         feature.getProperties().NUMERO_PEDIDO
    //     //         const color = (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption));
    //     //         selected.setText(new Text({text: feature.getProperties().NM_MUN, scale: fontSize / 9}))
    //     //         selected.getFill().setColor(color);
    //     //         return selected
    //     //     }

           
           
    //     //     ViewMap.on('change:center', (e)=>{handleChangeCenterValue(e.oldValue, e.target.values_.zoom, 'changed')})
    //     //     if(interaction) map.addInteraction(select);
    //     //     baseLayer.setProperties({visible: baseLayerEnable});
    //     //     countryLayer.setProperties({visible: countryLayerEnable});

    //     //     return () => {  
    //     //         map1.current.setTarget(null);
    //     //     };
    //     // }
    //     }    
    // },[loading, data])
    // },[data, baseLayerEnable, selectedOption, fontSize, searchCityValue, subTitle, countryLayerEnable, interaction])


    // useEffect(()=>{
    //     setSelectedOption('');
    //     setSearchCityValue('');
    //     setSubTitle('');
    //     if(!loading){
    //         const cities = data['features'].reduce((acc,city)=>{
    //             const rawCityName = city.properties.NM_MUN.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    //             // console.log(rawCityName.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    //             if(!acc[rawCityName]){
    //                 acc[rawCityName] = [];
    //             }
    //             acc[rawCityName].push(city.geometry.coordinates[0][0]);
    //             return acc
    //         }, {})
    //         setCitiesCoordinates(cities);
    //     }
    
    // },[data])

  return (
   
            <>  
                { loading ? <Spin size='large' className='spin'/> : 
                <>
                    <div type="primary" id="settings" onClick={()=>{setOpen(true);}} style={{transform: 'translateY(300%)', transition: 'all .4s'}} 
                        className={`hover:cursor-pointer hover:bg-slate-400  rounded-r-lg 
                        hover:w-12 absolute left-50 top-50 h-28 p-2 flex justify-center items-center w-8 bg-slate-300 z-20 opacity-80
                        `}>
                        <SettingOutlined className='text-gray-900 text-lg font-black'/>
                    </div>

                    <button onClick={handleFullScreenAction} id='btn_interaction' className='absolute flex justify-center items-center left-50 top-1 h-[30px] border-[1.5px] border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base'style={{transform: 'translate(20%, 10%)', transition: 'all .4s'}}>
                           {isFullScreen? <FullscreenExitOutlined/> : <FullscreenOutlined/> }
                    </button>
                    
                    <button onClick={()=>setInteraction(pv=>!pv)} id='btn_interaction' className='absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px] border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base'style={{transform: 'translate(20%, 150%)', transition: 'all .4s'}}>
                        <SelectOutlined />
                    </button>
                                
                                
                    <div id='map' onMouseDown={handleClick} className='bg-white absolute top-0 bottom-0 w-full h-full'/> 
                    {/* <div id='map' onMouseDown={handleClick} className='bg-white absolute top-0 bottom-0 w-full h-full' onContextMenu={(e)=>{handleContext(e)}}/>  */}
                    {/* {isFullScreen && <ContextMenu contextMenu={contextMenu} geometry={geometry}/>} */}
                </>
          
                }
            </>
                    
  
  )
}




