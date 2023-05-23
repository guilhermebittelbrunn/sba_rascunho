import { useState, useEffect } from "react";
import axios from "axios"

export default function useFetch(cnpj){
    const [info,setInfo] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);


    useEffect(()=>{
        (async()=>{
            setLoading(true);
            try{

                const url = `https://publica.cnpj.ws/cnpj/${cnpj}`
                await axios(url, {
                    method: 'GET',
                    //mode: 'no-cors',
                    headers: {
                        //'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    //withCredentials: true,
                    //credentials: 'same-origin',
                    }).then(response => {
                        setInfo(response.data)
                    })
                setLoading(false);
      
            }catch(err){
                setLoading(false)
                setError(err);
            }
        })()
    }, [cnpj])

    return [info, loading, error]
}

