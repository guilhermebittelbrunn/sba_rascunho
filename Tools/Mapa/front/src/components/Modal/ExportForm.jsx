import { Button } from 'antd';
import { useForm, Controller } from 'react-hook-form'
import RadioInput from './RadioInput'

const sizeDataSet = [
    {
        type: 'pdf',
        name: 'A2'
    },
    {
        type: 'pdf',
        name: 'A3'
    },
    {
        type: 'pdf',
        name: 'A4'
    },
];

const sizeDefaultValue = 'A3'

const dpiValueSet = [
    {
        type: 'dpi',
        name: 300
    },
    {
        type: 'dpi',
        name: 600
    },
    {
        type: 'dpi',
        name: 900
    },
];

const dpiDefaultValue = 600

export default function ExportForm({ handleCancel }){

    const {handleSubmit, control} = useForm({defaultValues:{paperSize: sizeDefaultValue, dpiValue: dpiDefaultValue}});

    const sendForm = (data)=>{
        console.log(data)
    }

    return(
        <form className='flex flex-col gap-2 justify-center ml-2' onSubmit={handleSubmit(sendForm)}>

                    <div>
                        <h3 className='font-semibold mt-2'>Tamanho da folha</h3>
                        <Controller name='paperSize' control={control} render={({field})=>{
                            return <RadioInput field={field} dataset={sizeDataSet} defaultValue={sizeDefaultValue} cardStyle={`hover:cursor-pointer w-16 h-16 border-[1px] rounded-sm relative flex flex-col justify-center items-center`}/>
                        }}/>
                    </div>

                    <div className='mb-12'>
                        <h3 className='font-semibold mt-2'>Resolução</h3>
                        <Controller name='dpiValue' control={control} render={({field})=>{
                            return <RadioInput field={field} dataset={dpiValueSet} defaultValue={dpiDefaultValue} cardStyle={`hover:cursor-pointer w-16 h-16 border-[1px] rounded-sm relative flex flex-col justify-center items-center`}/>
                        }}/>
                    </div>
                
                    <div className='absolute right-4 bottom-4 flex gap-2'>
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button htmlType='submit' className='bg-blue-500 text-white hover:bg-white hover:text-blue-500'>Exportar</Button>
                    </div>
        </form>
    )
}

