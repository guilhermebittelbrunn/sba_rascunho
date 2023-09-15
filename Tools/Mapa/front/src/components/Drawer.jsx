import { Button, Select, Table ,theme,Slider, Switch, InputNumber, Checkbox, Drawer as DrawerAntd, Input, message } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { MenuOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { MapaContext } from '../contexts/MapaContext';
import { Stroke, Style, Text, Fill } from 'ol/style';
import { CSS } from '@dnd-kit/utilities';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const columns = [
  {
    key: 'sort',
    width: 30
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300
  },
  { 
    render: (text, record)=>{return <EditOutlined className='hover:text-yellow-500'/>}
  },
  { 
    render: (text, record)=>{return <DeleteOutlined className='hover:text-red-400'/>}
  },
  { 
    render: (text, record)=>{return <Checkbox defaultChecked={true} onClick={()=>{console.log(text); text.status = !text.status; text.properties.setVisible(text.status)}}/>}
  },
];

const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    ),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

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

    const defaultLayersLength = 3
    const {map, layers, open, setOpen, setIsModalOpen, setLayers,settings, setSettings, searchValue, setSearchValue,} = useContext(MapaContext);
    const {fontSize, subTitle, selectedOption} = settings;
    // const [dataSource, setDataSource] = useState([]);


    const onDragEnd = ({ active, over }) => {
      if (active.id !== over?.id) {
        setLayers((previous) => {
          const activeIndex = previous.findIndex((i) => i.key === active.id);
          const overIndex = previous.findIndex((i) => i.key === over?.id);
          return arrayMove(previous, activeIndex, overIndex);
        });
      }
      // const list = [];

      // console.log(layers.slice(3));

      // const orderData = dataSource.sort((a,b)=> b - a)
      // dataSource.map((ds,key)=>{
      //   const stateLayerIndexValue = 3
      //   ds.properties.setZIndex(key + stateLayerIndexValue);
      // })
    };

    useEffect(()=>{
      
        setSettings((pv)=>{
          return {...pv, fontSize: 10, subTitle: '', selectedOption: ''};
        });

    },[map])

    useEffect(()=>{

        if(!map) return
  
        layers.forEach(layer=>{
          const index = layers.findIndex(lyr => lyr.value === layer.value);
          const status = layers[index].status;
          layer.properties.setVisible(status);
        });
        // setDataSource(pv=>{
        //   return [...pv, layers.slice(defaultLayersLength)]
        // });
        
    },[layers])


    function handleSeach(value){
      const stateLayer = layers[layers.findIndex(layer=>layer.value === 'stateLayer')].properties;
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
      console.log(feature);
      feature.getStyle().setStroke(new Stroke({color: "rgb(222, 245, 16)",width: 4}));
      flyTo(feature.getGeometry().getInteriorPoint().getCoordinates());
      setOpen(false);
      setTimeout(()=> setSearchValue(''),6000);
    }

    function handleCheck(e){
      setLayers(pv => pv.map(layer=>{        
        if(layer.value === e.target.value){
          return {...layer, status: !layer.status}
        }
        return {...layer}
      }));

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
              width={325}
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
                                          width: 275,
                                        }}
                                      />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-bold text-sm' htmlFor='category'>Category layer</label>
                                        <Select dropdownStyle={{ zIndex: 2000 }} value={selectedOption} name='category' options={optionsSelect} defaultValue="Sem categoria" className='w-[275px]' onChange={(value)=>{setSettings(pv=>{return {...pv, selectedOption: value}})}}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-bold text-sm' htmlFor='category'>Category subtitle</label>
                                        <Select dropdownStyle={{ zIndex: 2000 }} value={subTitle} name='category' options={optionsSubtitle} defaultValue="Sem subtítulo" className='w-[275px]' onChange={(value)=>{setSettings(pv=>{return {...pv, subTitle: value}})}}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <div>
                                            <label className='font-bold text-sm' htmlFor='category'>Font-Size</label>
                                            <InputNumber
                                            min={6}
                                            max={36}
                                            maxLength={2}
                                            style={{marginLeft: '0px',padding: '0'}}
                                            bordered={false}
                                            value={fontSize}
                                            onChange={(value)=>{setSettings(pv=>{return {...pv, fontSize: value}})}}
                                            />
                                        </div>
                                        <Slider min={4} max={36} defaultValue={fontSize} value={fontSize} onChange={(value)=>{setSettings(pv=>{return{...pv, fontSize: value}})}}/>
                                    </div>

                                    <div>
                                      <h3 className='text-sm font-bold mb-1'>Default Layers</h3>
                                      <div className='flex flex-col gap-1'>
                                        {layers.map(layer=>{
                                        if(layer.value.slice(0,6) === 'custom')return
                                        return(
                                              <div key={layer.key} className='flex w-full justify-between'>
                                                <span className='text-base'>{layer.name}</span>
                                                <Checkbox  
                                                  value={layer.value}
                                                  onClick={(e)=>handleCheck(e)}
                                                  checked={layer.status}
                                                />
                                              </div>
                                          )
                                      })}
                                      </div>
                                    </div>

                                    <div className='mt-2'>
                                      <h3 className={`font-bold text-sm mb-1 ${layers.length <= 3 && 'hidden'}`}>Custom Layers</h3>
                                        <div className='overflow-auto h-[270px] w-[285px]'>
                                          {layers.length > 3 && 
                                              <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                                                  <SortableContext
                                                    // rowKey array
                                                    items={layers.map((i) => i.key)}
                                                    strategy={verticalListSortingStrategy}
                                                  >
                                                    <Table
                                                      components={{
                                                        body: {
                                                          row: Row,
                                                        },
                                                      }}
                                                      size='small'
                                                      rowKey="key"
                                                      columns={columns}
                                                      dataSource={layers.slice(3)}
                                                      pagination={false}
                                                      showHeader={false}           
                                                              
                                                    />
                                                  </SortableContext>
                                              </DndContext>        
                                          }
                                        </div>
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