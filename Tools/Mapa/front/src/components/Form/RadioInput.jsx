import { Radio } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons'


export default function RadioInput({dataset, field, cardStyle}){

    return(
        <section className="flex flex-col gap-2">    
             <Radio.Group onChange={()=>{field.onChange(field.value)}} value={field.value} className='flex mt-2 gap-2'>
                {dataset.map(item=>{return <Card {...item} key={item.name} cardStyle={cardStyle} field={field} value={item.name} isChecked={field.value === item.name}/>})}
            </Radio.Group>
        </section>
    )
}


function Icon({children, isChecked, type}){
    // console.log(children)
    return(
        <p className={`text-base ${isChecked ? 'text-blue-600' : 'text-slate-950'} ${type === 'dpi' && 'font-bold'}`}>
            {children}
        </p>
    )
}


function Card({field, value, isChecked, name, type, cardStyle, svgName, icon}){
  

    return(
            <div 
                id={`div${value}`} 
                className={`${cardStyle} ${isChecked ? 'border-blue-600 ' : 'border-gray-300 '}`} 
                onClick={(e)=>{field.onChange(value);}}
            >

                <Radio value={value} field={field} className='absolute top-[1px] right-[-6px]'/>
                <div id="body" className='flex flex-col items-center mt-2'>
                    {/* {icon && 
                        <>
                            <Icon>
                                {icon}
                            </Icon>
                        </>
                    }  */}
                    {icon && 
                            <Icon isChecked={isChecked} type={type}>
                                {icon()}
                            </Icon>
                    }
                    {type === 'svg' ? 
                        <svg 
                            className='mt-1.5' version="1.0" 
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt" height="20.000000pt" 
                            viewBox="0 0 255.000000 255.000000"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g 
                                transform="translate(0.000000,255.000000) scale(0.100000,-0.100000)"
                                fill={`#000000`} stroke="none"
                            >
                                <path d={svgName}/>
                            </g>
                        </svg>
                        
                        :
                        
                        <p className={`text-sm ${isChecked ? 'text-blue-600' : 'text-slate-950'} ${type === 'dpi' && 'font-bold'}`}>
                            {name}
                        </p>
                    }
                </div>

            </div>
    )
}


