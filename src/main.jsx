import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AddProvider } from './contexts/app/app-context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <AddProvider>
       <App />
    </AddProvider>
    
  
)
