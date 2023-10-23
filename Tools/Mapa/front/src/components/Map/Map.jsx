import { useEffect, useRef, useContext, useState } from 'react';
import { Spin } from 'antd';
import { UnorderedListOutlined, SettingOutlined, SelectOutlined, FullscreenExitOutlined, PlusOutlined, FullscreenOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { MapaContext } from '../../contexts/MapaContext';
import ErrorModal from '../Modal/ErrorModal';
import LayerModal from '../Modal/LayerModal';
import AddRepModal from '../Modal/AddRepModal';
import Subtitle from './Subtitle';

export default function MapPage({ handleFullScreenAction, isFullScreen, setContextMenu, setOpen, subtitle, setSubtitle}){
    
    const {map,url,data,loading,error,layers,settings,setSettings,createFeatureStyle,countSelectedFeatures,setCountSelectedFeatures} = useContext(MapaContext);
    const [showSubtitleContextMenu, setShowSubtitleContextMenu] = useState({status: false, position: 0});
    const [isModalOpen, setIsModalOpen] = useState({layerModal: false, addRepModal: false});
    const layersVisibles = layers.slice(2).reverse().filter(lyr=>{return lyr.status});
    const map1 = useRef(null);
    
    function showModal(modalName){
        setIsModalOpen((pv)=>{
            return {...pv, [modalName]: true}
        });
    }

    function disableModal(){
        setIsModalOpen({layerModal: false, addRepModal: false});
    };

    function changeSubtitleStatus(){
        const position = subtitle.position === 4 ? 0 : +subtitle.position + 1
        setSubtitle({status: position != 0, position});
    }

    function handleClickOutContextMenu(e){
        if(showSubtitleContextMenu){
            const contextMenu = document.getElementById('subtitle-contextmenu');
            const {target} = e;
            if(target !== contextMenu){
                setShowSubtitleContextMenu(false);
            }
        }
    }

    useEffect(()=>{
        if(!map) return
        map.setTarget('map');
        map1.current = map;
        
        return () => {  
            map1.current.setTarget(null);
        };
    },[url, map, data])


    useEffect(()=>{
        if(!map)return
            map.setTarget('map');
            map1.current = map;
            map.addEventListener('contextmenu', (e)=>{
                setShowSubtitleContextMenu(false);
                e.preventDefault();
                const pixel = e.pixel;
                const listLayers = [];

                map.forEachFeatureAtPixel(pixel, (feature, layer)=>{
                    const properties = feature.getProperties();
                    const layerProperties = layer.getProperties();
                    const layerName = layer.getClassName();

                    if(layerName !== 'countryLayer'){
                        listLayers.push({
                            properties,
                            layerProperties,
                            layer: layerName, 
                            rc: layer.values_.rc, 
                        });
                    }
                });

                const mapHTML = document.getElementById('map');
                const mapWidth = mapHTML.offsetWidth; 
                const mapHeight = mapHTML.offsetHeight; 

                const contextWidth = 150;
                const contextHeight = 200 + ((listLayers.length) * 25);
                const aditionalWidth = isFullScreen ? -50 : 0
                const aditonalHeight = isFullScreen ? -50 : 0

                let { pageX, pageY } = e.originalEvent

                pageX = (pageX + contextWidth) >= mapWidth ? mapWidth - contextWidth + aditionalWidth : pageX 
                pageY = (pageY + contextHeight) >= mapHeight ? mapHeight - contextHeight + aditonalHeight: pageY 
                
                map.forEachFeatureAtPixel(pixel, (feature, layer)=>{
                    if(layer.getClassName() !== 'countryLayer'){
                        setContextMenu({
                            pageX, 
                            pageY, 
                            pixel,
                            status:true, 
                            layers: listLayers, 
                            properties: listLayers[0].properties
                        })
                    }
                })
        });
    
        map.on('click', (e)=>{
            if(e.originalEvent.ctrlKey){
                setSettings(pv=>{return{...pv, interaction: false}});            
                map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
                    if(layer.className_ === "stateLayer"){
                        const featureProperties = feature.getProperties();
                        const styleConfig = featureProperties.stylesConfig || settings;
                        
                        feature.setProperties({SELECTED: !featureProperties.SELECTED});

                        if(feature.getProperties().SELECTED){
                            setCountSelectedFeatures(pv=>pv+1);
                            return feature.setStyle(createFeatureStyle(feature, {...styleConfig, zIndex: 100, fillColor: 'rgb(255,238,0)'}));
                        }
                        setCountSelectedFeatures(pv=>pv-1);
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
                            style={{transform: 'translateY(-50%)', transition: 'all .4s'}} 
                            className={`hover:cursor-pointer hover:bg-slate-400  rounded-r-lg 
                            hover:w-12 absolute left-0 top-50 h-28 p-2 flex justify-center items-center w-8
                            bg-slate-300 z-20 opacity-80`}
                        >
                            <SettingOutlined className='text-gray-900 text-lg font-black'/>
                        </div>

                        <div id='btns' className=' absolute z-50 top-1 left-1 flex flex-col gap-1'>
                            <button 
                                onClick={handleFullScreenAction} className={`flex justify-center items-center 
                                h-[30px] border-[1.5px]border-slate-100 outline-none rounded w-[30px]  
                                text-sm text-gray-800 bg-slate-100 z-50 hover:text-base`} 
                            >
                                {isFullScreen? <FullscreenExitOutlined/> : <FullscreenOutlined/> }
                            </button>
                            
                            <button 
                                onClick={()=>setSettings(pv=>{return {...pv, interaction: !settings.interaction}})} 
                                className={`flex justify-center items-center     h-[30px] 
                                border-[1.5px]rounded w-[30px] text-sm text-gray-800 z-50 hover:text-base outline-none 
                                ${settings.interaction ? 'bg-slate-200 border-slate-200' : 'bg-slate-100 border-slate-100 '}`} 
                            >
                                <SelectOutlined />
                            </button>

                            <button 
                                onClick={()=>{showModal('addRepModal')}} className={`flex 
                                justify-center items-center      h-[30px] border-[1.5px] border-slate-100 
                                rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base outline-none`} 
                            >
                                <UsergroupAddOutlined />
                            </button>

                            <button 
                                onClick={()=>{(layersVisibles.length > 0) && changeSubtitleStatus()}} 
                                className={`flex justify-center items-center     h-[30px] border-[1.5px]
                                border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 
                                hover:text-base ${layersVisibles.length === 0 && 'opacity-60 cursor-not-allowed'} 
                                outline-none`} 
                            >
                                <UnorderedListOutlined />
                            </button>
                                
                            <button 
                                onClick={()=>{countSelectedFeatures > 0 && showModal('layerModal')}} 
                                className={`flex justify-center items-center     h-[30px] border-[1.5px]
                                border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 
                                hover:text-base ${countSelectedFeatures <= 0 && 'opacity-60 cursor-not-allowed'} 
                                outline-none`} 
                            >
                                <PlusOutlined />
                            </button>
                        </div>

                        
                        
                        <AddRepModal isModalOpen={isModalOpen.addRepModal} disableModal={disableModal}/>
                        <LayerModal  isModalOpen={isModalOpen.layerModal} disableModal={disableModal}/>
                        
                        <Subtitle
                            showSubtitleContextMenu={showSubtitleContextMenu}
                            setShowSubtitleContextMenu={setShowSubtitleContextMenu}
                            subtitle={subtitle} setSubtitle={setSubtitle}
                            layersVisibles={layersVisibles}
                            setContextMenu={setContextMenu}
                        />
                        
                        <div id='map' onClick={handleClickOutContextMenu} className='bg-white absolute top-0 bottom-0 w-full h-full'/>
                    </>
                    }
                </>
          
                }
            </>
                    
  
  )
}




