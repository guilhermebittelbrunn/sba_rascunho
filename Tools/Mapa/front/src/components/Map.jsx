import { useState, useEffect } from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {VectorImage, Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke, Text} from 'ol/style'
import {FullScreen, defaults} from 'ol/control'
import axios from 'axios';
import { useGeographic } from 'ol/proj';
import json from '../../geojson'
import useFetch from '../hooks/useFetch';
import { Space, Spin } from 'antd';

export default function MapPage(){
    useGeographic();

    const {data, err, loading} = useFetch('http://localhost:3535/api/PA');
    
    
    useEffect(()=>{
        
        if(!loading){



    const vectorLayer = new vector({
          source: new Vector({
              features: new GeoJSON().readFeatures(data),
          }),
          style: (feature,res)=>{
          return new Style({
            fill: new Stroke({
                color: "rgba(221,221,223,0.7)",
            }),
            stroke: new Stroke({
                color: "rgba(255,30,30)",
                width: 1,
            }),
            text: new Text({
              text: feature.getProperties().NM_MUN,
            })
        })
        },
      });
    const CountryLayer = new vector({
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
            text: new Text({
              text: feature.getProperties().NM_MUN,
            })
        })
        },
      });

      // const newVector = new vector({
      //   source: new Vector({
      //     url: 'http://localhost:3535/api/AC',
      //     format: new GeoJSON()
      //   }),
      //   style: (feature,res)=>{
      //     return new Style({
      //       fill: new Stroke({
      //           color: "rgba(221,221,223,0.5)",
      //       }),
      //       stroke: new Stroke({
      //           color: "rgba(255,30,30)",
      //           width: 1,
      //       }),
      //       text: new Text({
      //         text: feature.getProperties().codarea,
      //       })
      //   })
      //   },
        
      //   visible: true,
      //   title: 'qq'
      // })


  
        const map = new Map({
            view: new View({
              extent: [-75, -35, -32, 6],
              center: [-50, -16],
              zoom: 4
              // maxZoom: 10,
              // minZoom: 6
            }),
            layers: [
                new TileLayer({
                 source: new OSM()
               }),
              CountryLayer,
              vectorLayer
            ],
            target: 'map',
            controls: [
              // new FullScreen({
              //           source: 'fullscreen',
              //       }),
            ],
            
              
        })

        // map.on('click', (e)=>{console.log(e)});
        map.on('click', (e)=>{
          map.forEachFeatureAtPixel(e.pixel, (feature, layer)=>{
            let coordinate = e.coordinate;
            let featureName = feature.get('name');
            let featureTitle = feature.get('title');
            let featureAdditionInfo = feature.get('additionalinfo');
            console.log(coordinate, featureTitle, featureAdditionInfo)
          })
        })

        // map.addLayer(vectorLayer)
        // map.addLayer(newVector)

      // return () => {
      //       map.current.setTarget(null);
      //   };
    }

  },[data])

  return (
    <>
       
       {/* {loading && <div>Carregando...</div>} */}
       {loading ? <Spin size='large'/> : 
            <section className='relative w-[95vw] h-screen flex'>
                <div id="options" className='bg-blue-300 w-11/12'>  
                    teste
                </div>
                <div id="map">
                    <div id='map' className='absolute top-0 bottom-0 w-10/12' style={{position: 'absolute', top: '0', bottom: '0', width: '100vw'}}/>
                </div>
            </section>
       }
    </>
  )
}