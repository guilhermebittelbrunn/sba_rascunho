import { useEffect, useState } from "react"
import useFetch from "./hooks/useFetch"
import {CloseOutlined} from '@ant-design/icons'
import moment from "moment/moment"

export default function Modal({cnpj, setModal}){
    const [data, loading, error] = useFetch(cnpj)
    const [list, setList] = useState([]);
    // console.log(data);
    useEffect(()=>{

        const {atualizado_em, ...rest} = data
        let cleanData = {
            rest,
            atualizado_em: moment(atualizado_em).format('DD/MM/YYYY'),
            porte: rest.porte?.descricao,
            natureza_juridica: rest.natureza_juridica?.descricao
        }
        console.log('5-', cleanData);
        for(let key in data){
            setList((preventValue)=>{
                return [...preventValue, [key, data[key]]]
            })
        }
    }, [data])

    console.log(list);

    return(
        <>
            <section className=" flex absolute justify-center items-center py-2">
                {loading ? 
                <div className="w-12 h-12 rounded-full border-4 border-white border-t-black animate-spin 
                "/> 
                :
                <div className="w-full bg-white p-4 mx-4 shadow-md shadow-gray-700">
                    
                    <CloseOutlined className="absolute right-8 top-6 transition-all hover:scale-125 hover:cursor-pointer" onClick={()=>{setModal(false)}}/>
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
                }
            </section>
        </>
    )
}


function Card({data}){
    return(
        <div id="card" className="flex justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 mx-4">
          <div id="card-header">
            <h3 className="uppercase font-semibold">{String(data[0]).replace('_', ' ')}</h3>
          </div>
          <div id="card-body">
            {data[1] ? JSON.stringify(data[1]) : 'Sem registro'}
            {/* {data[1] ? JSON.stringify(data[1]).replace(/[^a-zA-Z0-9 ]/g, ' ') : 'Sem registro'} */}
          </div>
        </div>
    )
}

function Detail({data}){
    return(
        <>
            <details className="mx-4"> 
                <summary className="py-2 uppercase font-semibold hover:bg-slate-100 transition-all hover:cursor-pointer">{data[0]}</summary>
                <div id="Content-info"> 
                <h3> 
                    {
                        data[0] == 'socios' ?
                            data[1].length > 0 ? 
                            data[1].map((socio)=>{
                                return <SubDetail dado={socio}/>
                            })
                            :
                            <div className="flex justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 mx-4 uppercase font-semibold text-red-600">Sem registro</div>
                        :              
                            <SubDetail dado={data[1]}/>
                    }
                </h3> 
                </div>
            </details>  
        </>
    )
}

function SubDetail({dado}){
        console.log('2-', dado);
        return(
            <>
                <details className="ml-4"> 
                    <summary className="py-2 uppercase font-semibold hover:bg-slate-100 transition-all hover:cursor-pointer">{dado.nome || 'informações detalhadas'}</summary>
                    <div id="Content-info"> 
                      {<CardsSubDetail info={dado}/> }
                    </div>
                </details>
            </>
        )
} 

function CardsSubDetail({info}){
    const [arr,setArr] = useState([]);

    useEffect(()=>{
       for(let key in info){
            setArr((preventValue)=>{
                return [...preventValue, [key, info[key]]]
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
                        <li className="flex justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 mx-4" key={item[0]}>
                            <div className="uppercase font-semibold">{item[0]}</div>
                            <div>{item[1] ? JSON.stringify(item[1]).replace(/"/g, '') : 'Sem registro'.replace(/"/g, '')}</div>
                        </li>)
                })}
            </ul>
        </>
    )
}