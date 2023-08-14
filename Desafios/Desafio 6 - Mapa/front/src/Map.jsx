import { useState, useEffect } from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {VectorImage, Vector as vector} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {Style,Stroke} from 'ol/style'
import {FullScreen, defaults} from 'ol/control'
import axios from 'axios';
import { useGeographic } from 'ol/proj';
import json from './geojson'  


export default function MapPage() {
   useGeographic();

  const {data, err, loading} = useFetch('http://localhost:3000/api/regioes/all');
  
  
  useEffect(()=>{
    
    if(!loading){
      
      const vectorSource = new Vector({
          features: new GeoJSON().readFeatures(json),
      });

      const vectorLayer = new vector({
          source: vectorSource,
          style: new Style({
                // fill: new Stroke({
                //     color: "rgba(221,221,223,0.5)",
                // }),
                stroke: new Stroke({
                    color: "rgba(30,30,30)",
                    width: 2,
                }),
            }),
      });

      const newVector = new vector({
        source: new Vector({
          url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/42?formato=application/vnd.geo+json&qualidade=maxima&intrarregiao=municipio',
          format: new GeoJSON()
        }),
        style: new Style({
            fill: new Stroke({
                color: "rgba(221,221,223,0.5)",
            }),
            stroke: new Stroke({
                color: "rgba(255,30,30)",
                width: 1,
            }),
        }),
        visible: true,
        title: 'qq'
      })


  
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
               })
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
        map.addLayer(vectorLayer)
        map.addLayer(newVector)

      // return () => {
      //       map.current.setTarget(null);
      //   };
    }

  },[data])

  return (
    <>
       <div id='map' className='map' style={{position: 'absolute', top: '0', bottom: '0', width: '100vw'}}/>
    </>
  )
}


function useFetch(url){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true)
        const res = await axios.get(url);
        // console.log(res)
        setData(res.data);
      }catch(err){
        setError(err)
      }finally{
        setLoading(false)
      }
    })()

    
  }, [url])

return {loading, error, data}

}
