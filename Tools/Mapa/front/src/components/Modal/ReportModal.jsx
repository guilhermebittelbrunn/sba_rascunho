import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Spin, message, Tooltip, Modal as ModalAntd } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { MapaContext } from '../../contexts/MapaContext';
import RadioInput from '../Form/RadioInput';

const reportOptions = [{name: 'Simples'},{name: 'Detalhado'}];

export default function ReportModal({ handleCancel, isModalOpen }){
    const { url } = useContext(MapaContext)
    const { handleSubmit, control } = useForm({defaultValues:{reportType: 'Simples'}});
    const [isLoading, setIsLoading] = useState(false);
    
    async function sendForm(fv){

        setIsLoading(true);

        try{
            const res = await axios.get(`http://localhost:3535/api/report/${fv.reportType}/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`, {responseType: 'arraybuffer'});
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url2 = window.URL.createObjectURL(blob);
            window.open(url2);

        }catch(err){
            console.log(err);
            message.error('Um erro ocorreu durante a geração do relatório');
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <ModalAntd 
                title={'Gerar Relatório'} width={350} 
                centered={true} open={isModalOpen} okButtonProps={{hidden: true}} 
                cancelButtonProps={{hidden: true}} onCancel={handleCancel} handleCancel={handleCancel}
            >
            <form onSubmit={handleSubmit(sendForm)}>

                <div className='flex justify-between items-center mt-4'>
                    <h3 className='font-semibold'>Tipo</h3>
                    <Tooltip  title={
                     
               
                        ()=>{return (
                            <>
                                <p>
                                    Simples: informações agrupadas do pedido mais recente realizado em cada cidade.
                                    <br/>(processo rápido)
                                </p>
                                <br/>
                                <p>
                                    Detalhado: informações detalhadas sobre todos os pedidos realizados em cada cidade com resumo
                                    e agrupamentos por cidade.
                                    <br/>(processo lento)
                                </p>
                            </>
                        )}
                        }>
                        <QuestionCircleOutlined/>
                    </Tooltip>
                </div>
                <Controller name='reportType' control={control} render={({field})=>{
                    return (
                        <RadioInput 
                            dataset={reportOptions} defaultValue={'Simples'} field={field} 
                            cardStyle={`hover:cursor-pointer w-full h-16 mb-10 border-[1px] 
                            rounded-sm relative flex flex-col justify-center items-center`}
                        />
                    )
                }}/>

                <div className='absolute right-4 bottom-4 flex gap-2'>
                    {isLoading ? 
                        <Spin/> 
                        : 
                        <>
                            <Button onClick={handleCancel}>Cancelar</Button>
                            <Button htmlType='submit' type='primary' className='bg-blue-600'>Exportar</Button>
                        </>
                    }
                </div>     
                     
            </form>
        </ModalAntd>
    )
}





