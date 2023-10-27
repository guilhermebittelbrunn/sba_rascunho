import React from 'react'

type Props = {
    setCount: React.Dispatch<React.SetStateAction<number>>
}

export default function HeaderChildren({setCount}: Props) {
    
    function handleClick(){
        setCount(0);
    }
  
    return (
        <button onClick={handleClick}>reset</button>
    )
}