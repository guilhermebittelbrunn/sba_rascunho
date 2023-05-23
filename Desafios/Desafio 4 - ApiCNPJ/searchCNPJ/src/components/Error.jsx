import {CloseOutlined} from '@ant-design/icons'
import { Button } from 'antd';
import { useState, useEffect } from 'react';

export default function Error({cnpj, setModal, error}){
    // const error = {response: {status: 429}}
    const [errorMessage, setErrorMessage] = useState('error');

    useEffect(()=>{
        switch(error?.response?.status){
            case 404:
                console.log(404);
                setErrorMessage('Cnpj não registrado na receita federal, verique se o código informado foi digitado corretamente.');
                break
            case 429:
                console.log(429);
                setErrorMessage('Muitas requisições simultâneas, o limite da aplicação é de 3 consultas por minuto, aguarde um pouco e tente novamente.');
                break
            default:
                setErrorMessage(error);
            
        }
    }, [error])

    return(
        <section className='flex flex-col items-center mt-8 md:mt-16'>
            <div className=" text-center  gap-2 bg-red-500 text-slate-50 max-w-[500px] w-11/12 z-0 p-4 m-auto shadow-md shadow-gray-700 relative">
                <h1 className="font-bold">CNPJ BUSCADO: {cnpj}</h1>
                <CloseOutlined className="absolute right-4 scale-110 top-4 transition-all hover:scale-125 hover:cursor-pointer" onClick={()=>{setModal(false)}}/>
                <div id='error_contant' className='flex flex-col items-center gap-2'>
                    <h2 className='mt-4 font-semibold uppercase'>Erro: {JSON.stringify(error?.response?.status)}</h2>
                    <p className='max-w-[80%] text-justify'>
                        {JSON.stringify(errorMessage)}
                    </p>
                </div>
            </div>
              <Button type="primary" className='bg-blue-600 max-w-[600px] w-3/5 my-4 uppercase font-bold h-10' onClick={()=>{setModal(false)}}>Buscar outro cnpj</Button>
        </section>
    )
}