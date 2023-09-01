import Map from "./components/Map"
import React from 'react';
import { message } from 'antd';
import { useState } from "react";
import { useGeographic } from 'ol/proj';
import ContextMenu from "./components/ContextMenu";
import dayjs from "dayjs";
import Drawer from "./components/Drawer";
import MapaProvider from "./contexts/MapaContext";
import FormProvider from "./contexts/FormContext";
import Form from "./components/Form";
import Modal from "./components/Modal";

export default function App() {

    useGeographic();

    const [url, setUrl] = useState('');
    const [contextMenu, setContextMenu] = useState({status: false, layerX: 0, layerY: 0})
    const [geometry, setGeometry] = useState({});  
    const [isFullScreen ,setIsFullscreen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    function onSearch(value){
        const {dateStart, dateEnd, rc} = value
        console.log({dateStart: dayjs(dateStart).format('YYYY-MM-DD'), dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'), rc});
        setUrl({dateStart: dayjs(dateStart).format('YYYY-MM-DD'), dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'), rc});
    }

    async function handleFullScreenAction(){
        const main = document.getElementById('main_content');
        setIsFullscreen(pv=>!pv);
        if(!isFullScreen){
          try{
            // main.requestFullscreen().then(res=>{console.log(res, 'teste')})
            await main.requestFullscreen();
          }catch(err){
            message.error('navegador incompatível com essa função');
            console.log('err', err)
          }finally{
            return
          }
        }
        document.exitFullscreen();
      
      // fullscreenEnabled() && main.exitFullscreen();
              // console.log(mapDiv)
              // map.addEventListener('click', async()=>{
              //     try{
              //         const res = await mapDiv.requestFullscreen();
              //         console.log(res);
              //     }catch(err){
              //         console.log('err fullscreen', err);
              //     }
              // })
    }

    function handleContext(e){
        e.preventDefault();
        setContextMenu((preventValue)=> {
            return {status: !preventValue.status, pageX: e.pageX, pageY: e.pageY}
        })
    }

    function handleClick(e){
      contextMenu.status &&
      setContextMenu((preventValue)=> {
          return {...preventValue,status: false}
      })
    }

    return(
      <div>
        <FormProvider>
          <Form onSearch={onSearch} isLoading={isLoading}/>
        </FormProvider>
        {url && 
        <>
          <MapaProvider url={url} setIsLoading={setIsLoading}>
            <main id="main_content" className={`m-auto ${isFullScreen ? 'absolute top-0 p-0 left-0 w-screen h-screen' : 'p-4'}`} style={{width: '95%'}}> 
                    {/* <Map url={url} handleContext={handleContext} handleClick={handleClick} setGeometry={setGeometry} geometry={geometry} contextMenu={contextMenu} viewSettingsValues={viewSettingsValues} handleChangeCenterValue={handleChangeCenterValue}/> */}
                    
                    <div className={`w-full relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>
                    {/* <div className={`w-screen h-screen absolute left-0 top-0 z-50`}> */}
                      <Map handleFullScreenAction={handleFullScreenAction} isFullScreen={isFullScreen} setGeometry={setGeometry} handleContext={handleContext} handleClick={handleClick}/>
                      <Drawer/>
                    </div>
            
                    <ContextMenu geometry={geometry} contextMenu={contextMenu}/>        
                
              </main>
              <Modal/>
          </MapaProvider>
        </> 
        }
      </div>
    )
}
