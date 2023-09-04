import {useContext,useEffect,useState } from 'react';
import { Button, Modal as ModalAntd, Radio } from 'antd';
import {FilePdfOutlined} from '@ant-design/icons'


export default function RadioInput({dataset, defaultValue, field, cardStyle}){
    const [value, setValue] = useState(defaultValue || dataset[0].item.name);
    
    useEffect(()=>{
        field.onChange(value)
    },[value])

    
    return(
        <section className="flex flex-col gap-2">    
             <Radio.Group value={value} className='flex mt-2 gap-2'>
                {dataset.map(item=>{return <Card {...item} key={item.name} cardStyle={cardStyle} field={field} value={item.name} isChecked={value === item.key} setValue={setValue}/>})}
            </Radio.Group>
        </section>
    )
}


function Card({value, setValue, isChecked, name, type, cardStyle}){
   
    return(
            <div id={`div${value}`} className={`${cardStyle} ${isChecked ? 'border-blue-600 ' : 'border-gray-300 '}`} onClick={()=>{setValue(value)}}>
                <Radio value={value} className='absolute top-1 right-[-4px]'/>
                <div id="body" className='flex flex-col items-center mt-2'>
                    {type === 'pdf' && <FilePdfOutlined className={`text-xl mt-2 ${isChecked ? 'text-blue-600' : 'text-slate-950'}`}/>}
                    <p className={`text-base ${isChecked ? 'text-blue-600' : 'text-slate-950'} ${type === 'dpi' && 'font-bold'}`}>{name}</p>
                </div>
            </div>
    )
}

