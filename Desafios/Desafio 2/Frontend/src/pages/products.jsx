import {Table } from 'antd';
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
 
  return (
    <div>
        <Table columns={columns} dataSource={data} /> 
    </div>
  );
};
export default Products;