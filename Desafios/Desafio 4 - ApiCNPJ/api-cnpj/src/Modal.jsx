import moment from "moment/moment"
import useFetch from "./hooks/useFetch"
import { useEffect, useState } from "react"
import {CloseOutlined} from '@ant-design/icons'
import { Button } from 'antd';


export default function Modal({cnpj, setModal}){
    const [data, loading, error] = useFetch(cnpj)
    const [list, setList] = useState([]);
    // console.log(data);
    useEffect(()=>{
        if(data.length != 0){
    
            let cleanData = {
                razao_social: data.razao_social,
                cnpj_raiz: data.cnpj_raiz,
                atualizado_em: moment(data.atualizado_em).format('DD/MM/YYYY'),
                responsavel_federativo: data.responsavel_federativo,
                porte: data.porte?.descricao,
                natureza_juridica: data.natureza_juridica?.descricao,
                qualificação_do_responsável: data.qualificacao_do_responsavel?.descricao,
                capital_social: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.capital_social),
                socios: data.socios,
                estabelecimento: data.estabelecimento,
                simples: data.simples
            }
            console.log('5-', cleanData);
            console.table(data.simples)
            for(let key in cleanData){
                setList((preventValue)=>{
                    return [...preventValue, [key, cleanData[key]]]
                })
            }
        }
    }, [data])

    console.log(list);

    return(
        <>
            <section className="flex flex-col py-2 lg:mt-16">
                {loading ? 
                <div className="w-12 h-12 rounded-full m-auto border-4 mt-24 border-white border-t-black animate-spin 
                "/> 
                :
                <div>
            
                    <div className="bg-white max-w-[800px] w-11/12 z-0 p-4 m-auto shadow-md shadow-gray-700 relative">
                        <h1 className="font-bold text-gray-700">CNPJ BUSCADO: {cnpj}</h1>
                        <CloseOutlined className="absolute right-4 top-4 transition-all hover:scale-125 hover:cursor-pointer" onClick={()=>{setModal(false)}}/>
                            <ul className="mt-6">
                                {list.map((item, k)=>{
                                    console.log(item);
                                    return (
                                        <li className="text-start" key={k}>
                                            {(item[0] != 'socios' && item[0] != 'estabelecimento') &&  <Card data={item}/>}
                                            {(item[0] != 'socios' && item[0] != 'estabelecimento') ||  <Detail data={item}/>}
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


function Card({data}){
    return(
        <div id="card" className="w-full flex flex-col justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 md:flex-row">
          <div id="card-header">
            <h3 className="uppercase font-semibold text-sm">{String(data[0]).replace(/_/g, ' ')}</h3>
          </div>
          <div id="card-body">
            <p className="text-sm text-right">{data[1] ? JSON.stringify(data[1]).replace(/"/g, '') : 'Sem registro'}</p>
          </div>
        </div>
    )
}

function Detail({data}){
    console.log('7-', data);
    return(
        <>
            <details className="overflow-clip"> 
                <summary className="py-2 uppercase font-semibold hover:bg-slate-100 transition-all hover:cursor-pointer text-sm">{data[0]}</summary>
                <div id="Content-info"> 
                <h3> 
                    {
                        data[0] == 'socios' ?
                            data[1].length > 0 ? 
                            data[1].map((socio,k )=>{
                                return <SubDetail dado={socio} key={k}/>
                            })
                            :
                            <div className="flex justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 uppercase font-semibold text-red-600">Sem registro</div>
                        :              
                            <SubDetail dado={data[1]} type={data[0]}/>
                    }
                </h3> 
                </div>
            </details>  
        </>
    )
}

function SubDetail({dado, type}){
        console.log('6-', type);
        console.log('2-', dado);
        return(
            <>
                <details className="ml-4"> 
                    <summary className="py-2 uppercase font-semibold hover:bg-slate-100 transition-all hover:cursor-pointer text-sm">{dado.nome || 'informações detalhadas'}</summary>
                    <div id="Content-info"> 
                      {type != 'estabelecimento' ? <SocioDetail info={dado}/> : <EstabelecimentoDetail info={dado}/>}
                    </div>
                </details>
            </>
        )
} 

function SocioDetail({info}){
    const [arr,setArr] = useState([]);
    console.log('8-', info);

    useEffect(()=>{
        let cleanInfo = {
            cpf_cnpj_socio: info.cpf_cnpj_socio,
            nome: info.nome,
            tipo: info.tipo,
            data_entrada: moment(info.data_entrada).format('DD/MM/YYYY'),
            cpf_representante_legal: info.cpf_representante_legal,
            faixa_etaria: info.faixa_etaria,
            atualizado_em: moment(info.atualizado_em).format('DD/MM/YYYY'),
            qualificação_sócio: info.qualificacao_socio.descricao,
            pais: info.pais.nome
        }
       for(let key in cleanInfo){
            setArr((preventValue)=>{
                return [...preventValue, [key, cleanInfo[key]]]
            })
       }
       console.log(arr);
    }, [info])

    return(
        <>
            <ul>
                {arr.map(item=>{
                    console.log('3-', item);
                    return(
                        <li className="flex flex-col justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 text-sm" key={item[0]}>
                            <div className="uppercase font-semibold">{String(item[0]).replace(/_/g, ' ')}</div>
                            <div>{item[1]  ? JSON.stringify(item[1]).replace(/"/g, '') : 'Sem registro'.replace(/"/g, '')}</div>
                        </li>)
                })}
            </ul>
        </>
    )
}
function EstabelecimentoDetail({info}){
    const [arr,setArr] = useState([]);

    useEffect(()=>{
        let cleanInfo = {
            cnpj : info.cnpj,
            atividade_principal: info.atividade_principal?.descricao,
            atividades_secundárias : info.atividades_secundarias.descricao || 'Sem registro',
            cnpj_raiz: info.cnpj_raiz,
            cnpj_ordem: info.cnpj_ordem,
            cnpj_digito_verificador: info.cnpj_digito_verificador,
            tipo: info.tipo,
            nome_fantasia: info.nome_fantasia,
            situação_cadastral: info.situacao_cadastral,
            motivo_situacao_cadastral: info.motivo_situacao_cadastral?.descricao ?? 'Sem registro',
            data_situação_cadastral: moment(info.data_situacao_cadastral).format('DD/MM/YYYY'),
            data_inicio_atividade: moment(info.data_inicio_atividade).format('DD/MM/YYYY'),
            pais: info.pais.nome,
            estado: info.estado,
            cidade: info.nome_cidade,
            bairro: info.bairro,
            logradouro: `${info.tipo_logradouro} ${info.logradouro}`,
            numero: info.numero,
            cep: info.cep,
            telefone_1: `${info['DDD1'] ?? 'Sem'} ${info.telefone1 ?? 'registro'}`,
            telefone_2: `${info['DDD2'] ?? 'Sem'} ${info.telefone2 ?? 'registro'}`,
            email: info.email,
            situacao_especial: info.situacao_especial,
            data_situação_especial: info.data_situacao_especial,
            atualizado_em: moment(info.atualizado_em).format('DD/MM/YYYY'),
            atividade_principal: info.atividade_principal?.descricao,
            estado: `${info.estado.sigla} ${info.estado.nome}`,
            inscrição_estadual: `Número: ${info.inscricoes_estaduais[0].inscricao_estadual ?? 'Não possui'}, situação: ${info.inscricoes_estaduais[0].ativo ? 'Ativo' : 'Inativo'}, Atualizado em: ${moment(info.inscricoes_estaduais.atualizado_em).format('DD/MM/YYYY')}`
            

        }
       for(let key in cleanInfo){
            setArr((preventValue)=>{
                return [...preventValue, [key, cleanInfo[key]]]
            })
       }
       console.log(arr);
    }, [info])

    return(
        <>
            <ul>
                {arr.map(item=>{
                    console.log('3-', item);
                    return(
                        <li className="flex flex-col justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 text-sm" key={item[0]}>
                            <div className="uppercase font-semibold">{String(item[0]).replace(/_/g, ' ')}</div>
                            <div>{item[1]  ? JSON.stringify(item[1]).replace(/"/g, '') : 'Sem registro'.replace(/"/g, '')}</div>
                        </li>)
                })}
            </ul>
        </>
    )
}