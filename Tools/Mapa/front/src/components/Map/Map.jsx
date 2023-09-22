import { useEffect, useRef, useContext, useState } from 'react';
import { Spin } from 'antd';
import { SettingOutlined, SelectOutlined, FullscreenExitOutlined, PlusOutlined, FullscreenOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { MapaContext } from '../../contexts/MapaContext';
import ErrorModal from '../Modal/ErrorModal';
import LayerModal from '../Modal/LayerModal';
import AddRepModal from '../Modal/AddRepModal';


export default function MapPage({handleClick, handleFullScreenAction, handleContext, isFullScreen, setContextMenu, setOpen}){

    const [isModalOpen, setIsModalOpen] = useState({layerModal: false, addRepModal: false});
    const {map, loading,error, settings, setSettings, createFeatureStyle, countSelectedFeatures, setCountSelectedFeatures} = useContext(MapaContext);
    
    const {interaction, fontSize, subTitle} = settings
    const map1 = useRef(null);


    function showModal(modalName){
        setIsModalOpen((pv)=>{
            return {...pv, [modalName]: true}
        });
    }

    function disableModal(){
        setIsModalOpen({layerModal: false, addRepModal: false});
    };


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
                        
                        const featureProperties = feature.getProperties() 
                        const styleConfig = featureProperties.stylesConfig || settings;
                        
                        feature.setProperties({SELECTED: !featureProperties.SELECTED});

                        if(feature.getProperties().SELECTED){
                            setCountSelectedFeatures(pv=>pv+1);
                            return feature.setStyle(createFeatureStyle(feature, {...styleConfig, fillColor: 'rgb(255,238,0)'}));
                        }
                        setCountSelectedFeatures(pv=>pv-1);
                        // console.log('map', countSelectedFeatures)
                        feature.setStyle(createFeatureStyle(feature, {...settings}))
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
                        
                        <div 
                            type="primary" id="settings" onClick={()=>{setOpen(true);}} 
                            style={{transform: 'translateY(300%)', transition: 'all .4s'}} 
                            className={`hover:cursor-pointer hover:bg-slate-400  rounded-r-lg 
                            hover:w-12 absolute left-50 top-50 h-28 p-2 flex justify-center items-center w-8
                            bg-slate-300 z-20 opacity-80`}
                        >
                            <SettingOutlined className='text-gray-900 text-lg font-black'/>
                        </div>

                        <button 
                            onClick={handleFullScreenAction} className={`absolute flex justify-center items-center 
                            top-1 h-[30px] border-[1.5px]border-slate-100 outline-none rounded w-[30px] left-50 
                            text-sm text-gray-800 bg-slate-100 z-50 hover:text-base`} 
                            style={{transform: 'translate(20%, 10%)', transition: 'all .4s'}}
                        >
                            {isFullScreen? <FullscreenExitOutlined/> : <FullscreenOutlined/> }
                        </button>
                        
                        <button 
                            onClick={()=>setSettings(pv=>{return {...pv, interaction: !interaction}})} 
                            className={`absolute flex justify-center items-center left-50 top-50 h-[30px] 
                            border-[1.5px]rounded w-[30px] text-sm text-gray-800 z-50 hover:text-base outline-none 
                            ${interaction ? 'bg-slate-200 border-slate-200' : 'bg-slate-100 border-slate-100 '}`} 
                            style={{transform: 'translate(20%, 150%)', transition: 'all .4s'}}
                        >
                            <SelectOutlined />
                        </button>

                        <button 
                            onClick={()=>{showModal('addRepModal')}} className={`absolute flex 
                            justify-center items-center left-50 top-50 h-[30px] border-[1.5px] border-slate-100 
                            rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base outline-none`} 
                            style={{transform: 'translate(20%, 275%)', transition: 'all .4s'}}
                        >
                            <UsergroupAddOutlined />
                        </button>

                        <button 
                            onClick={()=>{countSelectedFeatures > 0 && showModal('layerModal')}} 
                            className={`absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px]
                            border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 
                            hover:text-base ${countSelectedFeatures <= 0 && 'opacity-60 cursor-not-allowed'} 
                            outline-none`} style={{transform: 'translate(20%, 400%)', transition: 'all .4s'}}
                        >
                            <PlusOutlined />
                        </button>


                        <AddRepModal isModalOpen={isModalOpen.addRepModal} disableModal={disableModal}/>
                        <LayerModal  isModalOpen={isModalOpen.layerModal} disableModal={disableModal}/>
                        <div id='map' onMouseDown={handleClick} className='bg-white absolute top-0 bottom-0 w-full h-full'/> 
                    </>
                    }
                </>
          
                }
            </>
                    
  
  )
}




