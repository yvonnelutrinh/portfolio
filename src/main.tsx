import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { initFaviconAnimation } from '../tools/favicon/favicon-animation'

import LogRocket from 'logrocket';
LogRocket.init('sfmvyy/portfolio');

// initialize favicon animation with custom settings
initFaviconAnimation({
  animationSpeed: 250, // slightly faster animation
  randomizeOrder: false
})

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>,
)