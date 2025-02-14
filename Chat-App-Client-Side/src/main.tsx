import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './login-screen-styles.css'
import './main-screen-styles.css'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
//import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routing/Router.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  </StrictMode>,
)
