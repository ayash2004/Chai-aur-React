import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color,setcolor] = useState("black")

  return (
    
      <div className='w-500 h-screen duration-200' style={{backgroundColor: color}}>ahaha
        <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
          <div className='flex flex-wrap justify-center gap-3 text-black bg-white px-3 py-2'>
            <button onClick={() => setcolor("red")} className='outline-none px-4 rounded-full' style={{backgroundColor: "red"}}>Red</button>
            <button onClick={() => setcolor("green")} className='outline-none px-4 ' style={{backgroundColor: "green"}}>Green</button>
            <button onClick={() => setcolor("yellow")} className='outline-none px-4 ' style={{backgroundColor: "Yellow"}}>Yellow</button>
          </div>
        </div>
      </div>
    
  )
}

export default App
