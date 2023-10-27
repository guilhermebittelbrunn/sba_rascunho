import React, {createContext, useState, PropsWithChildren} from 'react'


interface IMainContext{
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}


export const MainContext = createContext<IMainContext>({} as IMainContext);


export default function MainProvider({children}:PropsWithChildren){
    const [count, setCount] = useState<number>(0);
    
    return(
        <MainContext.Provider value={{count, setCount}}>
            {children}
        </MainContext.Provider>
    )
}

