import { useSelector } from "react-redux"
import { Link, Routes, Route } from "react-router-dom"

export default function privateRoute({children, ...rest}){

    const login = useSelector(state=> state);

    return(
        <Routes>
            <Route {...rest} render={({location})=>{
                login ? (children) : <Link to={'/'}/>
            }}>

            </Route>
        </Routes>
    )
}