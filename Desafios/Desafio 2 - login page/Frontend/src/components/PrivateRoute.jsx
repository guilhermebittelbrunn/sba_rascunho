import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const isLog = useSelector(login => login);
    return isLog.status ? children : <Navigate to={'/login'}/> 
}