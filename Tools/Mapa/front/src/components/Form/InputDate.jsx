import dayjs from "dayjs";
import moment from "moment";
import { useState, useEffect } from "react";
import { Input, DatePicker, message } from "antd";
import { CalendarOutlined } from '@ant-design/icons'


export default function InputDate({initialDate, type, field, isLoading, className}){
    const dateFormat = 'DD/MM/YYYY';
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(initialDate);
    const [inputValue, setInputValue] = useState(dayjs(initialDate, dateFormat).format(dateFormat));

    function handleClickDataPicker(e){
        setDate(dayjs(e['$d']));
    } 

    function handleInputChange(e){
        setDate('');
        setInputValue(e.target.value)
    }

    function handleBlurInput(){

        const dateM =  moment(inputValue, dateFormat).format(dateFormat);
        const date =  dayjs(dateM, 'DD/MM/YYYY', true);

        if(date.isValid()){
            return setDate(date);
        }
        return message.error('Data inválida')
    }

    useEffect(()=>{
        const date1 = new Date(date);
        const date2 = new Date();
        if(type === 'start'){
            date1 > date2 && message.error('Data inicial maior que a data atual');
            field.onChange(date)
        } 
        if(type !== 'start') field.onChange(date);
    },[date])


    return(
        <div className={`flex gap-1 ${isLoading && 'cursor-not-allowed'}`}>  

            <Input 
                disabled={isLoading} dsize="middle" defaultValue={date ? dayjs(date, dateFormat).format(dateFormat) : inputValue }
                className={`w-48 rounded-none max-md:w-[400px] ${className}`} onChange={(e)=>{handleInputChange(e);}} 
                value={date ? dayjs(date, dateFormat).format(dateFormat) : inputValue }
                onBlur={handleBlurInput}
            />
            <DatePicker
                disabled={isLoading}
                placement="bottomRight"
                open={!isLoading && open}
                style={{ visibility: "hidden", width: 0, marginRight: '-28px'}}
                onOpenChange={(open) => {setOpen(open)}}
                onChange={(v)=>{handleClickDataPicker(v)}}
                value={date}
            />
   
            <button className={`py-[3px] px-2 m outline-blue-700 text-blue-600 border-[1px] border-blue-600 ${isLoading && 'cursor-not-allowed'}`} onClick={()=>{setOpen(pv=>!pv)}}>
                <CalendarOutlined/>
            </button>
        
        </div>
    )
}