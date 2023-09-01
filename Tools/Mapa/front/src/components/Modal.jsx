import React, { useContext,useState } from 'react';
import {Radio} from 'antd'
import { Button, Modal as ModalAntd } from 'antd';
import { MapaContext } from '../contexts/MapaContext';
import {FilePdfOutlined}from '@ant-design/icons'

export default function Modal(){
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const {isModalOpen,setIsModalOpen} = useContext(MapaContext)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
        <Button type="primary" onClick={showModal}>
            Open Modal
        </Button>
        <ModalAntd title="Imprimir Mapa" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h3 className='font-semibold mt-2'>Paper Size</h3>
            <Radio2>
                <Card type='pdf' value={2} isChecked={value === 2} name="A2" setValue={setValue}/>
                <Card type='pdf' value={3} isChecked={value === 3} name="A3" setValue={setValue}/>
                <Card type='pdf' value={4} isChecked={value === 4} name="A4" setValue={setValue}/>
            </Radio2>
            <h3 className='font-semibold mt-2'>Print resolution</h3>
            <Radio2>
                <Card type='dpi' value={300} isChecked={value === 300} name="300" setValue={setValue}/>
                <Card type='dpi' value={600} isChecked={value === 600} name="600" setValue={setValue}/>
                <Card type='dpi' value={900} isChecked={value === 900} name="900" setValue={setValue}/>
            </Radio2>
        </ModalAntd>
        </>
    );
};


function Radio2({data}){
    const [value, setValue] = useState(1);
    
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    
    return(
        <section className="flex flex-col gap-2">
            
             <Radio.Group onChange={onChange} value={value} className='flex  flex-col gap-2'>
                {data.map(item=>{<Card type={item.type} value={item.value} isChecked={value === item.value} name=""/>})}
            </Radio.Group>
        </section>
    )
}


function Card({value, setValue, isChecked, name, type}){
   
    return(
            <div id={`div${value}`} className={`${isChecked ? 'border-blue-600 ' : 'border-gray-300 '}hover:cursor-pointer w-16 h-16 border-[1px] rounded-sm relative flex flex-col justify-center items-center`} onClick={()=>{setValue(value)}}>
                <Radio value={value} className='absolute top-1 right-[-4px]'/>
                <div id="body" className='flex flex-col items-center mt-2'>
                    {type === 'pdf' && <FilePdfOutlined className={`text-xl mt-2 ${isChecked ? 'text-blue-600' : 'text-slate-950'}`}/>}
                    <p className={`text-base ${isChecked ? 'text-blue-600' : 'text-slate-950'} ${type === 'dpi' && 'font-bold'}`}>{name}</p>
                </div>
            </div>

    )
}