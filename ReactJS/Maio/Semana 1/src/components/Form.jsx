import { useEffect, useState , useRef} from "react";
import { useParams, useLocation, Link } from "react-router-dom"
import { useForm } from "react-hook-form";

export default function Form(){
    const {id} = useParams();
    const [text,setText] = useState({});
    const count = useRef(0);
    const {register, handleSubmit} = useForm();
    
    const handleChange = (e)=>{
       setText((preventValue)=>{
        return {...preventValue, [e.target.name] : e.target.value}
       })
    }

    const addUser = (data) => console.log(data, text);

    useEffect(()=>{
        console.log(text);
    }, [text])


    return(
        <>
            <form onSubmit={handleSubmit(addUser)}>
                <h3>{id ? 'Update' : 'Create'}</h3>
                <input type="text" name="name" id="name" placeholder="name" value={id} {...register('name')} onChange={handleChange} />
                <input type="password" name="password" id="password" placeholder="password" {...register('password')} onChange={handleChange} />
                <button> Send</button>
            </form>
            <Link to={'/'}>Go to home</Link>
        </>
    )
}