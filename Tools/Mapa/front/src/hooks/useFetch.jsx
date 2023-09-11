import { useEffect,useState } from "react";
import axios from 'axios';

export default function useFetch(url){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true)
        const res = await axios.get(url);
        // console.log(res)
        setData(res.data);
      }catch(err){
        setError(err)
      }finally{
        setLoading(false)
      }
    })()

    
  }, [url])

    return {loading, err:error, data}

}