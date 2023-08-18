import { useState, useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import {Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text} from 'ol/style'
import {FullScreen} from 'ol/control'
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';;
import { Spin, Checkbox  } from 'antd'
import json from '../../geojson'
import useFetch from '../hooks/useFetch';
import ContextMenu from './ContextMenu';
import { preventDefault } from 'ol/events/Event';

export default function MapPage({url, handleContext, handleClick}){
    useGeographic();

    const {data, err, loading} = useFetch(`http://localhost:3535/api/${url}`);
    const [baseLayerEnable, setBaseLayerEnable] = useState(true);

    const map1 = useRef(null);

    
    useEffect(()=>{
     
        if(!loading){

            const baseLayer = new TileLayer({source: new OSM()});

            const stateLayer = new vector({
                source: new Vector({
                    features: new GeoJSON().readFeatures(data),
                }),
                style: (feature,res)=>{
                    return new Style({
                        fill: new Stroke({
                            color: feature.getProperties().NUMERO_PEDIDO ? "rgb(34, 156, 34)" :  "rgba(221,221,223,0.7)",
                        }),
                        stroke: new Stroke({
                            color: "rgba(30,30,30)",
                            width: 1,
                        }),
                        text: new Text({
                            text: feature.getProperties().NM_MUN,
                            font: 'sans-serif bold'
                        })
                    })
                },
                
            });

            const countryLayer = new vector({
                source: new Vector({
                    features: new GeoJSON().readFeatures(json),
                }),
                style: (feature,res)=>{
                return new Style({
                    fill: new Stroke({
                        color: "rgba(0,0,0,0)",
                    }),
                    stroke: new Stroke({
                        color: "rgba(30,30,30)",
                        width: 1,
                    }),
                })
                },
            });
        
            const map = new Map({
                    view: new View({
                        extent: [-75, -35, -32, 6],
                        center: [-50, -16],
                        zoom: 4,
                        maxZoom: 12,
                        minZoom: 6
                    }),
                    layers: [
                        baseLayer,
                        countryLayer,
                        stateLayer
                    ],
                    target: 'map',
                    controls: []
                  
            });

            map.on('click', (e)=>{
                console.log(e.pixel)
                    map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
                        let coordinate = e.coordinate;
                        let featureTitle = feature.getProperties()
                        // console.log(featureTitle)
                })
            })

           map.addEventListener('contextmenu', (e)=>{
                e.preventDefault();
                console.log(e.target)
                const x = map.getPixelFromCoordinate(map.coordinateToPixelTransform_)
                // (2) [582.0934625518081, 162.02027570669958]
              
                console.log(map.getFeaturesAtPixel(x))

           })

    
            map1.current = map;
            baseLayer.setProperties({visible: baseLayerEnable})



            return () => {
                map1.current.setTarget(null);
            };
        }
          
    },[data, baseLayerEnable])

  return (
    <>
            <section className={`relative m-auto w-[95vw] h-[90vh] flex items-center ${loading && "justify-center"}`}>
                { loading ? <Spin size='large'/> : 
                    <>
                        <div id="options" className='bg-blue-300 w-2/12 h-full'>  
                            {/* <Checkbox onClick={(e)=>{setBaseLayerEnable(e.target.checked)}} checked={baseLayerEnable}>Enable base layer</Checkbox> */}
                        </div>
                        <div>
                            <div id='map' onMouseDown={handleClick} tabIndex="0" className='absolute top-0 bottom-0 w-10/12'/>
                           
                        </div>
                    </>
                }
            </section>
    </>
  )
}



