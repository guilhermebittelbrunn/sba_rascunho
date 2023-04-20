import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export default function Header(){
    return(
        <>
            <h4>Contagem atual: {useSelector((state)=>{
                return state
            })}</h4>
        </>
    )
}

