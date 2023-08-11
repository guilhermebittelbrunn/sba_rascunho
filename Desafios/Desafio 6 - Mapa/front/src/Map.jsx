import { useState, useEffect } from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {VectorImage} from 'ol/layer'
import {OSM, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format'
import {FullScreen, defaults} from 'ol/control'
import axios from 'axios';
  
// const Terithoy = new Vector({
  
// }




export default function MapPage() {
  const {data, err, loading} = useFetch('http://localhost:3000/api/regioes/all');
  
  
  useEffect(()=>{
    
    if(!loading){
      // console.log((data[0].geojson))
      const z = new VectorImage({
        source: {
          url: './txt.geojson',
          format: new GeoJSON()
        },
        visible: true,
        title: 'qq'
      })
      
        const map = new Map({
            view: new View({
              center: [-5491962.937915098, -1455049.7922887374],
              zoom: 6,
              maxZoom: 10,
              minZoom: 6
            }),
            layers: 
            // data.map(element=>{
            //   return new TileLayer({
            //     source: JSON.parse(element.geojson)
            //   })
            // })
              [new TileLayer({
                source: new OSM()
              })]
            ,
            target: 'map',
            controls: [
              // new FullScreen({
              //           source: 'fullscreen',
              //       }),
                  ]
        })

        // map.on('click', (e)=>{console.log(e.coordinate)});
           map.addLayer(z)



        
     
    }
          


    // console.log(JSON.parse(data[0].geojson))
    
  },[data])

  return (
    <>
      {/* <h3>Map</h3> */}
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
