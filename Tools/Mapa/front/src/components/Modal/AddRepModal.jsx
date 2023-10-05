


import dayjs from "dayjs";
import axios from 'axios';
import { useContext, useState } from 'react';
import {Spin, Button, Modal, Input, message} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { MapaContext } from '../../contexts/MapaContext';
import {Vector as vector} from 'ol/layer'
import {Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import InputDate from '../Form/InputDate'


export default function AddRepModal({isModalOpen, disableModal}){
    
    const {layers, setLayers, settings, createFeatureStyle, map, rc} = useContext(MapaContext);
    const {control, handleSubmit, reset} = useForm();
    const [isLoading, setIsLoading] = useState(false);

    function generateRandomColor(){
        return (
            `rgba(
            ${Math.floor(Math.random() * (255 - 0) + 0)}, 
            ${Math.floor(Math.random() * (255 - 0) + 0)}, 
            ${Math.floor(Math.random() * (255 - 0) + 0)}, 
            1)`
        )
    }


    async function handleOk(data){
        const url = {
            rc: data.rc,
            dateStart: data.dateStart.format('YYYY-MM-DD'),    
            dateEnd: data.dateEnd.format('YYYY-MM-DD'),    
        }

        // if(rc === url.rc){
        //     message.warning('Informe um representante diferente do já buscado');
        //     return
        // }

        const fillColor = generateRandomColor();

        try{
            setIsLoading(true);
            
            const res = await axios.get(`http://localhost:3535/api/sales/${String(url.rc).padStart(4, 0)}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`);
            if(res.data.features.length === 0){
                throw `${url.rc} não possui features, features:${res.data.features.length}`
            }
            const newLayer = {
                name: `Vendas RC ${String(url.rc).padStart(4,0)}`,
                value: `custom_layer${layers.length + 1}`,
                status: true,
                key: layers.length + 1,
                data:{
                    layerName: `Vendas RC ${String(url.rc).padStart(4,0)}`,
                    fontColor: '#000000',
                    borderColor: '#000000',
                    fillStyle: 45,
                    fillColor,
                },
                properties: new vector({
                    source: new Vector({
                        features: new GeoJSON().readFeatures(res.data),
                    }),
                    style: (feature, res)=>{
                        feature.setProperties({SELECTED:false, fontColor: '#000000', strokeColor: '#000000', fillStyle: 45, fillColor});
                        return createFeatureStyle(feature, settings, null, res);
                    },
                    zIndex: 4,
                    className: `custom_layer${layers.length + 1}`,
                    rc: String(url.rc).padStart(4,0)
                })
            }

            setLayers(pv=>{return [...pv, newLayer]});
            reset({rc:'', dateStart: dayjs().add(-1, 'y'), dateEnd: dayjs()});
            map.addLayer(newLayer.properties);
            disableModal();

        }catch(err){
            message.error(`Não foram encontrados dados referentes ao representante: ${url.rc}`);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    };  


    return (
               <Modal centered={true} title="Importar vendas Representante" open={isModalOpen} onCancel={disableModal} width={320} cancelButtonProps={{hidden: true}} okButtonProps={{hidden:true}}>
                    <form className='flex flex-col gap-1' onSubmit={handleSubmit(handleOk)}>
                        <div className="flex flex-col"> 
                            <h3 className="text-sm font-semibold">Data inicial</h3>
                            <Controller
                                render={({field})=>{
                                    return (
                                        <InputDate 
                                            className={'w-60'} initialDate={dayjs().add(-1, 'y')} 
                                            type={"start"} field={field}
                                        />
                                    )
                                }}
                                name="dateStart"
                                control={control}
                            />
                        </div>

                        <div className="flex flex-col"> 
                            <h3 className="text-sm font-semibold">Data final</h3>
                            <Controller
                                render={({field})=>{
                                    return( 
                                        <InputDate 
                                            className={'w-60'}
                                            field={field}
                                            initialDate={dayjs()}  
                                        />
                                    )
                                }}
                                name='dateEnd'
                                control={control}
                            />
                        </div>

                        <div className="flex flex-col"> 
                            <h3 className="text-sm font-semibold">Representante</h3>
                            <Controller
                                render={({field})=>{
                                    return(
                                        <Input 
                                            {...field} size="middle" required={true} placeholder='Código do representante' 
                                            name='rc' onChange={(e)=>{field.onChange(e.target.value)}} maxLength={4}
                                            allowClear={false} className="w-full outline-none"
                                        />
                                    ) 
                                }}
                                name="rc"
                                control={control}
                                rules={{maxLength: 4, required:true}}
                            > 
                            </Controller>
                        </div>    

                        <div className='w-full flex flex-col justify-center items-center mt-6'>
                            {isLoading ?
                                <Spin size='small'/>
                                :
                                <Button htmlType='submit' type='primary' className='w-60 bg-blue-600'>
                                    Importar
                                </Button>
                            }
                        </div>

                    </form>   
                </Modal>  
    )
}