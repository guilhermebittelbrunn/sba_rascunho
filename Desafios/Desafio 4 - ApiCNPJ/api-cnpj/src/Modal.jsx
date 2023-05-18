import { useEffect, useState } from "react"
import useFetch from "./hooks/useFetch"

export default function Modal({cnpj}){
    const [data, loading, error] = useFetch(cnpj)
    const [list, setList] = useState([]);
    // console.log(data);
    useEffect(()=>{
        for(let key in data){
            setList((preventValue)=>{
                return [...preventValue, [key, data[key]]]
            })
        }
    }, [data])

    console.log(list);

    return(
        <>
            <section className="bg-red-200 flex absolute justify-center items-center ">
                {loading ? 
                <div className="w-12 h-12 rounded-full border-4 border-white border-t-black animate-spin 
                "/> 
                :
                <div className="w-full p-4">
                    {
                    <ul>
                        {list.map((item, k)=>{
                            console.log(item);
                            return (
                                <li className="text-start" key={k}>
                                    {(item[0] != 'socios' && item[0] != 'estabelecimento') &&  <Card data={item}/>}
                                    {(item[0] != 'socios' && item[0] != 'estabelecimento') ||  <Detail data={item}/>}
                                </li>)
                        })}
                    </ul>
                    }
                
                </div>
                }
            </section>
        </>
    )
}


function Card({data}){
    return(
        <div id="card" className="flex justify-between p-1 bg-blue-400 mt-2">
          <div id="card-header">
            {data[0]}
          </div>
          <div id="card-body">
            {JSON.stringify(data[1])}
          </div>
        </div>
    )
}

function Detail({data}){
    return(
        <>
            <details> 
                <summary>{data[0]}</summary>
                <div id="Content-info"> 
                <h3> 
                    {
                        data[0] == 'socios' ?
                            data[1].map((socio)=>{
                                // console.log(socio);
                                return <SubDetail dado={socio}/>
                            })
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
        console.log(dado);
        return(
            <>
                <details className="ml-4"> 
                    <summary>{dado.nome || 'informações detalhadas'}</summary>
                    <div id="Content-info"> 
                      {<Teste info={dado}/>}
                      
                    </div>
                </details>
            </>
        )
} 

function Teste({info}){
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
                    console.log(item);
                    return(
                        <li className="flex justify-between m-2 p-2 bg-blue-300" key={item[0]}>
                            <div>{item[0]}</div>
                            <div>{JSON.stringify(item[1])}</div>
                        </li>)
                })}

            </ul>
        </>
    )
}