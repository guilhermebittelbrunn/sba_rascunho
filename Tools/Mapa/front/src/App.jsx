import Map from "./components/Map"
import React, { useEffect } from 'react';
import { Input, Space, AutoComplete } from 'antd';
import { useState } from "react";
import { useGeographic } from 'ol/proj';
import ContextMenu from "./components/ContextMenu";
import InputDate from './components/InputDate';
import moment from "moment";
import Drawer from "./components/Drawer";
import MapaProvider from "./contexts/MapaContext";
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
    setUrl(value);
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
      <header>
        <form onSubmit={(e)=>{e.preventDefault()}} className="flex gap-4 justify-center items-center max-md:flex-col max-md:gap-1">
          <div className="flex flex-col"> 
            <h3 className="text-sm font-semibold">Data inicial</h3>
            <InputDate initialDate={moment().add(-1, 'y').format('DD/MM/YYYY')}/>
          </div>
          <div className="flex flex-col"> 
            <h3 className="text-sm font-semibold">Data final</h3>
            <InputDate initialDate={moment().format('DD/MM/YYYY')}/>
          </div>
          <div className="flex flex-col"> 
            <h3 className="text-sm font-semibold">Representante</h3>
            <Search size="middle" placeholder="Código representante" maxLength={4} minLength={4} allowClear={false} onSearch={onSearch} className="w-[240px] outline-none max-md:w-[440px]"/>
          </div>
        </form>
      </header>
      {url && 
      <>
        <MapaProvider url={url}>
           <main className="m-auto p-4" style={{width: '95%'}}> 
                  {/* <Map url={url} handleContext={handleContext} handleClick={handleClick} setGeometry={setGeometry} geometry={geometry} contextMenu={contextMenu} viewSettingsValues={viewSettingsValues} handleChangeCenterValue={handleChangeCenterValue}/> */}
                  
                  <div className={`w-full relative ${isFullScreen ? 'h-full' : 'h-[90vh]'}`}>
                    <Map isFullScreen={isFullScreen} setIsFullscreen={setIsFullscreen} setGeometry={setGeometry} handleContext={handleContext} handleClick={handleClick}/>
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
