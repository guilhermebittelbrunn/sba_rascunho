import { useState, useEffect } from "react";
import axios from 'axios';

export default function useFetch(id){
    const [info, setInfo] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    async function FetchPokemon(id) {
        setIsLoading((preventValue)=>{
            !preventValue
        });
        try{
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
        FetchPokemon(id)
      
    },[id]);


    return{info, isLoading, error}

}