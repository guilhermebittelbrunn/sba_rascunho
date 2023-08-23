import { createContext, useState } from "react";

export const CountContext =  createContext();


export default function CountProvider({children}){
    const [count, setCount] = useState(10);

    return(
        <CountContext.Provider value={{count, setCount}}>
            {children}
        </CountContext.Provider>
    )
} 