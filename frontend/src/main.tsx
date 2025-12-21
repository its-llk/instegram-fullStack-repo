import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import {Provider} from 'jotai'
import NotFoundPage from './404 error/page404.tsx'
import { HomePage } from './homePage/homePage.tsx'
import { PostPage } from './postPage/postPage.tsx'
import { ProfilePage } from './profilePage/profilePage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const router = createBrowserRouter([
  {
  path: '/',
  element:<HomePage/>,
  errorElement:<NotFoundPage />,  
  },
  {
  path: '/postPage',
  element:<PostPage/>,
  errorElement:<NotFoundPage />,  
  },
    {
  path: '/ProfilePage/:userId/*',
  element:<ProfilePage/>,  
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
      </QueryClientProvider>
  </Provider>
  </StrictMode>,
) 
