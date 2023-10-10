import React, { useState } from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import { useController } from 'react-hook-form';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);


export default function InputDateX(props){
    const { label, onKeyDown, ...rest } = props;

    const { field, fieldState } = useController(props);
    const { invalid, isTouched, isDirty, error } = fieldState;
    const { onChange, onBlur, name, value, ref } = field;

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        const m = moment(value);
        setText(m.isValid() ? m.format('DD/MM/YYYY') : '');
    }, [value, setText]);

    return (
        <Form.Item
            className="mb-2"
            label={label && <span className="font-semibold">{label}</span>}
            validateStatus={error && 'error'}
            help={error?.message}
        >
            <div className="flex">
                <DatePicker
                    className="invisible w-0 p-0 border-0"
                    open={open}
                    onChange={(m) => {
                        //console.log(date);
                        onChange(m.isValid() ? m.toDate() : null);
                        setText(m.isValid() ? m.format('DD/MM/YYYY') : '');
                    }}
                    onOpenChange={(e) => {
                        setOpen(false);
                    }}
                    value={value ? dayjs(value) : dayjs()}
                    placement="bottomLeft"
                ></DatePicker>
                <Input
                    name={name}
                    value={text}
                    ref={ref}
                    onChange={(e) => {
                        const { value } = e.target;
                        //const m = moment(value, 'DD/MM/YYYY');
                        //onChange(m.isValid() ? m.toDate() : null);
                        setText(value);
                    }}
                    onBlur={(e) => {
                        const m = moment(text, 'DD/MM/YYYY');
                        onChange(m.isValid() ? m.toDate() : null);
                        setText(m.isValid() ? m.format('DD/MM/YYYY') : '');
                        onBlur(e);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const m = moment(text, 'DD/MM/YYYY');
                            onChange(m.isValid() ? m.toDate() : null);
                            setText(m.isValid() ? m.format('DD/MM/YYYY') : '');
                        }
                        onKeyDown && onKeyDown(e);
                    }}
                    autoComplete="off"
                    {...rest}
                ></Input>
                <Button
                    className="ml-1"
                    icon={<CalendarOutlined />}
                    onClick={(e) => {
                        //console.log(dayjs(value).toISOString());
                        setOpen(true);
                    }}
                ></Button>
            </div>
        </Form.Item>
    );
};