import { StrictMode } from 'react'
import '@webspatial/react-sdk'
import '@webspatial/core-sdk'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StyleSheetManager } from 'styled-components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleSheetManager disableCSSOMInjection>
      <App />
    </StyleSheetManager>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(() => {})
  })
}
