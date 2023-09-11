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



export default function Drawer(){

    const {map, baseLayer, countryLayer, stateLayer, open, setOpen, setIsModalOpen, settings, setSettings, searchValue, setSearchValue} = useContext(MapaContext);
    const [baseLayerEnable, setBaseLayerEnable] = useState(true);
    const [countryLayerEnable, setCountryLayerEnable] = useState(true);
    const {fontSize, subTitle, selectedOption} = settings
    

    

    useEffect(()=>{
        setSettings((pv)=>{
          return {...pv, fontSize: 10, subTitle: '', selectedOption: ''};
        })
        setBaseLayerEnable(true);
        setCountryLayerEnable(true);
    },[map])

    useEffect(()=>{
        if(!map) return
        baseLayer.setVisible(baseLayerEnable);
        countryLayer.setVisible(countryLayerEnable);
    },[baseLayerEnable, countryLayerEnable])

    // useEffect(()=>{
    //     if(!map)return
    //     stateLayer.getSource().getFeatures().forEach(feature=>{
    //       const newStyle = new Style({
    //           fill: new Fill({
    //               color: (selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption)),
    //           }),
    //           stroke: new Stroke({
    //               color: "rgba(30,30,30)",
    //               width: 1,
    //           }),
    //           text: new Text({
    //               text: subTitle === '' ? feature.getProperties().NM_MUN : 
    //               (feature.getProperties()[subTitle]? `${feature.getProperties().NM_MUN} \n ${subtitleCategory(feature.getProperties()[subTitle], subTitle)}` : 
    //               feature.getProperties().NM_MUN),  
    //               font: `bold ${fontSize}px ${"Segoe UI"}`,
    //               fill: new Fill({
    //                     color: feature.getProperties().NUMERO_PEDIDO ? 'rgb(255, 0, 0)' : 'rgb(0,0,0)'
    //               }),
    //               // backgroundFill: new Stroke({
    //               //   color: "rgba(255,255,255)",
    //               //   width: 1,
    //               // }),
    //           }),
    //       })  
    //       feature.setStyle(newStyle)
    //     })
    // },[selectedOption, fontSize, subTitle, searchValue])


    function handleSeach(value){
      const features = stateLayer.getSource().getFeatures();
      const index = features.findIndex(f => {
        const f_name = f.values_['NM_MUN'].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
        return f_name === value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
      });
      const feature = features[index];

      if(!feature) {
        return message.error('Cidade não encontrada na região do representante');
      }
      // const oldStroke = feature.getStyle().getStroke();
      console.log(feature)
      feature.getStyle().setStroke(new Stroke({color: "rgb(222, 245, 16)",width: 4}));
      flyTo(feature.getGeometry().getInteriorPoint().getCoordinates());
      setOpen(false);
      setTimeout(()=> setSearchValue(''),6000);
    }

    function flyTo(location, zoomLevel, done) {
        const duration = 2000;
        const zoom =  map.getView().getZoom(10)
        let parts = 2;
        let called = false;
        function callback(complete) {
          --parts;
          if (called) {
            return;
          }
          if (parts === 0 || !complete) {
            called = true;
            // done(complete);
          }
        }
        map.getView().animate(
          {
            center: location,
            duration: duration,
          },
          callback
        );
        map.getView().animate(
          {
            zoom: zoom <= 6 ? zoom : zoom - 1,
            duration: duration / 2,
          },
          {
            zoom: zoom + .5,
            duration: duration / 2,
          },
          callback
        );
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

                                        <Select dropdownStyle={{ zIndex: 2000 }} value={selectedOption} name='category' options={optionsSelect} defaultValue="Sem categoria" className='w-[250px]' onChange={(value)=>{setSettings(pv=>{return {...pv, selectedOption: value}})}}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-bold text-sm' htmlFor='category'>Category subtitle</label>
                                        <Select dropdownStyle={{ zIndex: 2000 }} value={subTitle} name='category' options={optionsSubtitle} defaultValue="Sem subtítulo" className='w-[250px]' onChange={(value)=>{setSettings(pv=>{return {...pv, subTitle: value}})}}/>
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
                                            onChange={(value)=>{setSettings(pv=>{return {...pv, fontSize: value}})}}
                                            />
                                        </div>
                                        <Slider min={4} max={36} defaultValue={fontSize} value={fontSize} onChange={(value)=>{setSettings(pv=>{return{...pv, fontSize: value}})}}/>
                                    </div>

                                    
                                    <div>
                                      <Checkbox  onClick={(e)=>{setBaseLayerEnable(e.target.checked)}} checked={baseLayerEnable}>Enable base layer</Checkbox>
                                    </div>
                                    <div>
                                      <Checkbox  onClick={(e)=>{setCountryLayerEnable(e.target.checked)}} checked={countryLayerEnable}>Enable country layer</Checkbox>
                                    </div>

                            </div>
                            <div id='bts' className='w-full flex flex-col gap-2'>
                                <Button onClick={()=>{setIsModalOpen({status:true, type:'export'})}}>Imprimir Mapa</Button>
                                <Button onClick={()=>{setIsModalOpen({status:true, type:'report'})}}>Exportar Relatório</Button>
                            </div>               
                          </div>
            </DrawerAntd>   
    )    
}