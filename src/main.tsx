import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { initFaviconAnimation } from '../tools/favicon/favicon-animation.ts'
import LogRocket from 'logrocket';
import getOrCreateAnonymousId from '../tools/userId/userId.ts'
import Clarity from '@microsoft/clarity';

// initialize clarity
const projectId = "r8am77133l";

Clarity.init(projectId);

// Clarity user identification (match LogRocket anonymous user)
Clarity.identify(getOrCreateAnonymousId());

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

// Global error tracking for Clarity
window.onerror = function() {
  // Tag uncaught JS errors
  // Clarity tag: error_js
  Clarity.setTag('event', 'error_js');
  return false;
};
window.onunhandledrejection = function() {
  // Tag unhandled promise rejections
  // Clarity tag: error_promise
  Clarity.setTag('event', 'error_promise');
  return false;
};

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>,
)