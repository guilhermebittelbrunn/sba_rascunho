import React, { useEffect, useContext } from 'react';
import { Input, Space, AutoComplete, message } from 'antd';
import InputDate from '../components/InputDate';
import dayjs from "dayjs";
import { FormContext } from '../contexts/FormContext';
const { Search } = Input;


export default function Form({onSearch}){
    const {register, handleSubmit, Controller, control} = useContext(FormContext);
    const currentDate = new Date();
    

    return(
        <header>
        <form className="flex gap-4 justify-center items-center max-md:flex-col max-md:gap-1">
          <div className="flex flex-col"> 
            <h3 className="text-sm font-semibold">Data inicial</h3>
            <Controller
              render={({field})=>{
                return <InputDate initialDate={dayjs(currentDate).add(-1, 'y')} type={"start"} field={field}/>
              }}
              name="dateStart"
              control={control}
            >
            </Controller>
          </div>
          <div className="flex flex-col"> 
            <h3 className="text-sm font-semibold">Data final</h3>
            <Controller
              render={({field})=>{
                return <InputDate initialDate={dayjs(currentDate)}  field={field}/>
              }}
              name='dateEnd'
              control={control}
            
            />
          </div>
          <div className="flex flex-col"> 
            <h3 className="text-sm font-semibold">Representante</h3>
            <Controller
                render={({field, fieldSet})=>{
                    //    <Input/>
                    return <Search {...field} size="middle" placeholder='Código do representante' name='rc' onChange={(e)=>{field.onChange(e.target.value)}} onSearch={handleSubmit(onSearch)} maxLength={4} minLength={4} allowClear={false} className="w-[240px] outline-none max-md:w-[440px]"/>
                }}
                name="rc"
                control={control}
                > 
            </Controller>
          </div>
        </form>
      </header>
    )
}


// export function CustomSeacrh(placeholder){
//     return(
//         <>
//             <Search size="middle" placeholder='312321312' value={3} maxLength={4} minLength={4} allowClear={false} className="w-[240px] outline-none max-md:w-[440px]"/>
//         </>
//     )
// }