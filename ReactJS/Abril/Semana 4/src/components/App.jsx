import { useDispatch, useSelector } from 'react-redux'

function App() {

  const dispatch = useDispatch();
  const count = useSelector((state)=>{
    return state
  })

  return (
    <>
      <h4>Hello World!</h4>
      <button onClick={()=>{
       dispatch({type: 'INCREMENT'})
      }}>Clicked {count} times
      </button>
      <button onClick={()=>{
        dispatch({type: 'DECREMENT'})
      }}>-</button>
    </>
  )
}

export default App
