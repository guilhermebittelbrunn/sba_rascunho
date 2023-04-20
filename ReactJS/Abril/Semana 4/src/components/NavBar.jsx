import styled from "styled-components"
import { Link } from "react-router-dom"

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
        padding: 6px 6px;
        margin: 0;
        background-color: black;
        color: white;
    `

    

export default function NavBar(){
  
    return(
    <Nav_styled>
        <h3>Logo</h3>
        <Ul_styled>
            <li><Link to="/">Home</Link></li>    
            <li><Link to="/about">About</Link></li>    
            <li><Link to="/products">Products</Link></li>    
        </Ul_styled>
    </Nav_styled>
    )
}