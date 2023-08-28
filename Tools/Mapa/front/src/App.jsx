import Map from "./components/Map"
import React, { useEffect } from 'react';
import { Input, Space, AutoComplete, message } from 'antd';
import { useState } from "react";
import { useGeographic } from 'ol/proj';
import ContextMenu from "./components/ContextMenu";
import InputDate from './components/InputDate';
import dayjs from "dayjs";
import Drawer from "./components/Drawer";
import MapaProvider from "./contexts/MapaContext";
import FormProvider from "./contexts/FormContext";
import Form from "./components/Form";
const { Search } = Input;


const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              {query}
          
            </span>
       
          </div>
        ),
      };
    });


export default function App() {

  useGeographic();


  const [url, setUrl] = useState('');
  const [contextMenu, setContextMenu] = useState({status: false, layerX: 0, layerY: 0})
  const [geometry, setGeometry] = useState({});  
  const [viewSettingsValues, setViewSettingsValues] = useState({center: [-56,-14], zoom: 6, type: 'start'})
  const [options, setOptions] = useState([]);
  const [isFullScreen ,setIsFullscreen] = useState(false)
  
  
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };

  
  function handleChangeCenterValue(currentCenter, zoomLevel, type){
    // console.log('changed', currentCenter, zoomLevel)
    setViewSettingsValues(preventValue=>{
      return {center: currentCenter, zoom: zoomLevel, type}
    })
  }


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
        console.log('21')
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

  useEffect(()=>{
    setViewSettingsValues(preventValue=>{
          return {center: [-56,-14], zoom: 6, type: 'start'}
    })
  }, [url])

  return(
    <div>
      <FormProvider>
        <Form onSearch={onSearch}/>
      </FormProvider>
      {url && 
      <>
        <MapaProvider url={url}>
           <main id="main_content" className={`m-auto ${isFullScreen ? 'absolute top-0 p-0 left-0 w-screen h-screen' : 'p-4'}`} style={{width: '95%'}}> 
                  {/* <Map url={url} handleContext={handleContext} handleClick={handleClick} setGeometry={setGeometry} geometry={geometry} contextMenu={contextMenu} viewSettingsValues={viewSettingsValues} handleChangeCenterValue={handleChangeCenterValue}/> */}
                  
                  <div className={`w-full relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>
                  {/* <div className={`w-screen h-screen absolute left-0 top-0 z-50`}> */}
                    <Map handleFullScreenAction={handleFullScreenAction} isFullScreen={isFullScreen} setGeometry={setGeometry} handleContext={handleContext} handleClick={handleClick}/>
                    <Drawer/>
                  </div>
          
                  <ContextMenu geometry={geometry} contextMenu={contextMenu}/>        
               
            </main>
        </MapaProvider>
      </>
          
      }
    </div>
  )
}
