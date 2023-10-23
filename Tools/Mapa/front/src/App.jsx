import { message } from 'antd';
import React, { useEffect, useState }  from 'react';
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
    const [subtitle, setSubtitle] = useState({status: false, position: 0});

    function onSearch(value){
        const {dateStart, dateEnd, rc} = value;
        if(dateStart > dateEnd){
          return message.error('Data inicial maior que a data final')
        }
        handleClick();
        const randomValue = Math.random(0,1) * 100;
        setUrl({dateStart: dayjs(dateStart).format('YYYY-MM-DD'), dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'), rc: String(rc).padStart(4,0), randomValue});
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

    function handleClick(e){
        const contextMenuHTML = document.getElementById('contextMenu');
        
        if(contextMenuHTML && e?.target){
          const summary = document.getElementById('context-menu-details-summary');
          const isChildren = e.target.getAttribute('childrenofcontextmenu');
          if(e.target !== contextMenuHTML && e.target !== summary && isChildren !== 'true'){
            setContextMenu((pv)=> {
                return {...pv, status: false, pageX: 0, pageY: 0}
            })
          }
        }
    }

    useEffect(()=>{
      setSubtitle({status: false, position: 0});
    },[url])

    useEffect(()=>{

      const subtitleHTML = document.getElementById('subtitle');
      
      if(subtitleHTML){
        const { position } = subtitle
        const pos = [
          [],
          ['', '', '4px', '4px'],
          ['', '4px', '4px', ''],
          ['4px', '4px', '', ''],
          ['4px', '', '', '4px'],
        ];
        
        subtitleHTML.setAttribute('status', subtitle.position)
        subtitleHTML.style.top = `${pos[position][0]}`;
        subtitleHTML.style.right = `${pos[position][1]}`;
        subtitleHTML.style.bottom = `${pos[position][2]}`;
        subtitleHTML.style.left = `${pos[position][3]}`;
      }
    }, [subtitle])

    return(
      <div onClick={handleClick}>
        <Form onSearch={onSearch} isLoading={isLoading}/>
        {url && 
            <MapaProvider url={url} setUrl={setUrl} setIsLoading={setIsLoading}>
              <main id="main_content" className={`m-auto w-[95%] ${isFullScreen ? 'absolute top-0 p-0 left-0 w-screen h-screen' : 'p-4'}`}> 
                      
                  <div className={`w-full flex flex-col items-center justify-center relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>

                      <Map 
                        setOpen={setOpen} handleFullScreenAction={handleFullScreenAction} 
                        setContextMenu={setContextMenu} 
                        isFullScreen={isFullScreen} 
                        handleContext={handleContext} 
                        subtitle={subtitle} setSubtitle={setSubtitle}
                      />
                      <Drawer open={open} setOpen={setOpen}/>
                    
                  </div>
          
                  <ContextMenu 
                    contextMenu={contextMenu}
                    setContextMenu={setContextMenu} 
                    isFullScreen={isFullScreen}
                    subtitle={subtitle}
                    setSubtitle={setSubtitle}
                  />        
              </main>
            </MapaProvider>
        }
      </div>
    )
}
