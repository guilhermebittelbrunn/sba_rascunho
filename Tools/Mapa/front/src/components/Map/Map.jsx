import { useEffect, useRef, useContext, useState } from 'react';
import { Spin, Table } from 'antd';
import { UnorderedListOutlined, SettingOutlined, SelectOutlined, FullscreenExitOutlined, PlusOutlined, FullscreenOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { MapaContext } from '../../contexts/MapaContext';
import ErrorModal from '../Modal/ErrorModal';
import LayerModal from '../Modal/LayerModal';
import AddRepModal from '../Modal/AddRepModal';

const columns = [
        {
            render: (text,record)=>{
                return (
                    <p className='flex items-center text-lg gap-2'>
                        <svg 
                            version="1.0" 
                            xmlns="http://www.w3.org/2000/svg"
                            width="14.000000pt" height="14.000000pt" 
                            viewBox="0 0 255.000000 255.000000"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g 
                                transform="translate(0.000000,255.000000) scale(0.100000,-0.100000)"
                                fill={`${typeof text.data.fillColor === 'object' ?  text.data.fillColor.toRgbString() : text.data.fillColor}`} stroke="none"
                            >
                                <path d={(svgList.filter(svg=> svg.name === text.data.fillStyle)[0].svgName)}/>
                            </g>
                    </svg>
                    {text.name}
                    </p>
                )
            }
        }
]

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

export default function MapPage({handleClick, handleFullScreenAction, isFullScreen, setContextMenu, setOpen}){

    const {map, loading, error, layers, settings, setSettings, createFeatureStyle, countSelectedFeatures, setCountSelectedFeatures} = useContext(MapaContext);
    const { interaction } = settings
    const [isModalOpen, setIsModalOpen] = useState({layerModal: false, addRepModal: false});
    const [showSubtitle, setShowSubtitle] = useState(false);
    
    const map1 = useRef(null);

    function showModal(modalName){
        setIsModalOpen((pv)=>{
            return {...pv, [modalName]: true}
        });
    }

    function disableModal(){
        setIsModalOpen({layerModal: false, addRepModal: false});
    };

    function changeSubtitleStatus(){
        const subtitle = document.getElementById('subtitle');
        const table = document.getElementById('subtitle-table');
        const height = table.offsetHeight;
        const status = subtitle.getAttribute('status');
        const newStatus = status == 4 ? 0 : +status + 1;
        const pos = [
            [],
            ['', '', `${height}px`, '4px'],
            ['', '4px', `${height}px`, ''],
            ['4px', '4px', '', ''],
            ['4px', '', '', '4px'],
        ];
        
        subtitle.setAttribute('status', newStatus);

        if(newStatus === 0) return setShowSubtitle(false);
        
        setShowSubtitle(true);
        subtitle.style.top = `${pos[newStatus][0]}`;
        subtitle.style.right = `${pos[newStatus][1]}`;
        subtitle.style.bottom = `${pos[newStatus][2]}`;
        subtitle.style.left = `${pos[newStatus][3]}`;
    }

    useEffect(()=>{
        if(!map) return

        map.setTarget('map');
        map1.current = map;
        return () => {  
            map1.current.setTarget(null);
        };
    })


    useEffect(()=>{
        if(!map)return

            map.addEventListener('contextmenu', (e)=>{
                e.preventDefault();
                const pixel = e.pixel;
                const listLayers = [];


                map.forEachFeatureAtPixel(pixel, (feature, layer)=>{
                    const properties = feature.getProperties();
                    const layerName = layer.getClassName();

                    if(layerName !== 'countryLayer'){
                        listLayers.push({
                            properties,
                            layer: layerName, 
                            rc: layer.values_.rc, 
                        });
                    }
                });

                const mapHTML = document.getElementById('map');
                const mapWidth = mapHTML.offsetWidth; 
                const mapHeight = mapHTML.offsetHeight; 

                const contextWidth = 150;
                const contextHeight = 200 + ((listLayers.length) * 25);
                const aditionalWidth = isFullScreen ? -50 : 0
                const aditonalHeight = isFullScreen ? -50 : 0

                let { pageX, pageY } = e.originalEvent

                pageX = (pageX + contextWidth) >= mapWidth ? mapWidth - contextWidth + aditionalWidth : pageX 
                pageY = (pageY + contextHeight) >= mapHeight ? mapHeight - contextHeight + aditonalHeight: pageY 
                
                
                map.forEachFeatureAtPixel(pixel, (feature, layer)=>{

                    if(layer.getClassName() !== 'countryLayer'){
                        setContextMenu({
                            pageX, 
                            pageY, 
                            pixel,
                            status:true, 
                            layers: listLayers, 
                            properties: listLayers[0].properties
                        })
                    }

                })

        });
    
        map.on('click', (e)=>{
            if(e.originalEvent.ctrlKey){
                map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
                    if(layer.className_ === "stateLayer"){
                        
                        const featureProperties = feature.getProperties() 
                        const styleConfig = featureProperties.stylesConfig || settings;
                        
                        feature.setProperties({SELECTED: !featureProperties.SELECTED});

                        if(feature.getProperties().SELECTED){
                            setCountSelectedFeatures(pv=>pv+1);
                            return feature.setStyle(createFeatureStyle(feature, {...styleConfig, zIndex: 100, fillColor: 'rgb(255,238,0)'}));
                        }
                        setCountSelectedFeatures(pv=>pv-1);
                        // console.log('map', countSelectedFeatures)
                        feature.setStyle(createFeatureStyle(feature, {...settings}))
                    }
                })
            }
        });

    },[map])

    useEffect(()=>{
        const subtitle = document.getElementById('subtitle');
        if(!subtitle)return
        const status = subtitle.getAttribute('status');
        subtitle.setAttribute('status', parseInt(status) - 1);
        changeSubtitleStatus();
    },[layers])

  return (
   
            <>  
                { loading ? <Spin size='large' className='spin'/> : 
                <>
                    {error ? <ErrorModal error={error}/> :
                    <>
                        
                        <div 
                            type="primary" id="settings" onClick={()=>{setOpen(true);}} 
                            style={{transform: 'translateY(300%)', transition: 'all .4s'}} 
                            className={`hover:cursor-pointer hover:bg-slate-400  rounded-r-lg 
                            hover:w-12 absolute left-50 top-50 h-28 p-2 flex justify-center items-center w-8
                            bg-slate-300 z-20 opacity-80`}
                        >
                            <SettingOutlined className='text-gray-900 text-lg font-black'/>
                        </div>

                        <button 
                            onClick={handleFullScreenAction} className={`absolute flex justify-center items-center 
                            top-1 h-[30px] border-[1.5px]border-slate-100 outline-none rounded w-[30px] left-50 
                            text-sm text-gray-800 bg-slate-100 z-50 hover:text-base`} 
                            style={{transform: 'translate(20%, 10%)', transition: 'all .4s'}}
                        >
                            {isFullScreen? <FullscreenExitOutlined/> : <FullscreenOutlined/> }
                        </button>
                        
                        <button 
                            onClick={()=>setSettings(pv=>{return {...pv, interaction: !interaction}})} 
                            className={`absolute flex justify-center items-center left-50 top-50 h-[30px] 
                            border-[1.5px]rounded w-[30px] text-sm text-gray-800 z-50 hover:text-base outline-none 
                            ${interaction ? 'bg-slate-200 border-slate-200' : 'bg-slate-100 border-slate-100 '}`} 
                            style={{transform: 'translate(20%, 150%)', transition: 'all .4s'}}
                        >
                            <SelectOutlined />
                        </button>

                        <button 
                            onClick={()=>{showModal('addRepModal')}} className={`absolute flex 
                            justify-center items-center left-50 top-50 h-[30px] border-[1.5px] border-slate-100 
                            rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 hover:text-base outline-none`} 
                            style={{transform: 'translate(20%, 275%)', transition: 'all .4s'}}
                        >
                            <UsergroupAddOutlined />
                        </button>

                        <button 
                            onClick={()=>{countSelectedFeatures > 0 && showModal('layerModal')}} 
                            className={`absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px]
                            border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 
                            hover:text-base ${countSelectedFeatures <= 0 && 'opacity-60 cursor-not-allowed'} 
                            outline-none`} style={{transform: 'translate(20%, 400%)', transition: 'all .4s'}}
                        >
                            <PlusOutlined />
                        </button>
                        
                        <button 
                            onClick={()=>{(layers.length > 3) && changeSubtitleStatus()}} 
                            className={`absolute flex justify-center items-center left-50 top-50 h-[30px] border-[1.5px]
                            border-slate-100 rounded w-[30px] text-sm text-gray-800 bg-slate-100 z-50 
                            hover:text-base ${layers.length < 4 && 'opacity-60 cursor-not-allowed'} 
                            outline-none`} style={{transform: 'translate(20%, 525%)', transition: 'all .4s'}}
                        >
                            <UnorderedListOutlined />
                        </button>



                        <AddRepModal isModalOpen={isModalOpen.addRepModal} disableModal={disableModal}/>
                        <LayerModal  isModalOpen={isModalOpen.layerModal} disableModal={disableModal}/>
                            <div 
                                id='subtitle' 
                                status={0}
                                className={`flex flex-col w-[190px] gap-6 shadow-lg rounded-lg bg-slate-100 z-30 
                                absolute ${(showSubtitle && layers.length > 3) ? 'opacity-90' : 'opacity-0'}`}
                            >
                                <Table
                                    id='subtitle-table'
                                    className='z-0 w-full absolute top-0' 
                                    size='small'
                                    columns={columns} dataSource={layers.slice(3).reverse()} 
                                    pagination={false} showHeader={false}
                                />
                            </div>
                        
                            <div id='map' onMouseDown={handleClick} className='bg-white absolute top-0 bottom-0 w-full h-full'/>
                    </>
                    }
                </>
          
                }
            </>
                    
  
  )
}




