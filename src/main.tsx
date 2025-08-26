import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './app/AuthProvider'
import './app/styles.css'   
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
