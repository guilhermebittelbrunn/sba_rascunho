


import dayjs from "dayjs";
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {Spin, Button, Modal, Input, message, Checkbox} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { MapaContext } from '../../contexts/MapaContext';
import {Vector as vector} from 'ol/layer'
import {Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import InputDate from '../Form/InputDate'

const CheckBoxGroup = Checkbox.Group

const brandOptions = [
    {
        label: 'Sba',
        value: '01',
    },
    {
        label: 'Alvha',
        value: '02',
    },
    {
        label: 'Yellowl',
        value: '03',
    },
]

export default function AddRepModal({isModalOpen, disableModal}){
    
    const {layers, setLayers, settings, createFeatureStyle, map, rc, url} = useContext(MapaContext);
    const {control, handleSubmit, reset} = useForm({defaultValues: {dateStart: dayjs(url.dateStart, 'YYYY-MM-DD'), dateEnd: dayjs(url.dateEnd, 'YYYY-MM-DD'), rc:null, brands: null}});
    const [isLoading, setIsLoading] = useState(false);

    function generateRandomColor(){
        return (
            `rgba(${Math.floor(Math.random() * (255 - 0) + 0)},${Math.floor(Math.random() * (255 - 0) + 0)},${Math.floor(Math.random() * (255 - 0) + 0)},1)`
        )
    }

    async function handleOk(data){

        // console.log(data);

        const {dateStart, dateEnd} = data;
        if(dateStart > dateEnd){
            return message.error('Data inicial maior que a final');
        }

        const url = {
            rc: data.rc,
            dateStart: data.dateStart.format('YYYY-MM-DD'),    
            dateEnd: data.dateEnd.format('YYYY-MM-DD'),    
        }

        const fillColor = generateRandomColor();

        try{
            setIsLoading(true);
            
            const res = await axios.get(`http://localhost:3535/api/sales/${String(url.rc).padStart(4, 0)}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}&brands=${JSON.stringify(data.brands)}`);
            if(res.data.features.length === 0){
                throw `${url.rc} não possui features, features:${res.data.features.length}`
            }
            const customID = `custom_layer${Math.random(0,1000) * 100}`
            const newLayer = {
                name: `Vendas RC ${String(url.rc).padStart(4,0)}`,
                value: customID,
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
                    className: `Vendas RC ${String(url.rc).padStart(4,0)}`,
                    rc: String(url.rc).padStart(4,0),
                    value: customID
                })
            }

            setLayers(pv=>{return [...pv, newLayer]});
            reset({rc:'', dateStart: dayjs(url.dateStart, 'YYYY-MM-DD'), dateEnd: dayjs(url.dateEnd, 'YYYY-MM-DD')});
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
                                    // console.log('start', field);
                                    return (
                                        <InputDate 
                                            className={'w-60'} 
                                            initialDate={field.value} 
                                            type={"start"} 
                                            field={field}
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
                                    // console.log('end', field);
                                    return( 
                                        <InputDate 
                                            className={'w-60'}
                                            field={field}
                                            initialDate={field.value}  
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
                                            {...field} size="middle" placeholder='Código do representante' 
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

                        <div className="flex flex-col"> 
                            <h3 className="text-sm font-semibold">Marcas</h3>
                            <Controller
                                render={({field})=>{
                                    return(
                                        // <Input 
                                        //     {...field} size="middle" required={true} placeholder='Código do representante' 
                                        //     name='rc' onChange={(e)=>{field.onChange(e.target.value)}} maxLength={4}
                                        //     allowClear={false} className="w-full outline-none"
                                        // />
                                        <CheckBoxGroup options={brandOptions} className="flex justify-center gap-4 mt-[2px]" {...field} value={field.value} onChange={field.onChange}/>
                                    ) 
                                }}
                                name="brands"
                                control={control}
                                rules={{maxLength: 4, required:true}}
                            > 
                            </Controller>
                        </div>    

                        <div className='w-full flex flex-col justify-center items-center mt-2'>
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