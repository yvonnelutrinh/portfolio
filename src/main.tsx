import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { initFaviconAnimation } from '../tools/favicon/favicon-animation.ts'
import LogRocket from 'logrocket';
import getOrCreateAnonymousId from '../tools/userId/userId.ts'

// logRocket initialization and anonymous user id 
LogRocket.init('sfmvyy/portfolio');
LogRocket.identify(getOrCreateAnonymousId(), {
  type: 'anonymous',
});

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