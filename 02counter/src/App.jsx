import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCount] = useState(0)

  const addValue = () =>{
    console.log("Clicled ", Math.random());
    console.log(counter); 
    if (counter == 20) {
      return;
    }
    else
    setCount(counter + 1)
  }

  const removeValue = () => { 
    if (counter == 0) {
      return;
    }
    else
    setCount (counter- 1)
  }
  return (
    <>
      <div>
        <h1>Chai aur React</h1>
        <h3>Counter Value {counter}</h3>
        <button onClick={addValue}>Add Value {counter}</button>
        <br />
        <br />
        <button onClick={removeValue}>Remove Value {counter}</button>
      </div>
      
      
    </>
  )
}

export default App
