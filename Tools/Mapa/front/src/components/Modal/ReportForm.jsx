import RadioInput from './RadioInput';
import { useContext, useState } from 'react';
import { MapaContext } from '../../contexts/MapaContext';
import { useForm, Controller } from 'react-hook-form';
import { Button, Spin, message } from 'antd';
import axios from 'axios';
import {jsPDF} from 'jspdf'

const reportOptions = [
    {
        name: 'Simples'
    },
    {
        name: 'Detalhado'
    },
]

export default function ReportForm({ handleCancel }){
    const [isLoading, setIsLoading] = useState(false);
    const {url} = useContext(MapaContext)
    const {handleSubmit, control} = useForm({defaultValues:{reportType: 'Detalhado'}});
    const pdf = new jsPDF('landscape', 'mm', [297,210]);
    const sendForm = async (fv) =>{

        setIsLoading(true);
        try{
            const res = await axios.get(`http://localhost:3535/api/report/${fv.reportType}/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`, {responseType: 'arraybuffer'});
            console.log(`http://localhost:3535/api/report/${fv.reportType}/${url.rc}?dateStart=${url.dateStart}&dateEnd=${url.dateEnd}`)
            // console.log(1)
            
            console.log(res)


            const blob = new Blob([res.data], { type: 'application/pdf' });

            // Crie uma URL temporária para o blob
            const url2 = window.URL.createObjectURL(blob);

            // Abra o PDF em uma nova aba
            window.open(url2);
            setIsLoading(false)
        }catch(err){
            console.log(err);
            message.error('Um erro ocorreu durante a geração do relatório');
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit(sendForm)}>
                <h3 className='font-semibold mt-2'>Tipo</h3>
                <Controller name='reportType' control={control} render={({field})=>{
                    return <RadioInput dataset={reportOptions} defaultValue={'Detalhado'} field={field} cardStyle={'hover:cursor-pointer w-32 h-16 mb-10 border-[1px] rounded-sm relative flex flex-col justify-center items-center'}  />
                }}/>
                <div className='absolute right-4 bottom-4 flex gap-2'>
                    {isLoading ? <Spin/> : 
                        <>
                            <Button onClick={handleCancel}>Cancelar</Button>
                            <Button htmlType='submit' className='bg-blue-500 text-white hover:bg-white hover:text-blue-500'>Exportar</Button>
                        </>
                    }
                </div>          
            </form>
        </>
    )
}





