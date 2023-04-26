import { useState, useEffect } from "react";
import axios from 'axios';

export default function useFetch(url){
    const [info, setInfo] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    async function FetchPokemon(url) {
        setIsLoading((preventValue)=>{
            !preventValue
        });
        try{
            const {data} = await axios.get(url);
            setInfo(()=>{
                return data
            });
        }catch(error){
            setError((preventValue)=>{
                return !preventValue
            });
        }finally{
            setIsLoading((preventValue)=>{
            !preventValue
        });  
        }
    }

    useEffect(()=>{
        FetchPokemon(url)
      
    },[url]);


    return{info, isLoading, error}

}