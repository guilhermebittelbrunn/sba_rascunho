import { useEffect, useRef, useContext, useState } from 'react';
import { Spin,Button, Modal } from 'antd';
import {Style,Stroke, Text, Fill} from 'ol/style'
import { useGeographic } from 'ol/proj';
import {SettingOutlined,SelectOutlined, FullscreenExitOutlined,PlusOutlined,FullscreenOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { MapaContext } from '../../contexts/MapaContext';
import ErrorModal from './ErrorModal';
import NewLayerModal from './NewLayerModal';
import AddRepModal from './AddRepModal';


export default function MapPage({handleClick, handleFullScreenAction, handleContext, isFullScreen, setContextMenu}){

    useGeographic();
    
    const { map, loading, setOpen,error, layers, addLayer, settings, setSettings, subtitleCategory, setStyle,
        countSeletectedFeatures, setCountSeletectedFeatures
    } = useContext(MapaContext)
    const {interaction, fontSize, subTitle} = settings

    const [isModalOpen, setIsModalOpen] = useState({newLayerModal: false, addRepModal: false});

    const map1 = useRef(null);

    const showModal = (modalName) => {
        setIsModalOpen((pv)=>{
            return {...pv, [modalName]: true}
        });
        console.log(isModalOpen);
    }
   

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
                    layerName === 'stateLayer' && setContextMenu((pv)=>{return {...pv, properties}});
                })
        });


        map.on('click', (e)=>{
             if(e.originalEvent.ctrlKey){
                map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{

                    if(layer.className_ === "stateLayer"){
                        feature.setProperties({SELECTED: !feature.getProperties().SELECTED});
                        feature.getProperties().SELECTED ? setCountSeletectedFeatures(pv=>pv+1) : setCountSeletectedFeatures(pv=>pv-1)
                        const styleConfig = feature.getProperties().stylesConfig || settings;
                        const newStyle = feature.getProperties().SELECTED ? setStyle(feature, {...styleConfig, fillColor: 'rgb(255,238,0)'}) : setStyle(feature, {...settings});
                        feature.setStyle(newStyle);
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

                        <button onClick={handleFullScreenAction} id='btn_interaction' className='absolute flex justify-center items-center left-50 top-1 h-[30px] border-[1.5px] border-slate-100 outline-none rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base'style={{transform: 'translate(20%, 10%)', transition: 'all .4s'}}>
                            {isFullScreen? <FullscreenExitOutlined/> : <FullscreenOutlined/> }
                        </button>
                        
                        <button onClick={()=>setSettings(pv=>{return {...pv, interaction: !interaction}})} id='btn_interaction' className={`absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px]rounded w-[30px] text-sm text-gray-800 z-50 hover:text-base outline-none ${interaction ? 'bg-slate-200 border-slate-200' : 'bg-slate-100 border-slate-100 '}`} style={{transform: 'translate(20%, 150%)', transition: 'all .4s'}}>
                            <SelectOutlined />
                        </button>

                        <button onClick={()=>{showModal('addRepModal')}} id='btn_add_layer' className={`absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px] border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base outline-none`} style={{transform: 'translate(20%, 275%)', transition: 'all .4s'}}>
                            <UsergroupAddOutlined />
                        </button>

                        <button onClick={()=>{countSeletectedFeatures > 0 && showModal('newLayerModal')}} id='btn_add_layer' className={`absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px] border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base ${countSeletectedFeatures <= 0 && 'opacity-60 cursor-not-allowed'} outline-none`} style={{transform: 'translate(20%, 400%)', transition: 'all .4s'}}>
                            <PlusOutlined />
                             {/* {countSelectedLayers()} */}
                        </button>

                        {/* <newLayerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
                        
                        */}


                        <AddRepModal isModalOpen={isModalOpen.addRepModal} setIsModalOpen={setIsModalOpen}/>
                        <NewLayerModal countSelectedFeatures={countSeletectedFeatures} addLayer={addLayer} isModalOpen={isModalOpen.newLayerModal} setIsModalOpen={setIsModalOpen}/>
                        <div id='map'  onMouseDown={handleClick} className='bg-white absolute top-0 bottom-0 w-full h-full'/> 
                    </>
                    }
                </>
          
                }
            </>
                    
  
  )
}




