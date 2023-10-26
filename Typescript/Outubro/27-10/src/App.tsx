import Header from "./components/Header"
import Button from "./components/Button"
import MainProvider from "./context/MainContext"

export default function App() {
  return (
    <MainProvider>
      <h1>Hello World</h1>
      <Header/>
      <Button/>
    </MainProvider>
  )
}

