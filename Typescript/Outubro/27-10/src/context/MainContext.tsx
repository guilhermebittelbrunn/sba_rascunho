import { createContext, useState, PropsWithChildren } from "react";

interface IMaincontext{
    count: number,
    setCount: (number:number)=>void
}


export const MainContext = createContext<IMaincontext>({} as IMaincontext);

export default function MainProvider({children}:PropsWithChildren){
    const [count,setCount] = useState<number>(0)

    return(
        <MainContext.Provider value={{count, setCount}}>
            {children}
        </MainContext.Provider>
    )
}