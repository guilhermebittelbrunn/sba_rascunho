import { useState, useEffect } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { Input, DatePicker, message, Checkbox } from "antd";
import { CalendarOutlined } from '@ant-design/icons'


// eslint-disable-next-line react/prop-types
export default function InputDate({initialDate, type, field, isLoading}){
    const dateFormat = 'DD/MM/YYYY';
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(initialDate);
    const [inputValue, setInputValue] = useState(dayjs(initialDate, dateFormat).format(dateFormat));
    // console.log()

    function handleClickDataPicker(e){
        setDate(dayjs(e['$d']));
    } 
    function handleInputChange(e){
        setDate('');
        // console.log('newDate', date)
        const text = e.target.value
        if(text[text.length - 1] !== 't' && text[text.length - 1] !== '+' && text[text.length - 1] !== '-') setInputValue(e.target.value)
    }
    function handleBlurInput(e){

        const dateM =  moment(inputValue, dateFormat).format(dateFormat);
        const date =  dayjs(dateM, 'DD/MM/YYYY', true);

        if(date.isValid())return setDate(date);
        return message.error('Data inválida')
    }
    function pressKeyTonInput(e){
        const {key} = e;
        switch (key){
            case 't':
                setInputValue(dayjs().format('DD/MM/YYYY'))
                break
            case '+':
                const datePlus = moment(inputValue, 'DD/MM/YYYY').add(1, 'day');
                datePlus.isValid() && setInputValue(datePlus.format('DD/MM/YYYY'));
                // setDate(dayjs(inputValue, 'DD/MM/YYYY'));
                break
            case '-':
                const dateMinus = moment(inputValue, 'DD/MM/YYYY').add(-1, 'day');
                dateMinus.isValid() && setInputValue(dateMinus.format('DD/MM/YYYY'));
                break
        }
    }

    useEffect(()=>{
        const date1 = new Date(date);
        const date2 = new Date();
        if(type === 'start'){
            date1 > date2 && message.error('Data inicial maior que a data atual');
            field.onChange(date)
        } 
        if(type !== 'start')field.onChange(date);
    },[date])


    return(
        <div className={`flex gap-1 ${isLoading && 'cursor-not-allowed'}`}>  

            <Input disabled={isLoading} dsize="middle" defaultValue={date ? dayjs(date, dateFormat).format(dateFormat) : inputValue } className="w-48 rounded-none max-md:w-[400px]" onChange={(e)=>{handleInputChange(e);}} value={date ? dayjs(date, dateFormat).format(dateFormat) : inputValue } onKeyDown={pressKeyTonInput} onBlur={handleBlurInput}/>
            <DatePicker
                disabled={isLoading}
                open={!isLoading && open}
                style={{ visibility: "hidden", width: 0, marginRight: '-28px'}}
                onOpenChange={(open) => {setOpen(open)}}
                onChange={(v)=>{handleClickDataPicker(v)}}
                // onChange={(v)=>{setDate(v)}}
                value={date}
                // defaultValue={initialDate}
            />
   
            <button className={`py-[3px] px-2 m outline-blue-700 text-blue-600 border-[1px] border-blue-600 ${isLoading && 'cursor-not-allowed'}`} onClick={() =>{!isLoading && setOpen(!open)}}><CalendarOutlined/></button>
        </div>


    )
}