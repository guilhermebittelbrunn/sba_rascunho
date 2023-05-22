import SubDetail from "./Subdetails"

export default function Detail({data}){
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
                            <div className="flex justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 uppercase font-semibold text-red-600 text-sm">Sem registro</div>
                        :              
                            <SubDetail dado={data[1]} type={data[0]}/>
                    }
                </h3> 
                </div>
            </details>  
        </>
    )
}
