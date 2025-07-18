import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import UseCurrencyInfo from './hooks/UseCurrencyInfo.js'
import InputBox from './components/InputBox.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <UseCurrencyInfo /> */}
    {/* <InputBox /> */}
  </StrictMode>,
)
