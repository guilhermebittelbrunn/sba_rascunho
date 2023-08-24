import Mapa from "./Mapa"
import MapaProvider from "./context/MapaContext"
import Drawer from "./Drawer"

export default function App() {


  return (
    <>
      <h3>Hello world</h3>
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
      <MapaProvider>
        <Mapa/>
        <Drawer/>
      </MapaProvider>
    </>
  )
}


