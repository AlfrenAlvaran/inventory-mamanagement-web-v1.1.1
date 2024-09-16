import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import ManagementContextProvider from './context/Context.jsx'
createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <ManagementContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ManagementContextProvider>
  </CookiesProvider>
)
