import { Input, DatePicker, message, Checkbox } from "antd";
import { CalendarOutlined } from '@ant-design/icons'
import { useState, useEffect } from "react";
import moment from "moment";

// eslint-disable-next-line react/prop-types
export default function InputDate({initialDate}){
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(initialDate)


    function handleClickDataPicker(e){
        setDate(`${String(e['$D']).padStart(2,0)}/${String(+e['$M'] + 1).padStart(2,0)}/${e['$y']}`);
    } 
    function handleInputChange(e){
        const text = e.target.value
        text[text.length - 1] !== 't' && setDate(text)
    }
    function handleBlurInput(e){
        const value = String(e.target.value).trim();
        const date =  moment(value, 'DD/MM/YYYY')
        if(date.isValid()){
            const newDate = date.format('DD/MM/yyyy')
            return setDate(newDate);
        }
        return message.error('Data inválida')
    }
    function pressKeyTonInput(e){
        const {key} = e;
        const date = moment();
        switch (key){
            case 't':
                setDate(date.format('DD/MM/yyyy'));
                break
            case '+':
                date.add('1', 'days')
                setDate(date.format('DD/MM/yyyy'));
                break
            case '-':
                date.subtract('1', 'days')
                setDate(date.format('DD/MM/yyyy'));
                break
        }
    }
  
    return(
        <div>  
            <Input className="w-48 rounded-none max-md:w-[400px]" onChange={handleInputChange} value={date} onKeyDown={pressKeyTonInput} onBlur={handleBlurInput}/>
            {/* <DatePicker
                open={open}
                style={{ visibility: "hidden", width: 0, marginRight: '-18px'}}
                onOpenChange={(open) => {setOpen(open)}}
                onChange={handleClickDataPicker}
                defaultValue={initialDate}
            /> */}
            <button className='py-[3px] px-2 outline-blue-700 text-blue-600 border-[1px] border-blue-600' onClick={() =>{setOpen(!open)}}><CalendarOutlined/></button>
        </div>


    )
}