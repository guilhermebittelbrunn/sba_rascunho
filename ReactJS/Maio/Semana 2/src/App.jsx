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
      <h4>Positions</h4>
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


     
    </>
  )
}

export default App
