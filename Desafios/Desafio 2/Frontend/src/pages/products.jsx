// // import { Table } from 'antd';
// import { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';
// import axios from 'axios';

// import { Table } from 'antd';
// const columns = [
//   {
//     title: 'Title',
//     dataIndex: 'title',
//     width: '30%',
//   },
//   {
//     title: 'Description',
//     dataIndex: 'description',
//   },
//   {
//     title: 'Collection',
//     dataIndex: 'collection',
//     filters: [
//       {
//         text: '1A',
//         value: '1A',
//       },
//       {
//         text: '1B',
//         value: '1B',
//       },
//       {
//         text: '2A',
//         value: '2A',
//       },
//       {
//         text: '2B',
//         value: '2B',
//       },
//       {
//         text: '3A',
//         value: '3A',
//       },
//       {
//         text: '3B',
//         value: '3B',
//       },
//     ],
//     onFilter: (value, record) => record.collection.startsWith(value),
//     width: '40%',
//   },
// ];


// export default function Products(){
//   const isLog = useSelector((login)=>{return login});
//   const [data, setdata] = useState([]);

//   async function findAlldata(){
//     const {data} = await axios.get(`http://localhost:3000/product/${isLog.user.id}`);
//     const list = data.map((item, key)=>{
//       return {...item, ['key']: key}
//     })
//     setdata(list);
//   }
//   useEffect(()=>{
//     isLog.status && findAlldata();
//   },[]);

//   return(
//     <Table columns={columns} dataSource={data} />
//   )
// }

import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow',
          },
          {
            text: 'Pink',
            value: 'Pink',
          },
        ],
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const App = () => <Table columns={columns} dataSource={data} onChange={onChange} />;
export default App;