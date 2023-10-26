import React, {createContext, useState, PropsWithChildren} from 'react';

export interface IContextProps {
    user: IUser,
    setUser: (user:IUser)=>void,
    count: number,
    setCount: (number: number)=>void
}


interface IUser{
    name: string,
    age: number
}


export const Context = createContext<IContextProps | null>(null);

export default function ContextProvider ({children}:PropsWithChildren) {
    const [user, setUser] = useState<IUser>({name: 'Guilherme', age:17});
    const [count, setCount] = useState<number>(0);

    return (
        <Context.Provider value={{user, setUser, count, setCount}}>
            {children}
        </Context.Provider>
    );
}
