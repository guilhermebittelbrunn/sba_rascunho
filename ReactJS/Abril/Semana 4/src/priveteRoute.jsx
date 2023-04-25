import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({children}){

    const login = useSelector(state=> state);
  

    return login === 'login' ? children : <Navigate to={'/'}/>
}