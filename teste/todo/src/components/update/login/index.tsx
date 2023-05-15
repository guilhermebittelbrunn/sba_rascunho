import { useState } from 'react'
import {Link} from 'react-router-dom'
import Register from '../register'
import Nav from '@/components/nav/nav'

export default function Login(){
    const [register, useRegister]  = useState(false)
    return(
        <>
             {/* <Nav/> */}
            <h1>Login page</h1>
            {/* <Link to={'/register'}>Register link</Link>
             <a href="/register">Register tag a</a>
            <div className='register'>
                {register? <Register/> : <button onClick={()=>{useRegister(!register)}}>Register</button>}

            </div> */}
        </>
    )
}