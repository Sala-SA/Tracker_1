import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { SearchProvider } from './context/SearchContext'

const root = createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <SearchProvider>
      <App />
    </SearchProvider>
  </HashRouter>
)

// register our manual service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch(err => console.error('SW registration failed:', err))
  })
}
