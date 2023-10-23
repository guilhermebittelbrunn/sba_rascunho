import dayjs from "dayjs";
import moment from "moment";
import { useState, useEffect } from "react";
import { Input, DatePicker, message } from "antd";
import { CalendarOutlined } from '@ant-design/icons'

export default function InputDate({initialDate, field, isLoading, className, isStartDate}){
    const dateFormat = 'DD/MM/YYYY';
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(initialDate || dayjs().add(-1, 'y'));
    const [inputValue, setInputValue] = useState(dayjs(initialDate, dateFormat).format(dateFormat));

    function handleChangeDataPicker(e){
        setDate(dayjs(e));
    } 

    function handleInputChange(e){
        setDate('');
        setInputValue(e.target.value)
    }

    function handleClickDateBox(e){
        const { pointerType } = e.nativeEvent 
        if(pointerType === 'mouse'){
            setOpen(pv=>!pv)
        }
    }

    function handleBlurInput(e){
        const dateM =  moment(inputValue, dateFormat).format(dateFormat);
        const date =  dayjs(dateM, 'DD/MM/YYYY', true);

        if(!date.isValid()){
            return message.error('Data inválida')
        }
        setDate(date);
    }

    useEffect(()=>{
        if(isStartDate){ 
            const currentDate = new Date();
            new Date(date) > currentDate && message.error('Data inicial maior que a data atual');
        }
        field.onChange(date);
    },[date])

    return(
        <div className={`flex gap-1 ${isLoading && 'cursor-not-allowed'}`}>  

            <Input 
                disabled={isLoading} defaultValue={date ? dayjs(date, dateFormat).format(dateFormat) : inputValue }
                className={`w-48 rounded-none max-md:w-[400px] ${className}`} onChange={handleInputChange} 
                value={date ? dayjs(date, dateFormat).format(dateFormat) : inputValue }
                onBlur={(e)=>{handleBlurInput(e)}}
            />
            <DatePicker
                disabled={isLoading}
                placement="bottomRight"
                open={open}
                style={{ visibility: "hidden", width: 0, marginRight: '-28px'}}
                onOpenChange={(open) => {setOpen(open)}}
                onChange={(v)=>{handleChangeDataPicker(v)}}
                value={date}
            />
   
            <button type="button" id="datePicker" className={`py-[3px] px-2 m outline-blue-700 text-blue-600 border-[1px] border-blue-600 ${isLoading && 'cursor-not-allowed'}`} onClick={handleClickDateBox}>
                <CalendarOutlined />
            </button>
        
        </div>
    )
}