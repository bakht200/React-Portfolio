import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AdminAuthProvider } from './admin/AdminAuthContext.jsx'
import { ContentProvider } from './content/ContentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContentProvider>
      <AdminAuthProvider>
        <BrowserRouter
          basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}
        >
          <App />
        </BrowserRouter>
      </AdminAuthProvider>
    </ContentProvider>
  </StrictMode>,
)
