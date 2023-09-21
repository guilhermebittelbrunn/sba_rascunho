


import { useEffect, useRef, useContext, useState } from 'react';
import {Spin, Button, Modal, Input, ColorPicker,  Divider, Statistic, message} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import RadioInput from '../Modal/RadioInput'
import { MapaContext } from '../../contexts/MapaContext';
import InputDate from '../Form/InputDate'
import dayjs from "dayjs";
import axios from 'axios';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text, Fill} from 'ol/style'

const {Search} = Input

export default function AddRepModal({isModalOpen, setIsModalOpen}){
    const {layers, settings, createFeatureStyle, setLayers, map, rc} = useContext(MapaContext);
    const {control, handleSubmit, reset} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const currentDate = new Date(); 

    const generateRandomValue = ()=>{
        const randomNumber = Math.random(0,255);
        return Math.floor(randomNumber * 100);
    }

    const generateRandomColor = ()=>{
        return `rgba(${generateRandomValue()}, ${generateRandomValue()}, ${generateRandomValue()}, 0.7)`
    }

    const handleOk = async(data) => {
        const url = {
            rc: data.rc,
            dateStart: data.dateStart.format('YYYY-MM-DD'),    
            dateEnd: data.dateEnd.format('YYYY-MM-DD'),    
        }

        if(rc === url.rc){
            message.warning('Informe um representante diferente do já buscado');
            return
        }

        const fillColor = generateRandomColor();

        try{
            setIsLoading(true);
            const res = await axios.get(`http://localhost:3535/api/sales/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`)

            const newLayer = {
                name: `Vendas RC ${url.rc}`,
                value: `custom_layer${layers.length + 1}`,
                status: true,
                key: layers.length + 1,
                data:{
                    layerName: `Vendas RC ${url.rc}`,
                    fontColor: 'rgb(255, 0, 0)',
                    borderColor: '#000000',
                    fillColor
                },
                properties: new vector({
                    source: new Vector({
                        features: new GeoJSON().readFeatures(res.data),
                    }),
                    style: (feature,res)=>{
                        feature.setProperties({SELECTED:false, fillColor, fontColor: 'rgb(255, 0, 0)', strokeColor: '#000000'});
                        return createFeatureStyle(feature, settings);
                    },
                    zIndex: 4,
                    className: `custom_layer${layers.length + 1}`,
                    // properties: {color: (feature,res)=>(selectedOption === '' ?  (feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)") : colorCategory(feature.getProperties(), selectedOption))},
                })
            }

            setLayers(pv=>{return [...pv, newLayer]});
            map.addLayer(newLayer.properties);
            reset({rc:'', dateStart: dayjs(currentDate).add(-1, 'y'), dateEnd: dayjs(currentDate)});
            disableModal();          
        }catch(err){
            message.error(`Não foram encontrados dados referentes ao representante: ${url.rc}`);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
        
        // disableModal();

    };  
    
    const disableModal = () => {
        setIsModalOpen({newLayerModal: false, addRepModal: false});
    };


    return (
        <>
               <Modal centered={true} title={"Importar vendas Representante"} open={isModalOpen}  okButtonProps={{hidden:true}} onCancel={disableModal} cancelButtonProps={{hidden: true}}  width={320}>
                    <form className='flex flex-col gap-1' onSubmit={handleSubmit(handleOk)}>

                        <div className="flex flex-col"> 
                            <h3 className="text-sm font-semibold">Data inicial</h3>
                            <Controller
                                render={({field})=>{
                                    return <InputDate className={'w-60'} initialDate={dayjs(currentDate).add(-1, 'y')} type={"start"} field={field}/>
                                }}
                                name="dateStart"
                                control={control}
                                >
                            </Controller>
                        </div>

                        <div className="flex flex-col"> 
                            <h3 className="text-sm font-semibold">Data final</h3>
                            <Controller
                            render={({field})=>{
                                return <InputDate className={'w-60'} initialDate={dayjs(currentDate)}  field={field}/>
                            }}
                            name='dateEnd'
                            control={control}
                            
                            />
                        </div>

                        <div className="flex flex-col"> 
                            <h3 className="text-sm font-semibold">Representante</h3>
                            <Controller
                                render={({field, fieldState})=>{
                                // return <Input {...field} size="middle" required={true} placeholder='Código do representante' name='rc' onChange={(e)=>{field.onChange(e.target.value)}} maxLength={4} minLength={4} allowClear={false} className="w-[270px] outline-none max-md:w-[440px]"/>
                                // }}
                                return <Input {...field} size="middle" required={true} placeholder='Código do representante' name='rc' onChange={(e)=>{field.onChange(e.target.value)}} maxLength={4} minLength={4} allowClear={false} className="w-full outline-none"/>
                                }}
                                name="rc"
                                control={control}
                                rules={{maxLength: 4, minLength: 4, required:true}}
                                > 
                            </Controller>
                        </div>    

                        <div className='w-full flex flex-col justify-center items-center mt-6'>
                            {isLoading ?
                                <Spin size='small'/>
                                :
                                <Button htmlType='submit' type='primary' className='w-60 bg-blue-600'>Importar</Button>
                            }
                        </div>

                    </form>   
                </Modal>  
        </>
    )
}