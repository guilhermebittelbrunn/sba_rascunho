import { useEffect } from "react";

export default function ErrorModal({error}){

    useEffect(()=>{
        console.log(error)
    },[error])

    return(
        <div className="w-3/5 bg-slate-100 border-[1px] rounded-sm border-red-600 text-lg flex flex-col justify-center items-center p-4 gap-4">
            <h3 className="font-semibold text-red-600">Menssagem de erro</h3>
            <p>
                {`Erro ocorrido: ${error == "TypeError: Cannot read properties of undefined (reading 'geometry')" ? 
                    "Nenhum registro encontrado" 
                    : 
                    'Verifique o código informado'}`
                }
            </p>
        </div>
    )
}