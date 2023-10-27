import MainProvider from "./context/MainContext";
import Button from './components/Button'
import Header from './components/Header'

export default function App(){

  return(
    <MainProvider>
      <Header/>
      <Button/>
    </MainProvider>
  )

}