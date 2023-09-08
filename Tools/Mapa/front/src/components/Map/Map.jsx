import { useState, useEffect, useRef, useContext } from 'react';
import { Spin } from 'antd';
import {Style,Stroke, Text, Fill} from 'ol/style'
import { useGeographic } from 'ol/proj';
import {SettingOutlined,SelectOutlined, FullscreenExitOutlined,FullscreenOutlined} from '@ant-design/icons';

import { MapaContext } from '../../contexts/MapaContext';
import ErrorModal from './ErrorModal';



export default function MapPage({handleClick, handleFullScreenAction, handleContext, setGeometry, isFullScreen}){

    useGeographic();
    
    const { map, loading, setOpen, error, setFeaturesSelected, setInteraction} = useContext(MapaContext)
   
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
                handleContext(e.originalEvent);
                const pixels = e.pixel;
                map.forEachFeatureAtPixel(pixels, (feature, layer)=>{
                    const properties = feature.getProperties();
                    const layerName = layer.getClassName();
                    layerName === 'stateLayer' && setGeometry(properties);
                })
        });

        map.addEventListener('click', (e)=>{
            if(e.originalEvent.ctrlKey){
                map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
                    // console.log(feature.getProperties());
                    if(feature.getProperties().CD_MUN){
                        const style = new Style({
                            fill: new Fill({
                                color: "rgb(255, 238, 0)"
                            }),
                            stroke: new Stroke({
                                color: "rgba(30,30,30)",
                                width: 1,
                            })
                        })
                        feature.setStyle(style)
                    }
                    
          
                })
            }
        });
    },[map])

    

  return (
   
            <>  
                { loading ? <Spin size='large' className='spin'/> : 
                <>
                    {error ? <ErrorModal error={error}/> :
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
                    </>
                    }
                </>
          
                }
            </>
                    
  
  )
}




