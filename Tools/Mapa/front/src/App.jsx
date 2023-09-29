import { message } from 'antd';
import React, { useState }  from 'react';
import dayjs from "dayjs";
import { useGeographic } from 'ol/proj';
import Map from "./components/Map/Map"
import ContextMenu from "./components/Map/ContextMenu";
import Drawer from "./components/Drawer/Drawer";
import MapaProvider from "./contexts/MapaContext";
import Form from "./components/Form/Form";

export default function App() {

    useGeographic();

    const [url, setUrl] = useState('');
    const [contextMenu, setContextMenu] = useState({status: false, layerX: 0, layerY: 0, geometry: undefined}) ;
    const [isFullScreen ,setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false); 


    function onSearch(value){
        const {dateStart, dateEnd, rc} = value
        handleClick();
        setUrl({dateStart: dayjs(dateStart).format('YYYY-MM-DD'), dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'), rc});
    }

    async function handleFullScreenAction(){

        const main = document.getElementById('main_content');
  
        setIsFullscreen(pv=>!pv);
        if(isFullScreen){
          return document.exitFullscreen();
        }
        try{
          await main.requestFullscreen();
        }catch(err){
          message.error('navegador incompatível com essa função');
          console.log('err', err)
        }
        
    }

    function handleContext(e){
        e.preventDefault();
        setContextMenu((pv)=> {
            return {status: !pv.status, pageX: e.pageX, pageY: e.pageY}
        });
    }

    function handleClick(){
      if(contextMenu.status){
        // const contextMenuHTML = document.getElementById('contextMenu');
        // contextMenuHTML.style.display = 'none';
        setContextMenu((pv)=> {
            return {...pv, status: false, pageX: 0, pageY: 0}
        })
      }
    }

    return(
      <div>
        <Form onSearch={onSearch} isLoading={isLoading}/>
        {url && 
            <MapaProvider url={url} setIsLoading={setIsLoading}>
              <main id="main_content" className={`m-auto w-[95%] ${isFullScreen ? 'absolute top-0 p-0 left-0 w-screen h-screen' : 'p-4'}`}> 
                      
                      <div className={`w-full bg-red-300 relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>

                        <Map 
                          setOpen={setOpen} handleFullScreenAction={handleFullScreenAction} 
                          setContextMenu={setContextMenu} isFullScreen={isFullScreen}
                          handleContext={handleContext} handleClick={handleClick}
                        />
                        <Drawer open={open} setOpen={setOpen}/>
                        
                      </div>
              
                      <ContextMenu 
                        contextMenu={contextMenu} setContextMenu={setContextMenu} 
                        isFullScreen={isFullScreen} setContextMenu={setContextMenu}
                      />        
                  
              </main>
            </MapaProvider>
        }
      </div>
    )
}
