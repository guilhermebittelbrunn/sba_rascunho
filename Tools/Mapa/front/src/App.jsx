import Map from "./components/Map/Map"
import React, { useState }  from 'react';
import { message } from 'antd';
import { useGeographic } from 'ol/proj';
import ContextMenu from "./components/Map/ContextMenu";
import dayjs from "dayjs";
import Drawer from "./components/Drawer/Drawer";
import MapaProvider from "./contexts/MapaContext";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";

export default function App() {

    useGeographic();

    const [url, setUrl] = useState('');
    const [contextMenu, setContextMenu] = useState({status: false, layerX: 0, layerY: 0, geometry: undefined}) 
    const [isFullScreen ,setIsFullscreen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    function onSearch(value){
        const {dateStart, dateEnd, rc} = value
        setUrl({dateStart: dayjs(dateStart).format('YYYY-MM-DD'), dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'), rc});
    }

    async function handleFullScreenAction(){
        const main = document.getElementById('main_content');
        setIsFullscreen(pv=>!pv);
        if(!isFullScreen){
          try{
            await main.requestFullscreen();
          }catch(err){
            message.error('navegador incompatível com essa função');
            console.log('err', err)
          }finally{
            return
          }
        }
        document.exitFullscreen();
    }

    function handleContext(e){
        e.preventDefault();
        setContextMenu((preventValue)=> {
            return {status: !preventValue.status, pageX: e.pageX, pageY: e.pageY}
        });
    }

    function handleClick(e){
      contextMenu.status &&
      setContextMenu((preventValue)=> {
          return {...preventValue,status: false}
      })
    }

    return(
      <div>
        <Form onSearch={onSearch} isLoading={isLoading}/>
        {url && 
        <>
          <MapaProvider url={url} setIsLoading={setIsLoading}>
            <main id="main_content" className={`m-auto ${isFullScreen ? 'absolute top-0 p-0 left-0 w-screen h-screen' : 'p-4'}`} style={{width: '95%'}}> 
                    
                    <div className={`w-full relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>
                      <Map handleFullScreenAction={handleFullScreenAction} setContextMenu={setContextMenu} isFullScreen={isFullScreen} handleContext={handleContext} handleClick={handleClick}/>
                      <Drawer/>
                    </div>
            
                    <ContextMenu contextMenu={contextMenu}/>        
                
            </main>
            <Modal/>
          </MapaProvider>
        </> 
        }
      </div>
    )
}
