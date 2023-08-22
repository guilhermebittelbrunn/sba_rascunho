import { Button, Select, theme, Slider, Switch, InputNumber, Checkbox } from 'antd';
import { useState, useEffect } from 'react';

const optionsSelect = [
        {
          value: '',
          label: 'Sem categoria',
        },
        {
          value: 'ULTIMA_VENDA',
          label: 'Por data',
        },
        {
          value: 'QUANTIDADE_VENDAS',
          label: 'N° vendas',
        },
        {
          value: 'QUANTIDADE_CLIENTES_CIDADE',
          label: 'N° clientes',
        },
      ]


export default function Drawer({open, setSelectedOption, selectedOption, baseLayerEnable, setBaseLayerEnable, setFontSize, fontSize}){
    
    

    const [inputValue, setInputValue] = useState(fontSize);

    return(
        
        <>
            <Drawer
                            title="Opções"
                            placement="left"
                            closable={true}
                            onClose={()=>{setOpen(false);}}
                            open={open}
                            getContainer={false}
                
                        >
                            <div className='w-full flex flex-col gap-4 justify-center'>
                                    <Checkbox  onClick={(e)=>{setBaseLayerEnable(e.target.checked)}} checked={baseLayerEnable}>Enable base layer</Checkbox>
                                    <div className='flex flex-col'>
                                        <label className='font-bold text-base' htmlFor='category'>Layer category</label>
                                        <Select defaultActiveFirstOption={true} name='category' options={optionsSelect} defaultValue="Sem categoria" className='w-[160px]' onChange={(value)=>{setSelectedOption(value)}}/>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div>
                                            <label className='font-bold text-base' htmlFor='category'>Font-Size</label>
                                            <InputNumber
                                            min={4}
                                            max={36}
                                            style={{
                                                marginLeft: '0px',padding: '0'
                                            }}
                                            bordered={false}
                                            value={inputValue}
                                            onChange={()=>{setFontSize(value); setInputValue(value)}}
                                            />
                                        </div>
                                        <Slider min={4} max={36} defaultValue={fontSize} onChange={(value)=>{setFontSize(value); setInputValue(value)}}/>
                                    </div>

                            </div>

            </Drawer>   
        </>
    )    
}