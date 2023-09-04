import RadioInput from './RadioInput';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'antd';


const reportOptions = [
    {
        name: 'Simples'
    },
    {
        name: 'Detalhado'
    },
]

export default function ReportForm({ handleCancel }){
    
    const {handleSubmit, control} = useForm({defaultValues:{reportType: 'Detalhado'}});

    const handleSendForm = (data) =>{
        console.log(data)
    }

    return(
        <>
            <form onSubmit={handleSubmit(handleSendForm)}>
                <h3 className='font-semibold mt-2'>Tipo</h3>
                <Controller name='reportType' control={control} render={({field})=>{
                    return <RadioInput dataset={reportOptions} defaultValue={'Detalhado'} field={field} cardStyle={'hover:cursor-pointer w-32 h-16 mb-10 border-[1px] rounded-sm relative flex flex-col justify-center items-center'}  />
                }}/>
                <div className='absolute right-4 bottom-4 flex gap-2'>
                    <Button onClick={handleCancel}>Cancelar</Button>
                    <Button htmlType='submit' className='bg-blue-500 text-white hover:bg-white hover:text-blue-500'>Exportar</Button>
                </div>          
            </form>


        </>
    )
}





