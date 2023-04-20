import styled from "styled-components"

const FooterStyle = styled.footer`
        width: 100%;
        padding: 2vh 12px;
        background-color: black;
        color: white;
        position: absolute;
        left: 0%;
        bottom: 0;
    `


export default function Footer(){
    
    return (
        <>
            <FooterStyle>
                Footer section
            </FooterStyle>
        </>
    )
}