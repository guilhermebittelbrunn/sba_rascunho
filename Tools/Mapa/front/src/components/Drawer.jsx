import { Button, Select, theme, Slider, Switch, InputNumber, Checkbox, Drawer as DrawerAntd, Input, message } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { MapaContext } from '../contexts/MapaContext';
import { Stroke, Style, Text, Fill } from 'ol/style';
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

function colorCategory(label, option){
        if(!label[option]){
            return 'rgba(221,221,223,0.7)'
        }
        const tailwindColors = {
            0: 'rgba(221,221,223,0.8)',
            1: 'rgb(240,253,244)',
            2: 'rgb(187,247,208)',
            3: 'rgb(74,222,128)',
            4: 'rgb(22,163,74)',
            5: 'rgb(22,101,52)',
        }
        let x;
        switch (option){
            case 'QUANTIDADE_VENDAS':
                x = label[option] / 2
                x = x > 5 ? 5 : x
                x = x > 0 && x < 1 ? 1 : x
                x = tailwindColors[Math.floor(x)]
            case 'QUANTIDADE_CLIENTES_CIDADE':
                x = label[option] / 1.5
                x = x > 5 ? 5 : x
                x = (x > 0 && x < 1) ? 1 : x
                x = tailwindColors[Math.floor(x)]
            case 'ULTIMA_VENDA':
                return x
        }
        // console.log(label[option])
        return x
    } 

 function subtitleCategory(label, option){
        let res;
        switch(option){
            case 'ULTIMA_VENDA':
                res = moment(label).format('DD/MM/YYYY');
                break
            case 'AREA_KM2':
                res = label + " km²";
                break
            default: 
                res = label
        }
        return res
    }

export default function Drawer({setSearchCityValue}){

    const {map, baseLayer, countryLayer, stateLayer, open, setOpen, citiesCoordinates} = useContext(MapaContext)
    const [baseLayerEnable, setBaseLayerEnable] = useState(true);
    const [countryLayerEnable, setCountryLayerEnable] = useState(true);
    const [fontSize, setFontSize] = useState(8)
    const [searchValue, setSearchValue] = useState('')
    const [subTitle, setSubTitle] = useState('');
    const [selectedOption, setSelectedOption] = useState('')

    useEffect(()=>{
      setSelectedOption('');
      setSubTitle('');
      setFontSize(8)
      setBaseLayerEnable(true);
      setCountryLayerEnable(true);
    },[map])

    useEffect(()=>{
        if(!map) return
        baseLayer.setVisible(baseLayerEnable)
    },[baseLayerEnable])


    useEffect(()=>{
        if(!map) return
        countryLayer.setVisible(countryLayerEnable)
    },[countryLayerEnable])


    useEffect(()=>{
        if(!map)return
        stateLayer.getSource().getFeatures().forEach(feature=>{
          const newStyle = new Style({
              fill: new Stroke({
                  color: (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption)),
              }),
              stroke: new Stroke({
                  color: "rgba(30,30,30)",
                  width: 1,
              }),
              text: new Text({
                  text: subTitle === '' ? feature.getProperties().NM_MUN : 
                  (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
                  feature.getProperties().NM_MUN),  
                  scale: fontSize / 10
              }),
          })  
          feature.setStyle(newStyle)
        })
    },[selectedOption, fontSize, subTitle])


    function handleSeach(value){
      const rawValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
      const index = citiesCoordinates[rawValue];
      if(!index) message.error('Cidade não encontrada na região do representante');
      else if(index){
        map.getView().setCenter(index[0])
        map.getView().setZoom(10)
        setSearchValue('');
      }
    }


    return(
        
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
                                        value={searchValue}
                                        onChange={(e)=>{setSearchValue(e.target.value)}}
                                        onSearch={(value)=>{handleSeach(value);}}
                                        style={{
                                          width: 250,
                                        }}
                                      />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-bold text-sm' htmlFor='category'>Category layer</label>

                                        <Select dropdownStyle={{ zIndex: 2000 }} value={selectedOption} name='category' options={optionsSelect} defaultValue="Sem categoria" className='w-[250px]' onChange={(value)=>{setSelectedOption(value)}}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-bold text-sm' htmlFor='category'>Category subtitle</label>
                                        <Select dropdownStyle={{ zIndex: 2000 }} value={subTitle} name='category' options={optionsSubtitle} defaultValue="Sem subtítulo" className='w-[250px]' onChange={(value)=>{setSubTitle(value)}}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <div>
                                            <label className='font-bold text-sm' htmlFor='category'>Font-Size</label>
                                            <InputNumber
                                            min={6}
                                            max={36}
                                            maxLength={2}
                                            style={{
                                                marginLeft: '0px',padding: '0'
                                            }}
                                            bordered={false}
                                            value={fontSize}
                                            onChange={(v)=>{setFontSize(v)}}
                                            />
                                        </div>
                                        <Slider min={4} max={36} defaultValue={fontSize} value={fontSize} onChange={(value)=>{setFontSize(value)}}/>
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
    )    
}