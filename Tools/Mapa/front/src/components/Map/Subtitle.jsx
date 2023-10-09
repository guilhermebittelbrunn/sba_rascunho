import { Table, Input, Radio, Space } from "antd"
import { UnorderedListOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react"

const svgList = [
    {
        type: 'svg',
        name: false,
        svgName: `M0 1275 l0 -1275 1275 0 1275 0 0 1275 0 1275 -1275 0 -1275 0 0 -1275z`

    },
    {
        type: 'svg',
        name: 110,
        svgName: `M0 2240 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                M0 1740 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                M0 1270 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                M0 780 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                M0 290 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z`
    },
    {
        type: 'svg',
        name: 45,
        svgName: `M200 2536 c8 -8 535 -415 1170 -906 635 -491 1161 -897 1168 -903 9
                -7 12 25 12 155 l0 164 -972 752 -973 752 -209 0 c-180 0 -208 -2 -196 -14z
                M991 2546 c2 -2 354 -276 782 -609 l777 -606 -1 167 0 167 -570 443
                -569 442 -212 0 c-116 0 -209 -2 -207 -4z
                M1860 2546 c0 -5 654 -516 678 -530 9 -6 12 28 12 156 l-1 163 -138
                108 -139 107 -206 0 c-113 0 -206 -2 -206 -4z
                M0 2237 l0 -165 1263 -984 c694 -541 1268 -988 1275 -992 10 -6 12
                26 10 157 l-3 165 -1235 962 c-679 530 -1252 976 -1272 992 l-38 30 0 -165z
                M2 1625 l3 -169 924 -728 924 -728 209 0 210 0 -29 23 c-15 13 -518
                410 -1118 882 -600 472 -1098 865 -1108 873 -17 15 -17 8 -15 -153z
                M0 1018 l1 -163 549 -428 549 -427 208 2 209 3 -750 585 c-412 322
                -753 587 -758 588 -4 2 -8 -70 -8 -160z
                M0 378 l0 -165 137 -107 136 -106 211 0 c119 0 206 4 201 9 -6 4
                -156 122 -335 261 -179 139 -331 257 -337 263 -10 7 -13 -25 -13 -155z`, 
    },
    {
        type: 'svg',
        name: 90,
        svgName: `M152 2433 l-152 -117 0 -164 c0 -130 3 -162 12 -155 7 6 164 126 348
                268 184 142 342 264 350 271 12 12 -18 14 -196 14 l-210 0 -152 -117z
                M582 2097 l-582 -450 0 -165 c0 -130 3 -162 13 -155 6 6 361 279 787
                608 426 329 779 602 784 606 6 5 -83 9 -205 8 l-214 -1 -583 -451z
                M993 1777 l-992 -772 0 -162 c-1 -90 1 -163 4 -163 3 0 2276 1765
                2363 1835 1 1 0 10 -4 19 -5 14 -29 16 -193 15 l-186 0 -992 -772z
                M1273 1397 l-1272 -982 0 -163 c-1 -90 3 -162 8 -160 4 2 578 443
                1275 982 l1266 978 0 164 c0 90 -1 164 -2 163 -2 0 -575 -442 -1275 -982z
                M1405 900 c-627 -479 -1147 -878 -1155 -886 -12 -12 14 -14 197 -14
                l210 0 944 721 c519 397 945 723 947 724 1 1 1 75 0 164 l-3 162 -1140 -871z
                M1799 582 l-747 -577 210 -3 209 -2 540 416 539 416 0 164 c0 90 -1
                164 -2 164 -2 -1 -339 -261 -749 -578z
                M2214 262 l-331 -257 209 -3 209 -2 125 95 124 96 0 164 c0 91 -1
                165 -2 164 -2 0 -152 -116 -334 -257z`,
    },
    {
        type: 'svg',
        name: 300,
        svgName: `M210 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0 -1275z
                M700 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0 -1275z
                M1170 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0
                -1275z
                M1660 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0
                -1275z
                M2150 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0
                -1275z`
    }  
]

const columns = [
    {
        render: (text,record)=>{
            return (
                <p className='text-lg'>
                    <svg 
                        version="1.0" 
                        xmlns="http://www.w3.org/2000/svg"
                        width="14.000000pt" height="14.000000pt" 
                        viewBox="0 0 255.000000 255.000000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g 
                            transform="translate(0.000000,255.000000) scale(0.100000,-0.100000)"
                            fill={`${typeof text.data.fillColor === 'object' ?  
                            text.data.fillColor.toRgbString() 
                            : 
                            text.data.fillColor}`} stroke="none"
                        >
                            <path d={(svgList.filter(svg=> svg.name === text.data.fillStyle)[0].svgName)}/>
                        </g>
                    </svg>
                </p>
            )
        }
    },
    {
        render: (text,record)=>{
            return (
                <p className='text-subtitle text-lg'>
                {text.name}
                </p>
            )
        }
    },
]

export default function Subtitle({subtitle, setSubtitle, layersVisibles}){
    const [showContextMenu, setShowContextMenu] = useState(false);
    

    useEffect(()=>{
        console.log('subtitle', subtitle)
        // const subtitle = document.getElementById('subtitle');
        // const status = subtitle.getAttribute('status');
        // console.log('status', status);
    }, [subtitle])
    
    function handleContextMenu(e){
        e.preventDefault();
        setShowContextMenu(pv=>!pv);

        if(showContextMenu){
            const contextmenu = document.getElementById('subtitle-contextmenu');
            const subtitle = document.getElementById('subtitle');
            const status = subtitle.getAttribute('status');
            const contextmenuWitdh = contextmenu.offsetWidth;
            const contextmenuHeight = contextmenu.offsetHeight
            
            const mapHTML = document.getElementById('map');
            // const mapWidth = mapHTML.offsetWidth; 
            // const mapHeight = mapHTML.offsetHeight;
    
             const pos = [
                [],
                [`-${contextmenuHeight}px`, `-${contextmenuHeight}px`, '', ''],
                [`-${contextmenuHeight}px`, '', '', `-${contextmenuHeight}px`],
                ['', '', `-${contextmenuHeight}px`, `-${contextmenuHeight}px`],
                ['', `-${contextmenuHeight}px`, `-${contextmenuHeight}px`, ''],
            ];
            console.log(contextmenu);
            
            contextmenu.style.top = `${pos[+status][0]}`;
            contextmenu.style.right = `${pos[+status][1]}`;
            contextmenu.style.bottom = `${pos[+status][2]}`;
            contextmenu.style.left = `${pos[+status][3]}`;
        }
    }
     
    return(
         <div
                onContextMenu={e=>handleContextMenu(e)} 
                id='subtitle' 
                status={0}
                className={`shadow-xl border-[2px] border-gray-400 min-w-[180px] max-w-[280px] z-30 
                absolute ${(subtitle.status && layersVisibles.length > 0) ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="relative">
                    <Table
                        bordered={false}
                        id='subtitle-table'
                        size='small'
                        columns={columns} 
                        dataSource={layersVisibles} 
                        pagination={false} 
                        showHeader={false}
                        rowClassName='flex items-center'
                    />
                <ContextMenu showContextMenu={showContextMenu} subtitle={subtitle} setSubtitle={setSubtitle}/>                      
                </div>   
            </div>
    )
}


function ContextMenu({showContextMenu, subtitle, setSubtitle}){
    const [value, setValue] = useState();
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    
    return (
        <div id='subtitle-contextmenu' className={`w-[190px] p-2 z-50 bg-white shadow-xl flex flex-col gap-2 rounded-lg absolute ${showContextMenu ? 'opacity-95' : 'opacity-0'}`}>
            <div>
                <ul className="flex flex-col gap-2">
                <li className="flex items-center hover:bg-gray-100 px-2 py-1 hover:cursor-pointer" >
                    <UnorderedListOutlined />
                    <span className="ml-2 text-base">{subtitle ? "Ocultar legenda" : "Exibir legenda" }</span>
                </li>
            </ul>
            </div>
            <div className="border-t-[1px] border-gray-400 p-1">
                <span className="font-semibold">Posição</span>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio className="text-base w-full hover:bg-gray-100 " value={4}>Superior esquerdo</Radio>
                        <Radio className="text-base w-full hover:bg-gray-100 " value={3}>Superior direito</Radio>
                        <Radio className="text-base w-full hover:bg-gray-100 " value={2}>Inferior esquerdo</Radio>
                        <Radio className="text-base w-full hover:bg-gray-100 " value={1}>Inferior direito</Radio>
                    </Space>
                </Radio.Group>
            </div>
        </div>
    )
}