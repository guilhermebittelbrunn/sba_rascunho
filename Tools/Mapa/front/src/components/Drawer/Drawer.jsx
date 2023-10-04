import React, { useState, useEffect, useContext } from 'react';
import { Button, Select, Slider, InputNumber, Checkbox, message, Drawer as DrawerAntd } from 'antd';
import { MapaContext } from '../../contexts/MapaContext';
import DragTable from './DragTable';
import LayerModal from '../Modal/LayerModal'
import Search from 'antd/es/input/Search';
import ReportModal from '../Modal/ReportModal';
import ExportPDFModal from '../Modal/ExportPDFModal';

const defaultLayersLength = 3

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



export default function Drawer({open, setOpen}){

    const { map, layers, setLayers, settings, setSettings, createFeatureStyle } = useContext(MapaContext);
    
    const {fontSize, subTitle, selectedOption} = settings;
    const [isModalOpen, setIsModalOpen] = useState({exportPDFModal: false,  reportModal: false});
    const [searchValue, setSearchValue] = useState('');
    const [isEditModal, setEditModal] = useState({status: false, layer: null});

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

      const centerOfFeature = feature.getGeometry().getInteriorPoint().getCoordinates()
      feature.setStyle(createFeatureStyle(feature, {...settings, strokeColor: 'rgb(255,238,0)', strokeWidth: 4}));

      flyTo(centerOfFeature);
      setOpen(false);
      setSearchValue('');

      setTimeout(()=> {
        feature.setStyle(createFeatureStyle(feature, settings));
      }, 5000);

    }

    function handleCheck(e){
      setLayers(pv => pv.map(layer=>{        
        if(layer.value === e.target.value){
          return {...layer, status: !layer.status}
        }
        return {...layer}
      }));
    }

    function flyTo(location) {
      const duration = 2000;
      const zoom =  map.getView().getZoom(10);
      let parts = 2;
      let called = false;
      function callback(complete) {
        --parts;
        if (called) {
          return;
        }
        if (parts === 0 || !complete) {
          called = true;
        }
        }
      map.getView().animate({center: location, duration: duration},callback);

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
    
    useEffect(()=>{
        setOpen(false);
        setSettings((pv)=>{
          return {...pv, selectedOption: ''};
        });

    },[map])

    useEffect(()=>{

      if(!map) return
        layers.forEach(layer=>{
          const index = layers.findIndex(lyr => lyr.value === layer.value);
          const status = layers[index].status;
          layer.properties.setVisible(status);
        });

        layers.slice(defaultLayersLength).forEach(layer=>{
          const index = layers.findIndex(layerMap => layerMap.name === layer.name);
          layer.properties.setZIndex(index);
        })

    },[layers])


    function handleDeleteLayer(layer){
      
        map.getLayers().getArray().forEach(layerMap=>{
          layerMap.getClassName() === layer.value && map.removeLayer(layerMap);
        });
        setLayers(pv=>{
            return pv.filter(l=>l.value !== layer.value)
        });

    }

    


    return(
        <>
          <DrawerAntd
              title="Opções"
              placement="left"
              closable={true}
              width={325}
              onClose={()=>{setOpen(false);}}
              open={open}
              getContainer={false}
            >
                <div className='w-full flex flex-col justify-between h-[100%]'>

                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <h3 className='font-bold text-sm'>Buscar Cidade</h3>
                            <Search
                              placeholder="Nome do município"
                              value={searchValue}
                              onChange={(e)=>{setSearchValue(e.target.value);}}
                              onSearch={(value)=>{handleSeach(value);}}
                            />
                      </div>

                      <div className='flex flex-col'>
                          <h3 className='font-bold text-sm'>Colorir por Categoria</h3>
                          <Select 
                            value={selectedOption} name='category' options={optionsSelect} defaultValue="Sem categoria"
                            onChange={(value)=>{setSettings(pv=>{return {...pv, selectedOption: value}})}}
                          />
                      </div>

                      <div className='flex flex-col'>
                          <h3 className='font-bold text-sm'>Exibir Subtítulo</h3>
                          <Select 
                            value={subTitle} name='category' options={optionsSubtitle} defaultValue="Sem subtítulo"
                            onChange={(value)=>{setSettings(pv=>{return {...pv, subTitle: value}})}}
                          />
                      </div>

                      <div className='flex flex-col'>
                          <div>
                              <h3 className='font-bold text-sm inline'>Tamanho da Fonte</h3>
                              <InputNumber
                                min={6}
                                max={36}
                                maxLength={2}
                                bordered={false}
                                value={fontSize}
                                onChange={(value)=>{setSettings(pv=>{return {...pv, fontSize: value}})}}
                              />
                          </div>
                          <Slider min={4} max={36} defaultValue={fontSize} value={fontSize} onChange={(value)=>{setSettings(pv=>{return{...pv, fontSize: value}})}}/>
                      </div>

                      <div>
                          <h3 className='text-sm font-bold mb-1'>Camadas Matriz</h3>
                          <div className='flex flex-col gap-1'>
                            {layers.map(layer=>{
                              if(layer.value.slice(0,6) === 'custom'){
                                return
                              }
                              return(
                                    <div key={layer.key} className='flex w-full justify-between'>
                                      <span className='text-sm'>{layer.name}</span>
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

                      <div className={`w-full mt-2`}>
                        <h3 className={`font-bold text-sm mb-1 ${layers.length <= defaultLayersLength && 'hidden'}`}>Camadas Customizáveis</h3>
                            <div className={`overflow-auto mb-6 max-h-[240px] w-[285px]`}>
                            {layers.length > defaultLayersLength && 
                              <DragTable 
                                handleCheck={handleCheck}
                                setIsModalOpen={setEditModal} 
                                layers={layers} 
                                setLayers={setLayers} 
                                handleDelete={handleDeleteLayer}
                              />
                            }
                        </div>
                      </div>

                    </div>
                                          
                    <div className='w-full flex flex-col gap-2'>
                        <Button onClick={()=>{setIsModalOpen(pv=>{return {...pv, exportPDFModal: true}})}}>Imprimir Mapa</Button>
                        <Button onClick={()=>{setIsModalOpen(pv=>{return {...pv, reportModal: true}})}}>Exportar Relatório</Button>
                    </div>   
                                
                </div>
                                    
            </DrawerAntd>  


            <ExportPDFModal isModalOpen={isModalOpen.exportPDFModal} handleCancel={()=>{setIsModalOpen({exportPDFModal: false, reportModal: false})}}/>
            <ReportModal isModalOpen={isModalOpen.reportModal} handleCancel={()=>{setIsModalOpen({exportPDFModal: false, reportModal: false})}}/>
            <LayerModal layer={isEditModal?.layer} isModalOpen={isEditModal?.status} disableModal={setEditModal}/>            

        </> 
    )    
}