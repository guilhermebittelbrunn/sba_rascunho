import { useState } from "react"

function App() {
  const [state, setState] = useState(false)

  return (
    <>
      {/* <div className="bg-yellow-50">
        <h1 className="bg-slate-950 text-cyan-900 font-bold text-3xl mt-24 p-12">
          Hello world!
        </h1>
        <h1 className={`${state && 'square'} bg-slate-950 text-cyan-900 font-bold text-3xl mt-24 p-12`}>
          Hello world!
        </h1> */}
               {/* <button>Click-me</button><br></br>
               <input type="text" name="" id="" placeholder="text"/> */}
              
         
               
        {/* <h1 className={`bg-slate-950 font-bold text-3xl ${state ?  "text-cyan-900 mt-24 p-12" :  "text-pink-500 mt-12 p-6"}`} onClick={()=>{setState(!state)}}>
          Hello world!
        </h1>

        <div className="square"/>
        <div className="bg-yellow-400 w-24 h-48"/>
        <div className="bg-blue-400 w-1/4 h-48 sm"/>
 
      </div> */}
{/* 
      <nav className="w-screen h-24 bg-slate-500 mx-auto p-2 text-xs ">
        <h3>Logo</h3>
        <ul className="dis">
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
      </nav> */}
      {/* <h4>Positions</h4>
      <div className="container relative h-48 bg-green-700 mx-auto md:bg-blue-700 md:text-white p-2">
        <div className="absolute right-12 bottom-12 w-12 h-12 bg-yellow-500 m-4 z-20"/>
        <div className="absolute right-8 bottom-8 w-12 h-12 bg-red-500 m-4  z-30"/>
        <div className="absolute right-4 bottom-4 w-12 h-12 bg-blue-500 m-4  z-40"/>
      </div>
      <h4>Flex-box</h4>
      <div className="flex h-48 flex-wrap flex-col bg-orange-800 md:bg-blue-700 md:text-white p-2 lg:flex-wrap-reverse">
        <div className=" w-12 h-12 bg-yellow-500 m-4">1</div>
        <div className=" w-12 h-12 bg-red-500 m-4 ">2</div>
        <div className=" w-12 h-12 bg-blue-500 m-4">3</div>
        <div className=" w-12 h-12 bg-slate-800 m-4">4</div>
        <div className=" w-12 h-12 bg-amber-500 m-4 ">5</div>
        <div className=" w-12 h-12 bg-yellow-50 m-4 ">6</div>
      </div>
      <h4>Grid-layout</h4>
      <div className="grid grid-cols-7">
        <div className="w-12 h-12 bg-cyan-200 m-4"></div>
        <div className="w-12 h-12 bg-cyan-200 m-4"></div>
        <div className="w-12 h-12 bg-cyan-300 m-4"></div>
        <div className="w-12 h-12 bg-cyan-400 m-4"></div>
        <div className="w-12 h-12 bg-cyan-500 m-4"></div>
        <div className="w-12 h-12 bg-cyan-600 m-4"></div>
      </div>
      <h4>Grid menu</h4>
      <div className="container grid grid-cols-4 bg-orange-300">
        <div className="col-span-4">navbar</div>
        <div className="col-span-1  bg-gray-800 flex justify-center items-center flex-col gap-4">
          <h3>Message / ICON</h3>
          <ul className="flex flex-col gap-2">
              <li><a href="#">Item</a></li>
              <li><a href="#">Item</a></li>
              <li><a href="#">Item</a></li>
              <li><a href="#">Item</a></li>
            </ul>
        </div>
        <div className="col-span-3  bg-gray-200 text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam similique odit unde voluptatum officiis. Nam, eligendi velit minus impedit odio vel molestiae sit ratione ipsa. Eligendi nostrum debitis tempora cupiditate?
        Provident minus qui nulla similique at, fugit, sunt blanditiis commodi perferendis ullam consequuntur porro laboriosam facilis aliquam. Porro possimus inventore placeat sit provident deleniti! Voluptatum quidem repellat odio asperiores assumenda!
        Magnam, maxime modi. Laudantium provident dolorem sit molestias aliquid! Tempora similique hic blanditiis doloremque sequi? Eaque hic recusandae officiis deleniti ad repudiandae modi, totam molestias et maiores error libero quibusdam.
        </div>
      </div>
      */}

      <nav className="flex  px-8 py-4 justify-between items-center w-full bg-black flex-row text-white">
        <h2 className="font-bold text-2xl">Spotify</h2>
        <ul className="flex gap-6 font-bold text-sm">
          <li><a href="/">Premium</a></li>
          <li><a href="/">Ajuda</a></li>
          <li><a href="/">Baixar</a></li>
          <li><a href="/">|</a></li>
          <li><a href="/">Inscrever-se</a></li>
          <li><a href="/">Log In</a></li>
        </ul>
      </nav>
      <header className="flex w-full h-96  gap-6 bg-blue-500 flex-col justify-center items-center">
        <h1 className="text-8xl text-center text-emerald-400 font-bold">Escutar muda tudo</h1>
        <p className="text-lg text-emerald-400">Milhões de músicas e podcasts para explorar. E nem precisa de cartão de crédito</p>
        <button className="bg-emerald-400 px-10 py-4 font-bold uppercase rounded-full text-blue-500">Obtenha o spotify free</button>
     </header>
     <footer className="grid w-full bg-black text-white grid-cols-8 p-12">
        <div className="col-span-1">Spotify</div>
        <div className="flex gap-12 col-span-5 bg-red-900 items-center justify-center">
          <div className="flex-col">
            <h4 className="uppercase text-slate-400 font-bold text-sm">Empresa</h4>
            <ul className="flex-col">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
            <div className="flex-col">
            <h4 className="uppercase text-slate-400 font-bold text-sm">Empresa</h4>
            <ul className="flex-col">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
          </div>  <div className="flex-col">
            <h4 className="uppercase text-slate-400 font-bold text-sm">Empresa</h4>
            <ul className="flex-col">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
        </div>
        <div className="col-span-2">links</div>
     </footer>

    </>
  )
}

export default App

