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

      <nav className="container w-screen h-24 bg-slate-500 mx-auto p-2 text-xs ">
        <h3>Logo</h3>
        <ul className="dis">
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
      </nav>
      <div className="container w-screen h-48 bg-green-700 mx-auto md:bg-blue-700 md:text-white p-2">
        <h2>Title</h2>
        <p>Content</p>
      </div>
     
    </>
  )
}

export default App
