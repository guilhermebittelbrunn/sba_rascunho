import Map from "./components/Map"
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space } from 'antd';
import { useState } from "react";
const { Search } = Input;

export default function App() {
  const [url, setUrl] = useState('');
  
  function onSearch(value){
    setUrl(value);
  }

  return(
    <>
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
      <main>
        <Map/>
      </main>
    </>
  )
}


