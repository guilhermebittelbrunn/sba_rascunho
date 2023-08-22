import Map from "./components/Map"
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space, AutoComplete } from 'antd';
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import ContextMenu from "./components/ContextMenu";
import InputDate from './components/InputDate';
import moment from "moment";
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
  const [url, setUrl] = useState('');
  const [contextMenu, setContextMenu] = useState({status: false, layerX: 0, layerY: 0})
  const [geometry, setGeometry] = useState({});  
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };


  
  function onSearch(value){
    setUrl(value);
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
      <header>
        <form className="flex gap-4 justify-center items-center max-md:flex-col max-md:gap-1">
          {/* <AutoComplete
            popupMatchSelectWidth={252}
            style={{
              width: 300,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input.Search size="large" placeholder="input here" enterButton />
          </AutoComplete> */}
          <div className="flex flex-col"> 
            <label className="font-semibold" htmlFor="date_init">Data inicial</label>
            <InputDate name='date_init' initialDate={moment().add(-1, 'y').format('DD/MM/YYYY')}/>
          </div>
          <div className="flex flex-col"> 
            <label className="font-semibold" htmlFor="date_end">Data final</label>
            <InputDate name="date_end" initialDate={moment().format('DD/MM/YYYY')}/>
          </div>
          <div className="flex flex-col"> 
            <label className="font-semibold" htmlFor="rc">Representante</label>
            <Search name="rc" placeholder="Código representante" maxLength={4} minLength={4} allowClear={false} onSearch={onSearch} className="w-[240px] outline-none max-md:w-[440px]"/>
          </div>
        </form>
      </header>
      <main className="m-auto p-4" style={{width: '95%'}}>
        {url && <Map url={url} handleContext={handleContext} handleClick={handleClick} setGeometry={setGeometry} geometry={geometry} contextMenu={contextMenu}/>}
         <ContextMenu geometry={geometry} contextMenu={contextMenu}/>
      </main>
    </div>
  )
}
