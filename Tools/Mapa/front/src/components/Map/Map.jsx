import { useState, useEffect, useRef, useContext } from 'react';
import { Spin } from 'antd';
import {Style,Stroke, Text, Fill} from 'ol/style'
import { useGeographic } from 'ol/proj';
import {SettingOutlined,SelectOutlined, FullscreenExitOutlined,FullscreenOutlined} from '@ant-design/icons';
import Select from 'ol/interaction/Select.js';
import {pointerMove} from 'ol/events/condition.js';
import { MapaContext } from '../../contexts/MapaContext';
import ErrorModal from './ErrorModal';


const select = new Select({
    condition: pointerMove,
    style: (feature)=>{ 
        return new Style({
            fill: new Fill({
                color: feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)"
            }),
            stroke: new Stroke({
                color: 'rgb(30, 30, 30)',
                width: 3,
            }),
            text: new Text({
                                fill: new Fill({
                                    color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 30, 30)' : 'rgb(0,0,0)'
                                }),
                                font: 'bold 10px "Segoe UI"',
                                text: feature.getProperties().NM_MUN,
                                scale: 1.0
                            })
        })      
    }    
});
   

export default function MapPage({handleClick, handleFullScreenAction, handleContext, setGeometry, isFullScreen}){

    useGeographic();
    
    const { map, loading, setOpen, error} = useContext(MapaContext)
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
    },[map])

    useEffect(()=>{
        if(!map) return
        interaction? map.addInteraction(select) : console.log(map.removeInteraction(select));
    },[interaction])

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




