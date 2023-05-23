import moment from "moment/moment"
import useFetch from "../hooks/useFetch.jsx"
import { useEffect, useState } from "react"
import {CloseOutlined} from '@ant-design/icons'
import { Button } from 'antd';
import Card from "./Card";
import Detail from "./Details";
import Error from "./Error";

export default function Modal({cnpj, setModal}){
    const [data, loading, error] = useFetch(cnpj)
    const [list, setList] = useState([]);

    useEffect(()=>{
        if(data.length != 0){
            const cleanData = {
                razao_social: data.razao_social,
                cnpj_raiz: data.cnpj_raiz,
                atualizado_em: moment(data.atualizado_em).format('DD/MM/YYYY'),
                responsável_federativo: data.responsavel_federativo,
                porte: data.porte?.descricao,
                natureza_jurídica: data.natureza_juridica?.descricao,
                qualificação_do_responsável: data.qualificacao_do_responsavel?.descricao,
                capital_social: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.capital_social),
                simples: data.simples ? `Ativo: ${data.simples.simples}${data.simples.simples === 'Sim' ? `, data início: ${moment(data.simples.data_opcao_simples).format('DD/MM/YYYY')}, data exclusão: ${data.simples.data_exclusao_simples ? moment(data.simples.data_exclusao_simples).format('DD/MM/YYYY') : 'Sem data'}` : ''}` : 'Sem registro',
                mei: data.simples? `Ativo: ${data.simples.mei}${data.simples.mei === 'Sim' ? `, data início: ${moment(data.simples.data_opcao_mei).format('DD/MM/YYYY')}, data exclusão: ${data.simples.data_exclusao_mei ? moment(data.simples.data_exclusao_mei).format('DD/MM/YYYY') : 'Sem data'}` : ''}` : 'Sem registro',
                socios: data.socios,
                estabelecimento: data.estabelecimento,
            }
    
            for(let key in cleanData){
                setList((preventValue)=>[...preventValue, [key, cleanData[key]]])
            }
            console.log(error);
        }
    }, [data])

    return(
        <>
            <section className="flex flex-col py-2 lg:mt-16">
                {loading ? 
                <div className="w-12 h-12 rounded-full m-auto border-4 mt-24 border-white border-t-black animate-spin 
                "/> 
                :
                error ? 
                <Error cnpj={cnpj} error={error} setModal={setModal}/> : 
                    <div>
                        <div className="bg-white max-w-[800px] w-11/12 z-0 p-4 m-auto shadow-md shadow-gray-700 relative">
                            <h1 className="font-bold text-gray-700">CNPJ BUSCADO: {cnpj}</h1>
                            <CloseOutlined className="absolute right-4 top-4 transition-all hover:scale-125 hover:cursor-pointer" onClick={()=>{setModal(false)}}/>
                                <ul className="mt-6">
                                    {list.map((item, k)=>{
                                        return (
                                            <li className="text-start" key={k}>
                                                {k < 10 ? <Card data={item}/> : <Detail data={item}/>}
                                            </li>)
                                    })}
                                </ul>
                        </div>
                        <Button type="primary" className='bg-blue-600 w-3/5 my-4 uppercase font-semibold h-10' onClick={()=>{setModal(false)}}>Buscar outro cnpj</Button>
                    </div>
                    }
                
            </section>
        </>
    )
}
