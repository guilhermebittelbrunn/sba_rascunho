import { createContext, useState } from "react";
import { useForm, Controller } from 'react-hook-form'


export const FormContext = createContext();


export default function FormProvider({children}){
    const {register, handleSubmit, formState:{errors}, control} = useForm();


    return (
        <FormContext.Provider value={{register, handleSubmit, Controller, control}}>
            {children}
        </FormContext.Provider>
    )
}

