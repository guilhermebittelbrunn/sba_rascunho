import { Button, Select, theme, Slider, Switch, InputNumber, Checkbox, Drawer as DrawerAntd, Input } from 'antd';
import { useState, useEffect } from 'react';
const {Search} = Input


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

const optionsSubtitle = [
    {
      value: '',
      label: 'Sem subtítulo'
    },
    {
      label: 'Geral',
      options: [
          {
            value: 'AREA_KM2',
            label: 'Área cidade'
          },
          {
            value: 'SIGLA_UF',
            label: 'Sigla estado'
          },
          {
            value: 'QUANTIDADE_CLIENTES_CIDADE',
            label: 'N° clientes atendidos'
          },
          {
            value: 'QUANTIDADE_VENDAS',
            label: 'N° pedidos'
          },
          {
            value: 'CD_MUN',
            label: 'Código cidade'
          },
      ]
    },
    {
      label: 'Referente a última venda',
      options:[
          {
            value: 'CODIGO_CLIENTE',
            label: 'Código do cliente'
          },
          {
            value: 'NOME_CLIENTE',
            label: 'Nome do cliente'
          },
          {
            value: 'NUMERO_PEDIDO',
            label: 'Número do pedido'
          },
          {
            value: 'ULTIMA_VENDA',
            label: 'Data do último pedido'
          },
      ]
    }
]

export default function Drawer({open, setOpen,setSelectedOption, selectedOption, baseLayerEnable, setBaseLayerEnable, setFontSize, fontSize, setSearchCityValue, setSubTitle, setCountryLayerEnable, countryLayerEnable}){


    const [inputValue, setInputValue] = useState(fontSize);

    return(
        
        <>
            <DrawerAntd
                            title="Opções"
                            placement="left"
                            closable={true}
                            width={300}
                            onClose={()=>{setOpen(false);}}
                            open={open}
                            getContainer={false}
                
                        >
                          <div className='flex flex-col h-full justify-between'>
                            <div className='w-full flex flex-col gap-4 justify-center'>
                                    <div className='flex flex-col'>
                                      <label className='font-bold text-sm'>Search City</label>
                                      <Search
                                        placeholder="Nome do município"
                                        onSearch={(value)=>{setSearchCityValue(value)}}
                                        style={{
                                          width: 250,
                                        }}
                                      />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-bold text-sm' htmlFor='category'>Category layer</label>
                                        {/* <select name="" id="" className='border-[1px] w-44 rounded-lg border-gray-300 px-2 py-1 outline-none'>
                                          <option value="''" className='hover:bg-gray-300'>Sem categoria</option>
                                          <option value="ULTIMA_VENDA">Por data</option>
                                          <option value="QUANTIDADE_VENDAS">N° vendas</option>
                                          <option value="QUANTIDADE_CLIENTES_CIDADE">N° de clientes</option>
                                        </select> */}
                                        <Select dropdownStyle={{ zIndex: 2000 }} defaultActiveFirstOption={true} name='category' options={optionsSelect} defaultValue="Sem categoria" className='w-[250px]' onChange={(value)=>{setSelectedOption(value)}}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-bold text-sm' htmlFor='category'>Category subtitle</label>
                                        <Select dropdownStyle={{ zIndex: 2000 }} defaultActiveFirstOption={true} name='category' options={optionsSubtitle} defaultValue="Sem subtítulo" className='w-[250px]' onChange={(value)=>{setSubTitle(value)}}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <div>
                                            <label className='font-bold text-sm' htmlFor='category'>Font-Size</label>
                                            <InputNumber
                                            min={6}
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

                                    
                                    <div>
                                      <Checkbox  onClick={(e)=>{setBaseLayerEnable(e.target.checked)}} checked={baseLayerEnable}>Enable base layer</Checkbox>
                                    </div>
                                    <div>
                                      <Checkbox  onClick={(e)=>{setCountryLayerEnable(e.target.checked)}} checked={countryLayerEnable}>Enable country layer</Checkbox>
                                    </div>

                            </div>
                            <div id='bts' className='w-full flex flex-col gap-2'>
                                <Button>Imprimir</Button>
                                <Button>Relatório</Button>
                            </div>               
                          </div>
            </DrawerAntd>   
        </>
    )    
}