import { useState, useEffect } from "react";
import axios from "axios"

export default function useFetch(cnpj){
    const [info,setInfo] = useState('');
    const [loading,setLoading] = useState('');
    const [error,setError] = useState('');


    useEffect(()=>{
        (async()=>{
            setLoading(true);
            try{
                const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
                setLoading(false)
                setInfo(data);
            }catch(err){
                setError(err);
            }
        })()
    }, [cnpj])

    return [info, loading, error]
}