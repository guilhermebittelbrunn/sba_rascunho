import { useState, useEffect, useContext } from "react";
import { MapaContext } from "../../contexts/MapaContext";
import {ZoomInOutlined, ZoomOutOutlined, InfoCircleOutlined, FormOutlined, RightOutlined} from '@ant-design/icons'
import moment from "moment";
import numeral from 'numeral';

export default function ContextMenu({contextMenu, isFullScreen, setContextMenu}){
    const [properties, setProperties] = useState({status: false, pageX: 0, pageY: 0, ...contextMenu.properties});
    const { map, settings, setCountSelectedFeatures, createFeatureStyle } = useContext(MapaContext);


    function handleSelect(){
        if(contextMenu.pixel){
            map.forEachFeatureAtPixel(contextMenu.pixel, (feature, layer)=>{
                if(layer.className_ === "stateLayer"){
                    
                    const featureProperties = feature.getProperties() 
                    const styleConfig = featureProperties.stylesConfig || settings;
                    
                    feature.setProperties({SELECTED: !featureProperties.SELECTED});
    
                    if(feature.getProperties().SELECTED){
                        setCountSelectedFeatures(pv=>pv+1);
                        return feature.setStyle(createFeatureStyle(feature, {...styleConfig, zIndex: 100, fillColor: 'rgb(255,238,0)'}));
                    }
                    setCountSelectedFeatures(pv=>pv-1);
                    feature.setStyle(createFeatureStyle(feature, {...settings}))
                }
            })
            setContextMenu({status: false, layerX: 0, layerY: 0, geometry: undefined});
            const contextMenuHTML = document.getElementById('contextMenu');
            contextMenuHTML.style.display = 'none';
        }
    }

    function handleZoomIn(){
        const zoom = map.getView().getZoom(10);
        map.getView().setZoom(zoom + .5)
    }

    function handleZoomOut(){
        const zoom = map.getView().getZoom(10);
        map.getView().setZoom(zoom - .5)
    }

    function showSubMenu(divName){
        let {pageX, pageY} = contextMenu;
        
        const contextMenuHTML = document.getElementById('contextMenu');
        const contextWidth = contextMenuHTML.offsetWidth;
        const mapHTML = document.getElementById('map');
        const mapWidth = mapHTML.offsetWidth; 
        const submenu = document.getElementById(divName);
        const submenuWidth = 240
        
        if(pageX + submenuWidth + contextWidth >= mapWidth ){
            submenu.style.left = '-240px'
        }else{
            submenu.style.right = '-240px'
        }
        submenu.style.display = 'flex'
    }

    function hiddenSubMenu(divName){
        const submenu = document.getElementById(divName);
        submenu.style = 'display: none';
    }
    

    useEffect(()=>{ 
        
        const mapHTML = document.getElementById('map');

        if(mapHTML){
            let {pageX, pageY} = contextMenu;
            
            const contextMenuHTML = document.getElementById('contextMenu');
            const mapWidth = mapHTML.offsetWidth; 
            const mapHeight = mapHTML.offsetHeight; 
            const contextWidth = contextMenuHTML.offsetWidth;
            const contextHeight = contextMenuHTML.offsetHeight;
            const aditionalWidth = isFullScreen ? -10 : 50
            const aditonalHeight = isFullScreen ? -10 : 50

            pageX = (pageX + contextWidth) >= mapWidth ? mapWidth - contextWidth + aditionalWidth : pageX 
            pageY = (pageY + contextHeight) >= mapHeight ? mapHeight - contextHeight + aditonalHeight: pageY 
                
            setProperties({
                ...contextMenu,
                ...contextMenu.properties,
                pageX,
                pageY
            });
            // contextWidth.style.display = 'flex'

        }

    }, [contextMenu])
  
    return(
     
            <div 
                id="contextMenu" 
                onContextMenu={(e)=>{e.preventDefault()}}
                style={{top: properties.pageY + 'px', left: properties.pageX + 'px'}}
                className={`w-[150px] p-2 bg-white shadow-xl flex flex-col gap-2 rounded-lg absolute
                 ${(contextMenu.status && properties.NM_MUN) || 'hidden'}`} 
            >
                <div>
                    <ul className="flex flex-col gap-2">
                        <li className="flex items-center hover:bg-gray-100 px-2 py-1 hover:cursor-pointer" onClick={(e)=>{handleSelect(e)}}>
                            <FormOutlined />
                            <span className="ml-2 text-base">Select</span>
                        </li>
                        <li className="flex items-center hover:bg-gray-100 px-2 py-1 hover:cursor-pointer" onClick={handleZoomIn}>
                            <ZoomInOutlined />
                            <span className="ml-2 text-base">Zoom in</span>
                        </li>
                        <li className="flex items-center hover:bg-gray-100 px-2 py-1 hover:cursor-pointer" onClick={handleZoomOut}>
                            <ZoomOutOutlined />
                            <span className="ml-2 text-base">Zoom out</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className="flex flex-col gap-2 border-t-[1px] border-gray-400">
                        <li className="relative flex items-center justify-between hover:bg-gray-100 px-2 py-1" onMouseOut={()=>{hiddenSubMenu('sub-menu-mun')}} onMouseOver={()=>{showSubMenu('sub-menu-mun')}}>
                            <div>
                                <InfoCircleOutlined />
                                <span className="ml-2 text-">Cidade</span>
                            </div>
                            <RightOutlined className="text-sm"/>
                             <ul id="sub-menu-mun" className="absolute w-[240px] hidden p-3 bg-white shadow-xl top-[-35px] rounded-xl flex-col">
                                <li className="flex justify-between items-center hover:bg-gray-100 py-1 hover:cursor-pointer">
                                    <span className="ml-2 text-sm font-semibold">Nome</span>
                                    <p className="text-sm">{properties.NM_MUN && String(properties.NM_MUN).substring(0,24)}{properties.NM_MUN && properties?.NM_MUN.length > 25 && '...'}</p>
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
                    
                        <li className="relative flex items-center justify-between hover:bg-gray-100 px-2 py-1" onMouseOut={()=>{hiddenSubMenu('sub-menu-sales-rep')}} onMouseOver={()=>{showSubMenu('sub-menu-sales-rep')}}>
                            <div>
                                <InfoCircleOutlined />
                                <span className="ml-2 text-base">Venda</span>
                            </div>
                            <RightOutlined className="text-sm"/>
                             <ul id="sub-menu-sales-rep" className="absolute w-[240px] hidden p-3 bg-white shadow-xl top-[-35px] rounded-xl flex-col">
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
                                        <p className="ml-4 text-right text-sm">{String(properties.NOME_CLIENTE).substring(0,17)}{properties.NOME_CLIENTE.length > 14 && '...'}</p>
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

