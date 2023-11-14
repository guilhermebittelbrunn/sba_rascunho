import { BrowserRouter } from "react-router-dom"
import { ConfigProvider, Spin, Form, message, Input, Modal, InputNumber, Tabs, Popconfirm, Table, Typography, Checkbox, Button  } from "antd"
import pt_BR from 'antd/locale/pt_BR'
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import api from "./api"
import {useForm, Controller} from 'react-hook-form'

const Brands = {
  "0": {
    label:'sba',
    value: 0
  },
  "1": {
    label:'alvha',
    value: 1
  },
  "2": {
    label: 'yellowl',
    value: '2'
  },

}

const options = [
  {
    label:'sba',
    value: 0
  },
  {
    label:'alvha',
    value: 1
  },
  {
    label: 'yellowl',
    value: 2
  },
]

function EditableCell({ editing, dataIndex, title, inputType, record, index, children, ...restProps}){
  const inputNode = dataIndex === 'name' ? <Input /> : <Checkbox.Group options={options}/>;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{margin: 0}}
          rules={[{
              required: true,
              message: `Please Input ${title}!`,
          }]}
        >
          {inputNode}
        </Form.Item>
        ) 
        : 
        children
      }
    </td>
  );
};

function Page1(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const {handleSubmit, control} = useForm();
    const isEditing = (record) => record.key === editingKey;


    async function handleSearchRC(){
      try {
          setLoading(true);
          const res = await api.get('/all');
          setData(res.data.map((brand, key)=>{return {...brand, key}}));
        } catch (error) {
          console.log(error);
          message.error('erro');
        }
        finally{
          setLoading(false);
        }
    }

    async function save(key){
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
  };

  function add(){
    const newData = {key: `${data.length}${Math.random(0,1000)}`,name:'',brands: []}
    setData(pv=>{
      return [newData, ...pv];
    });
    edit(newData);
  }

  function onFinish(){
    console.log(data);
  }

  function edit(record){
      form.setFieldsValue({
        name: '',
        age: '',
        address: '',
        ...record,
      });
      setEditingKey(record.key);
    };

  function cancel(record){
    record.name && setEditingKey('');
  };

  function remove(record){
    const newData = data.filter(element => element !== record);
    setData(newData);
  }
    

     const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          editable: true,
        },
        {
          title: 'brands',
          dataIndex: 'brands',
          editable: true,
          render: (record)=>{
            return record.map((brand, k)=>{
              return <span key={`${brand}${k}`}> {Brands[brand].label}</span>
            })
          }
        },
        {
          title: '',
          dataIndex: 'operation',
          width: '20%',
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{marginRight: 8}}
                >
                  Save
                </Typography.Link>
                
                <Popconfirm title="Sure to cancel?" onConfirm={()=>{cancel(record)}}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <span>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
                <Typography.Link disabled={editingKey !== ''} onClick={() => remove(record)} style={{marginLeft: '8px'}}>
                  Delete
                </Typography.Link>
              </span>
            );
          },
        },
      ];

    const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


    return (
      <>
       <div style={{display:"flex"}}>
          <Input placeholder="representante"/>
          <button onClick={handleSearchRC}>🔎</button>
       </div>
       {/* <button onClick={add}>➕</button> */}
        <Form form={form} onFinish={onFinish}>
          <br />
          <Table
            components={{body: {cell: EditableCell}}}
            bordered
            loading={loading}
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
          />
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit">Gravar</Button>
          </Form.Item>
        </Form>
      </>
    );

  
}

function Page2(){
  const {handleSubmit, reset, control} = useForm({});
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState({});
  
  function edit(record){
    setValue(record);
    setOpen(true);
  }

  function remove(record){
    const newData = data.filter(element => element!== record);
    setData(newData);
  }

  async function handleSearchRC(){
    try {
        setLoading(true);
        const res = await api.get('/all');
        setData(res.data.map((brand, key)=>{return {...brand, key}}));
      } catch (error) {
        console.log(error);
        message.error('erro');
      }
      finally{
        setLoading(false);
      }
  }

  async function handleOk(data){
    setValue({});
    setOpen(false);
  }

  function handleClose(){
    setOpen(false);
    setValue('');
  }

  useEffect(()=>{
    reset(value);
  }, [value])


  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'brands',
      dataIndex: 'brands',
      render: (record)=>{
        return record.map((brand, k)=>{
          return <span key={`${brand}${k}`}> {Brands[brand].label}</span>
        })
      }
    },
     {
          title: '',
          dataIndex: 'operation',
          width: '20%',
          render: (_, record) => {
              return (
                <span>
                  <Typography.Link onClick={() => edit(record)}>
                    Edit
                  </Typography.Link>
                  <Typography.Link onClick={() => remove(record)} style={{marginLeft: '8px'}}>
                    Delete
                  </Typography.Link>
                </span>
              )
          },
        },
  ]

  return (
    <>
      <main>
        <div style={{display: 'flex'}}>
          <Input type="text" placeholder="representante"/>
          <Button type="primary" onClick={handleSearchRC}>🔎</Button>
          <Button onClick={()=>{setValue(''); setOpen(true)}}>➕</Button>
        </div>
        <Table columns={columns} dataSource={data} loading={loading}/>
        
        <Modal open={isOpen} onCancel={handleClose}>
          <form onSubmit={handleSubmit(handleOk)}>
            <Controller 
              name="name" control={control} defaultValue={value.name} render={({field})=>{
              return <Input type="text" value={field.value} onChange={(v)=>{field.onChange(v)}}/>
              }}
            />

            <Controller 
              name="brands" control={control} defaultValue={value.brands} render={({field})=>{
              return <Checkbox.Group options={options} onChange={(v)=>{field.onChange(v)}}/>
              }}
            />
            <Button type="primary" htmlType="submit">Adicionar</Button>
          </form>
        </Modal>

        <Button type="primary" htmlType="submit"/>
      </main>
    </>
  )
}



const Items = [
  {
    label: 'editTable',
    key: '1',
    children: <Page1/>
  },
  {
    label: 'modal',
    key: '2',
    children: <Page2/>
  },
]


export default function App() {
  

  // const onChange = (key: string) => {
  //   console.log(key);
  // };

  return (
      <BrowserRouter>
        <ConfigProvider locale={pt_BR}>
          <main>
           <Tabs
              type="card"
              items={Items}
            />
          </main>
        </ConfigProvider>   
      </BrowserRouter>
  )
}


