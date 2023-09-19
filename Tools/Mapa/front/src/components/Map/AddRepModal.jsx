


import { useEffect, useRef, useContext, useState } from 'react';
import {Spin, Button, Modal, Input, ColorPicker,  Divider, Statistic} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import RadioInput from '../Modal/RadioInput'
import { MapaContext } from '../../contexts/MapaContext';
import InputDate from '../Form/InputDate'
import dayjs from "dayjs";
import axios from 'axios';

const {Search} = Input

export default function AddRepModal({isModalOpen, setIsModalOpen}){
    const {layers} = useContext(MapaContext);
    const {control, handleSubmit, reset} = useForm();
    const currentDate = new Date();

    const handleOk = (data) => {
        console.log(data);
        disableModal();
    };  
    
    const disableModal = () => {
        setIsModalOpen({newLayerModal: false, addRepModal: false});
    };


    return (
        <>
               <Modal centered={true} title={"Importar vendas Representante"} open={isModalOpen}  okButtonProps={{hidden:true}} cancelButtonProps={{hidden: true}}  width={320}>
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
                                return <Input {...field} size="middle" required={true} placeholder='Código do representante' name='rc' onChange={(e)=>{field.onChange(e.target.value)}} maxLength={4} minLength={4} allowClear={false} className="w-[270px] outline-none max-md:w-[440px]"/>
                                }}
                                name="rc"
                                control={control}
                                rules={{maxLength: 4, minLength: 4, required:true}}
                                > 
                            </Controller>
                        </div>    

                        <div className='w-full flex flex-col justify-center items-center mt-6'>
                            <Button htmlType='submit' type='primary' className='w-60 bg-blue-600'>Importar</Button>
                        </div>
                    </form>   
                </Modal>  
        </>
    )
}