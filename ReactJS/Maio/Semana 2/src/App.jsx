import { useState } from "react"

function App() {
  const [dark, setdark] = useState(true)


  function changeMode(){
    const html = document.getElementsByTagName('html')[0];
    html.clas
  }

  return (
    <>
      <div className="bg-yellow-50">
        <h1 className="bg-slate-950 text-cyan-900 font-bold text-3xl mt-24 p-12">
          Hello world!
        </h1>
        <h1 className={`${dark && 'square'} bg-slate-950 text-cyan-900 font-bold text-3xl mt-24 p-12`}>
          Hello world!
        </h1> 
          <button>Click-me</button><br></br>
          <input type="text" name="" id="" placeholder="text"/>     
        <h1 className={`bg-slate-950 font-bold text-3xl ${dark ?  "text-cyan-900 mt-24 p-12" :  "text-pink-500 mt-12 p-6"}`} onClick={()=>{setdark(!dark)}}>
          Hello world!
        </h1>
        <div className="square"/>
        <div className="bg-yellow-400 w-24 h-48"/>
        <div className="bg-blue-400 w-1/4 h-48 sm"/>
      </div> 

      <nav className="w-screen h-24 bg-slate-500 mx-auto p-2 text-xs ">
        <h3>Logo</h3>
        <ul className="dis">
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
      </nav>
      <h4>Positions</h4>
      <div className="container relative h-48 bg-green-700 mx-auto md:bg-blue-700 md:text-white p-2">
        <div className="absolute right-12 bottom-12 w-12 h-12 bg-yellow-500 m-4 z-20"/>
        <div className="absolute right-8 bottom-8 w-12 h-12 bg-red-500 m-4  z-30"/>
        <div className="absolute right-4 bottom-4 w-12 h-12 bg-blue-500 m-4  z-40"/>
      </div>
      <h4>Flex-box</h4>
      <div className="flex h-48 flex-wrap flex-col bg-orange-800 md:bg-blue-700 md:text-white p-2 lg:flex-wrap-reverse">
        <div className=" w-12 h-12 bg-yellow-500 m-4 group-[]:hover:bg-yellow-900">1</div>
        <div className=" w-12 h-12 bg-red-500 m-4 ">2</div>
        <div className=" w-12 h-12 bg-blue-500 m-4">3</div>
        <div className=" w-12 h-12 bg-slate-800 m-4">4</div>
        <div className=" w-12 h-12 bg-amber-500 m-4 ">5</div>
        <div className=" w-12 h-12 bg-yellow-50 m-4 ">6</div>
      </div>
      <h4 className="tracking-"> Grid-layout</h4>
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

      <div className="w-full h-48 bg-white flex gap-12 p-12">
        <div className="w-16 h-16 bg-green-400 shadow-sm shadow-red-900 flex justify-center items-center "><p className="drop-shadow-lg text-lg drop">sm</p></div>
        <div className="w-16 h-16 bg-green-400 shadow-md shadow-red-900 flex justify-center items-center">md</div>
        <div className="w-16 h-16 bg-green-400 shadow-lg shadow-red-900 flex justify-center items-center">lg</div>
        <div className="w-16 h-16 bg-green-400 shadow-xl shadow-red-900 flex justify-center items-center">xl</div>
        <div className="w-16 h-16 bg-green-400 shadow-2xl shadow-red-900 flex justify-center items-center">2xl</div>
        <textarea name="x" id="x" cols="30" rows="10" placeholder="escreva algo..."></textarea>
      </div>
      
      <nav className={`w-full bg-slate-50 ${dark? "dark":"light"}`}>
        <div className="flex m-auto max-w-screen-md justify-between px-4 py-2 text-red-300">
          <div>
            <h3>Logo</h3>
          </div>
          <div>
            <ul className="flex gap-2">
              <li><a href="/">Link</a></li>
              <li><a href="/">Link</a></li>
              <li><a href="/">Link</a></li>
              <li><a href="/">Link</a></li>
              <li><a href="/">Link</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <button onClick={()=>{
        changeMode();
      }}>Change mode</button>
     
    </>
  )
}

export default App

