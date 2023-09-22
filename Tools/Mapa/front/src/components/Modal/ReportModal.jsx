import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Spin, message } from 'antd';
import { MapaContext } from '../../contexts/MapaContext';
import RadioInput from '../Form/RadioInput';

const reportOptions = [{name: 'Simples'},{name: 'Detalhado'}];

export default function ReportModal({ handleCancel }){
    const { url } = useContext(MapaContext)
    const { handleSubmit, control } = useForm({defaultValues:{reportType: 'Detalhado'}});
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
            <form onSubmit={handleSubmit(sendForm)}>

                <h3 className='font-semibold mt-2'>Tipo</h3>
                <Controller name='reportType' control={control} render={({field})=>{
                    return (
                        <RadioInput 
                            dataset={reportOptions} defaultValue={'Simples'} field={field} 
                            cardStyle={`hover:cursor-pointer w-32 h-16 mb-10 border-[1px] 
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
    )
}





