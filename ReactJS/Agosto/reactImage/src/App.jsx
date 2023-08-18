import { useEffect, useState } from 'react'
// import './App.css'
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);

  // async function handleClick(){
  //   const {data} = await axios.get('http://localhost:1111/api');
  //   setImage(data);
  // }
  useEffect(()=>{
    (async()=>{
      const {data} = await axios.get('http://localhost:1111/api');
      // const mockBlob = new Blob(['Este é um exemplo de conteúdo de imagem'], { type: 'text/plain' });
      const blobTest = new Blob(data)
      setImage(blobTest);
  // }
    })
  },[])

  return (
    <>
      <h3>hello world</h3>
      {/* <button onClick={handleClick}>add image</button> */}
      {image && <image src={URL.createObjectURL(image)}></image>}
    </>
  )
}

export default App
