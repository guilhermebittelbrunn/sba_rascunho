import dayjs from "dayjs";
import { useForm, Controller } from 'react-hook-form'
import Search from 'antd/es/input/Search';
import InputDate from './InputDate';

export default function Form({onSearch, isLoading}){

    const {handleSubmit, control} = useForm();
    
    return(
          <form onSubmit={(e)=>{e.preventDefault()}} className={`flex gap-4 justify-center items-center max-md:flex-col max-md:gap-1 ${isLoading && 'opacity-60'}`}>
            
              <div className="flex flex-col"> 
                <h3 className="text-sm font-semibold">Data inicial</h3>
                <Controller
                  render={({field})=>{
                    return <InputDate isLoading={isLoading} initialDate={dayjs().add(-1, 'y')} type={"start"} field={field}/>
                  }}
                  name="dateStart"
                  control={control}
                />
              </div>

              <div className="flex flex-col"> 
                <h3 className="text-sm font-semibold">Data final</h3>
                <Controller
                  render={({field})=>{
                    return <InputDate isLoading={isLoading} initialDate={dayjs()}  field={field}/>
                  }}
                  name='dateEnd'
                  control={control}
                />
              </div>

              <div className="flex flex-col"> 
                <h3 className="text-sm font-semibold">Representante</h3>
                <Controller
                    render={({field, fieldState})=>{
                      return <Search disabled={isLoading} {...field} size="middle" required={true} placeholder='Código do representante' name='rc' onChange={(e)=>{field.onChange(e.target.value)}} onSearch={handleSubmit(onSearch)} maxLength={4} minLength={4} allowClear={false} className="w-[240px] outline-none max-md:w-[440px]"/>
                    }}
                    name="rc"
                    control={control}
                    rules={{maxLength: 4, minLength: 4, required:true}}
                /> 
              </div>

          </form>
    )
}

