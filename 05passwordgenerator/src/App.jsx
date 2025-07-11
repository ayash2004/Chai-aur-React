import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {  
    let pass = ""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbers) str += "0123456789"
    if (characters) str += "!@#$%^&*()_+={}[]`~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  }, [length, numbers, characters, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

    useEffect(() => {
    passwordGenerator()
  }, [length, numbers, characters, passwordGenerator])


  return (
    <>
      <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
      <div className="w-full bg-gray-800  shadow-md max-w-md mx-auto text-orange-500 rounded-lg px-4 my-8"> 
      <div className='flex shadow rounded-mg overflow-hidden mb-4 '>
        <input type="text" value={password} className='outline-none bg-gray-800 w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0  '>Copy </button>
      </div>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={20}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
      <div className='flex items-center gap-x-1'>  
        <input 
        type="checkbox"
        id='numberInput'
        defaultChecked= {numbers}
        onChange={() => {
          setNumbers((prev) => (!prev));
        }} 
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        id='charInput'
        defaultChecked= {characters}
        onChange={() => {
          setCharacters((prev) => (!prev));
        }} 
        />
        <label htmlFor="charInput">Characters</label>
      </div>

      </div>
      </div>
        
    </>
  )
}

export default App
