// import { Table, Space } from 'antd';
// import { useEffect, useState} from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';


// async function deleteItem(element){
//   const id = element.target.id;
//   try{
//     const {data} = await axios.delete(`http://localhost:3000/product/${id}`);
//   }catch(err){
//     return console.log(err);
//   }
// }

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
//   {
//      title: 'Action',
//     key: 'id',
//     render: (_, element) => (
//       <Space size="middle">
//         <a id={element.id}>Edit</a>
//         <a id={element.id} onClick={deleteItem}>Delete</a>
//       </Space>
//     ),
//   },
// ];


// export default function Products(){
//   const isLog = useSelector((login)=>{return login});
//   const [data, setdata] = useState([]);
  //  const [count, setCount] = useState(2);
  // const handleDelete = (key) => {
  //   const newData = dataSource.filter((item) => item.key !== key);
  //   setDataSource(newData);
  // };

//   async function findAlldata(){
//     const {data} = await axios.get(`http://localhost:3000/product/${isLog.user.id}`);
//     const list = data.map((item, key)=>{
//       return {...item, ['key']: key}
//     })
//     setdata(list);
//   }
//   useEffect(()=>{
//     isLog.status && findAlldata();
//   },[data]);

//   return(
//     <Table columns={columns} dataSource={data} />
//   )
// }
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const App = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default App;