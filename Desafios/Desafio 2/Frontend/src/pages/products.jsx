import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Collection',
    dataIndex: 'collection',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Products = () => {
  const isLog = useSelector((login)=>{
    return login
  });
  const [products, setProducts] = useState([]);

  async function findAllProducts(){
    const {data} = await axios.get(`http://localhost:3000/product/${isLog.user.id}`);
    const list = data.map((item, key)=>{
      return {...item, ['key']: key}
    })
    setProducts(list);
  }
  useEffect(()=>{
    isLog.status && findAllProducts();
  })
 
  return (
    <div>
        <Table columns={columns} dataSource={products} /> 
    </div>
  );
}
export default Products;