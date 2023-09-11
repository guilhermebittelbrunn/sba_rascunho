import { useState, useEffect } from "react";
import moment from "moment";

export default function ContextMenu({contextMenu}){
    const [properties, setPropertis] = useState({status: false, pageX: 0, pageY: 0, ...contextMenu.properties});

    useEffect(()=>{ 

        setPropertis({
            ...contextMenu,
            ...contextMenu.properties,
            // pageX: contextMenu.pageX > 980 ? contextMenu.pageX - 80 : contextMenu.pageX,
            // pageY: contextMenu.pageY > 790 ? contextMenu.pageY - 120 : contextMenu.pageY,
        });

    }, [contextMenu])
  
    return(
     
      
            <div id="contextMenu" className={`py-4 px-3 bg-white  opacity-90 absolute hover:cursor-pointer ${(contextMenu.status && properties.NM_MUN) || 'hidden'}`} style={{top: properties.pageY+'px', left: properties.pageX +'px'}}>
                <ul>
                    <li className="px-1 w-full text-sm flex justify-between"> 
                        <span className="font-semibold">Município</span>
                        <p className="ml-4 text-right">{properties.NM_MUN}</p>
                    </li>

                    <li className="px-1 w-full text-sm flex justify-between"> 
                        <span className="font-semibold">Área KM²</span>
                        <p className="ml-4 text-right">{properties.AREA_KM2} KM²</p>
                    </li>

                    <li className="px-1 w-full text-sm flex justify-between"> 
                        <span className="font-semibold">Estado</span>
                        <p className="ml-4 text-right">{properties.SIGLA_UF}</p>
                    </li>
                    {properties.NUMERO_PEDIDO &&
                        <>
                            <li className="px-1 w-full text-sm flex justify-between"> 
                                <span className="font-semibold">N° pedidos</span>
                                <p className="ml-4 text-right">{properties.QUANTIDADE_VENDAS}</p>
                            </li>

                            <li className="px-1 w-full text-sm flex justify-between"> 
                                <span className="font-semibold">N° clientes</span>
                                <p className="ml-4 text-right">{properties.QUANTIDADE_CLIENTES_CIDADE}</p>
                            </li>

                            <li>
                                <details>
                                    <summary className="text-sm text-center font-semibold">Última venda</summary>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Código cliente</span>
                                        <p className="ml-4 text-right">{properties.CODIGO_CLIENTE}</p>
                                    </li>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Nome Cliente</span>
                                        <p className="ml-4 text-right">{String(properties.NOME_CLIENTE).substring(0,18)}{properties.NOME_CLIENTE.length > 20 && '...'}</p>
                                    </li>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Número do pedido</span>
                                        <p className="ml-4 text-right">{properties.NUMERO_PEDIDO}</p>
                                    </li>

                                    <li className="px-1 w-full text-sm flex justify-between"> 
                                        <span className="font-semibold">Data do pedido</span>
                                        <p className="ml-4 text-right">{moment(properties.ULTIMA_VENDA).format('DD/MM/yyyy')}</p>
                                    </li>
                                </details>
                            </li> 
                        </>                      
                    }
                </ul>
            </div>

    )

}

