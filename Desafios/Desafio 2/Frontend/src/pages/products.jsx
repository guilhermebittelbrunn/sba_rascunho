// import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

import { Table } from 'antd';
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: '30%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Collection',
    dataIndex: 'collection',
    filters: [
      {
        text: '1A',
        value: '1A',
      },
      {
        text: '1B',
        value: '1B',
      },
      {
        text: '2A',
        value: '2A',
      },
      {
        text: '2B',
        value: '2B',
      },
      {
        text: '3A',
        value: '3A',
      },
      {
        text: '3B',
        value: '3B',
      },
    ],
    onFilter: (value, record) => record.collection.startsWith(value),
    width: '40%',
  },
];


export default function Products(){
  const isLog = useSelector((login)=>{return login});
  const [data, setdata] = useState([]);

  async function findAlldata(){
    const {data} = await axios.get(`http://localhost:3000/product/${isLog.user.id}`);
    const list = data.map((item, key)=>{
      return {...item, ['key']: key}
    })
    setdata(list);
  }
  useEffect(()=>{
    isLog.status && findAlldata();
  },[]);

  return(
    <Table columns={columns} dataSource={data} />
  )
}
