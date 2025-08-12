import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouterProvider } from './app/router'
import { AuthProvider } from './app/AuthProvider'
import './app/styles.css'   

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <AuthProvider>
     <AppRouterProvider />
    </AuthProvider>
  </StrictMode>,
)
