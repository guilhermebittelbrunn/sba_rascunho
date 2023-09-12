import { useEffect, useRef, useContext } from 'react';
import { Spin } from 'antd';
import {Style,Stroke, Text, Fill} from 'ol/style'
import { useGeographic } from 'ol/proj';
import {SettingOutlined,SelectOutlined, FullscreenExitOutlined,PlusOutlined,FullscreenOutlined} from '@ant-design/icons';
import { MapaContext } from '../../contexts/MapaContext';
import ErrorModal from './ErrorModal';

export default function MapPage({handleClick, handleFullScreenAction, handleContext, isFullScreen, setContextMenu}){

    useGeographic();
    
    const { map, loading, setOpen, error, setFeaturesSelected, addLayer,featuresSelected,settings, setSettings, subtitleCategory, setStyle
        // setInteraction, fontSize, subTitle
    } = useContext(MapaContext)
    const {interaction, fontSize, subTitle} = settings


    const map1 = useRef(null);

    useEffect(()=>{
        if(!map) return
        map.setTarget('map');
        map1.current = map;


        return () => {  
                map1.current.setTarget(null);
        };
    })

    // useEffect(()=>{
    //     if(!map) return
    //     // map.addEventListener('click', (e)=>{
    //     //     if(e.originalEvent.ctrlKey){
    //     //         map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
    //     //             // console.log(feature.getProperties());
    //     //             // console.log(featuresSelected);
    //     //             if(feature.getProperties().CD_MUN){
                     
                        
    //     //                 const index = featuresSelected.indexOf(fs=>{
                        
    //     //                     return fs.getProperties().CD_MUN === feature.getProperties().CD_MUN
    //     //                 })
    //     //                 console.log(index);
    //     //                 if(index === -1){
    //     //                     const style = setStyle(feature, {...settings, fillColor: 'rgb(255, 238, 0)'});
    //     //                     feature.setStyle(style);
    //     //                     setFeaturesSelected(pv=>{
    //     //                         return [...pv, feature.getProperties()];
    //     //                     })
    //     //                 }
    //     //                 // const style = new Style({
    //     //                 //     fill: new Fill({
    //     //                 //         color: "rgb(255, 238, 0)"
    //     //                 //     }),
    //     //                 //     stroke: new Stroke({
    //     //                 //         color: "rgba(30,30,30)",
    //     //                 //         width: 1,
    //     //                 //     }),
    //     //                 //     text: new Text({
    //     //                 //         text: subTitle === '' ? feature.getProperties().NM_MUN : 
    //     //                 //         (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
    //     //                 //         feature.getProperties().NM_MUN),  
    //     //                 //         font: `bold ${fontSize + .5}px ${"Segoe UI"}`,
    //     //                 //         fill: new Fill({
    //     //                 //             color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 0, 0)' : 'rgb(0,0,0)'
    //     //                 //         }),
    //     //                 //     }),
    //     //                 // })
                    
                        
    //     //             }
    //     //         })
    //     //     }
    //     // });
    //     map.on('click', (e)=>{
    //         if(e.originalEvent.ctrlKey){
    //             map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
    //                 // console.log(feature.getProperties());
    //                 // console.log(featuresSelected);
    //                 if(feature.getProperties().CD_MUN){
                     
    //                     console.log(',',featuresSelected)
    //                     const index = featuresSelected.findIndex(fs=>{
    //                         return fs.CD_MUN === feature.getProperties().CD_MUN;
                        
    //                         // console.log({ok:true});
    //                         // return fs.getProperties().CD_MUN === feature.getProperties().CD_MUN
    //                     })

    //                     // console.log(featuresSelected);
    //                     console.log(index);


    //                     if(index === -1){
    //                         const style = setStyle(feature, {...settings, fillColor: 'rgb(255, 238, 0)'});
    //                         feature.setStyle(style);
    //                         setFeaturesSelected(pv=>{
    //                             return [...pv, feature.getProperties()];
    //                         })
    //                     }
    //                     // const style = new Style({
    //                     //     fill: new Fill({
    //                     //         color: "rgb(255, 238, 0)"
    //                     //     }),
    //                     //     stroke: new Stroke({
    //                     //         color: "rgba(30,30,30)",
    //                     //         width: 1,
    //                     //     }),
    //                     //     text: new Text({
    //                     //         text: subTitle === '' ? feature.getProperties().NM_MUN : 
    //                     //         (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
    //                     //         feature.getProperties().NM_MUN),  
    //                     //         font: `bold ${fontSize + .5}px ${"Segoe UI"}`,
    //                     //         fill: new Fill({
    //                     //             color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 0, 0)' : 'rgb(0,0,0)'
    //                     //         }),
    //                     //     }),
    //                     // })
                    
                        
    //                 }
    //             })
    //         }
    //     });
        
    // },[map, featuresSelected])

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
                        feature.setProperties({SELECTED: !feature.getProperties().SELECTED})
                        // console.log(feature.setProperties({SELECTED: true}));
                        // addFeatureSelected(feature.getProperties());
                        console.log(feature.getProperties());
                        setFeaturesSelected(pv=>[...pv, feature]);
                        // const index = featuresSelected.findIndex(fs=>{
                        //     return fs.CD_MUN === feature.getProperties().CD_MUN;
                        
                        //     // console.log({ok:true});
                        //     // return fs.getProperties().CD_MUN === feature.getProperties().CD_MUN
                        // })
 
                        // console.log(featuresSelected);
            

                        // if(index === -1){
                        //     const style = setStyle(feature, {...settings, fillColor: 'rgb(255, 238, 0)'});
                        //     feature.setStyle(style);
                        //     setFeaturesSelected(pv=>{
                        //         return [...pv, feature.getProperties()];
                        //     });
                        // }
                        // const style = new Style({
                        //     fill: new Fill({
                        //         color: "rgb(255, 238, 0)"
                        //     }),
                        //     stroke: new Stroke({
                        //         color: "rgba(30,30,30)",
                        //         width: 1,
                        //     }),
                        //     text: new Text({
                        //         text: subTitle === '' ? feature.getProperties().NM_MUN : 
                        //         (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
                        //         feature.getProperties().NM_MUN),  
                        //         font: `bold ${fontSize + .5}px ${"Segoe UI"}`,
                        //         fill: new Fill({
                        //             color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 0, 0)' : 'rgb(0,0,0)'
                        //         }),
                        //     }),
                        // })
                    
                        
                    }
                })
            }
        });
     
        
    },[map])

    // useEffect(()=>{
    //     if(!map)return
    //     map.on('click', ()=>{
    //         console.log('click event', settings.fontSize);
    //     })
    // }, [settings]);


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
                        
                        <button onClick={()=>setSettings(pv=>{return {...pv, interaction: !interaction}})} id='btn_interaction' className='absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px] border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base'style={{transform: 'translate(20%, 150%)', transition: 'all .4s'}}>
                            <SelectOutlined />
                        </button>

                        <button onClick={addLayer} id='btn_interaction' className='absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px] border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base'style={{transform: 'translate(20%, 275%)', transition: 'all .4s'}}>
                            <PlusOutlined />
                        </button>
                                              
                        <div id='map'  onMouseDown={handleClick} className='bg-white absolute top-0 bottom-0 w-full h-full'/> 
                    </>
                    }
                </>
          
                }
            </>
                    
  
  )
}




