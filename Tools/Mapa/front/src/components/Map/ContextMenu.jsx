import { useState, useEffect } from "react";
import {ZoomInOutlined, ZoomOutOutlined, InfoCircleOutlined, FormOutlined, RightOutlined} from '@ant-design/icons'
import moment from "moment";
import numeral from 'numeral';

export default function ContextMenu({contextMenu}){
    const [properties, setPropertis] = useState({status: false, pageX: 0, pageY: 0, ...contextMenu.properties});


    function showSubMenu(divName){
        const submenu = document.getElementById(divName);
        submenu.style = 'display: flex';
    }

    function hidenSubMenu(divName){
        const submenu = document.getElementById(divName);
        submenu.style = 'display: none';
    }

    useEffect(()=>{ 
        const contextMenuHTML = document.getElementById('contextMenu');
        const windowWidth = window.innerWidth;
        const contextWidth = contextMenuHTML.offsetWitdh;
        // console.log(window.innerWidth);
        // console.log(contextMenuHTML.offsetWidth);

        let {pageX, pageY} = contextMenu;

        pageX = pageX > windowWidth - contextWidth ? windowWidth - contextWidth : pageX 


        setPropertis({
            ...contextMenu,
            ...contextMenu.properties,
            pageX,
            // pageY: contextMenu.pageY > 790 ? contextMenu.pageY - 120 : contextMenu.pageY,
        });

    }, [contextMenu])
  
    return(
     
            <div 
                id="contextMenu" className={`w-[150px] p-2 bg-white shadow-xl flex flex-col gap-2 rounded-lg absolute 
                 ${(contextMenu.status && properties.NM_MUN) || 'hidden'}`} 
                style={{top: properties.pageY+'px', left: properties.pageX +'px'}}
            >
                <div>
                    <ul className="flex flex-col gap-2">
                        <li className="flex items-center hover:bg-gray-100 px-2 py-1 hover:cursor-pointer">
                            <FormOutlined />
                            <span className="ml-2 text-base">Select</span>
                        </li>
                        <li className="flex items-center hover:bg-gray-100 px-2 py-1 hover:cursor-pointer">
                            <ZoomInOutlined />
                            <span className="ml-2 text-base">Zoom in</span>
                        </li>
                        <li className="flex items-center hover:bg-gray-100 px-2 py-1 hover:cursor-pointer">
                            <ZoomOutOutlined />
                            <span className="ml-2 text-base">Zoom out</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className="flex flex-col gap-2 border-t-[1px] border-gray-400">
                        <li className="relative flex items-center justify-between hover:bg-gray-100 px-2 py-1" onMouseOut={()=>{hidenSubMenu('sub-menu-mun')}} onMouseOver={()=>{showSubMenu('sub-menu-mun')}}>
                            <div>
                                <InfoCircleOutlined />
                                <span className="ml-2 text-">Cidade</span>
                            </div>
                            <RightOutlined className="text-sm"/>
                             <ul id="sub-menu-mun" className="absolute w-[240px] right-[-240px] p-3 bg-white shadow-xl top-[-35px] rounded-x flex-col hidden">
                                <li className="flex justify-between items-center hover:bg-gray-100 py-1 hover:cursor-pointer">
                                    <span className="ml-2 text-sm font-semibold">Município</span>
                                    <p className="text-sm">{properties.NM_MUN}</p>
                                </li>
                                <li className="flex justify-between items-center hover:bg-gray-100 py-1 hover:cursor-pointer">
                                    <span className="ml-2 text-sm font-semibold">Estado</span>
                                    <p className="">{properties.SIGLA_UF}</p>
                                </li>
                                <li className="flex justify-between items-center hover:bg-gray-100 py-1 hover:cursor-pointer">
                                    <span className="ml-2 text-sm font-semibold">Área</span>
                                    <p className="">{numeral(properties.AREA_KM2).format(0.0).replace(',', '.')} KM²</p>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    {properties.NUMERO_PEDIDO && 
                    
                        <li className="relative flex items-center justify-between hover:bg-gray-100 px-2 py-1" onMouseOut={()=>{hidenSubMenu('sub-menu-sales-rep')}} onMouseOver={()=>{showSubMenu('sub-menu-sales-rep')}}>
                            <div>
                                <InfoCircleOutlined />
                                <span className="ml-2 text-base">Venda</span>
                            </div>
                            <RightOutlined className="text-sm"/>
                             <ul id="sub-menu-sales-rep" className="absolute w-[200px] right-[-200px] p-3 bg-white shadow-xl top-[-35px] rounded-xl flex-col hidden">
                                 <li className="flex justify-between items-center hover:bg-gray-100 py-1 hover:cursor-pointer">
                                    <span className="ml-2 text-sm font-semibold">N.° vendas</span>
                                    <p className="text-sm">{properties.QUANTIDADE_VENDAS}</p>
                                </li>
                                <li className="flex justify-between items-center hover:bg-gray-100 py-1 hover:cursor-pointer">
                                    <span className="ml-2 text-sm font-semibold">N.° clientes</span>
                                    <p className="text-sm">{properties.QUANTIDADE_CLIENTES_CIDADE}</p>
                                </li>
                                <details>
                                    <summary className="text-sm text-center font-semibold">Última venda</summary>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Cód. cliente</span>
                                        <p className="ml-4 text-right">{properties.CODIGO_CLIENTE}</p>
                                    </li>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Nome</span>
                                        <p className="ml-4 text-right text-sm">{String(properties.NOME_CLIENTE).substring(0,13)}{properties.NOME_CLIENTE.length > 14 && '...'}</p>
                                    </li>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Núm. pedido</span>
                                        <p className="ml-4 text-right">{properties.NUMERO_PEDIDO}</p>
                                    </li>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Dt. pedido</span>
                                        <p className="ml-4 text-right">{moment(properties.ULTIMA_VENDA).format('DD/MM/yyyy')}</p>
                                    </li>
                                </details>
                            </ul>
                        </li>
                    
                    }
                
             
                </div>

            </div>

    )
      
}

