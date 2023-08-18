import Map from "./components/Map"
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space } from 'antd';
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import ContextMenu from "./components/ContextMenu";
const { Search } = Input;

export default function App() {
  const [url, setUrl] = useState('');
    const [contextMenu, setContextMenu] = useState({status: false, layerX: 0, layerY: 0, json: {}})
  
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
    setContextMenu((preventValue)=> {
        return {...preventValue,status: false}
    })
  }

  return(
    <div>
      <header>
        <Search
            placeholder="Código representante"
            maxLength={4}
            minLength={4}
            allowClear
            onSearch={onSearch}
            style={{
              width: 240,
            }}
          />
      </header>
      <main className="m-4 p-4">
        {url && <Map url={url} handleContext={handleContext} handleClick={handleClick}/>}
         <ContextMenu props={contextMenu}/>
      </main>
    </div>
  )
}
