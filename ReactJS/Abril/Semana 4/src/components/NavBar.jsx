import styled from "styled-components"
import { Link, useMatch, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

 const Ul_styled = styled.ul`
        display: flex;
        list-style: none;
        gap: 12px;
      
    `

  const Nav_styled = styled.nav`
        box-sizing: border-box;
        width: 100%;
        display: Flex;
        align-items: Center;
        justify-content: space-between;
        padding: 6px 24px;
        margin: 0;
        background-color: black;
        color: white;
    `

    

export default function NavBar(){

    

    return(
    <Nav_styled>
        <h3>Logo</h3>
        <Ul_styled>
            <li><Login/></li>
            <li><Link to="/">Home</Link></li>    
            <li><button onClick={()=>{<Navigate to='/about'/>}}>About</button></li>    
            <li><Link to="/products">Products</Link></li>
            <li><Link to='/contacts'>Contacts</Link></li>    
        </Ul_styled>
    </Nav_styled>
    )
}

function Login(){
    const login = useSelector((state)=>{
        return state
    })
    const dispatch = useDispatch();

    return (
        <>
            <button onClick={()=>{
                (login === "login" && dispatch({type: 'LOGOUT'})) || dispatch({type:'LOGIN'})
            }}>{login === "login"? "Log-out" : "Log-in"}</button>
        </>
    )
}