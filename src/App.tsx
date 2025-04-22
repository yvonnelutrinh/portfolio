import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import WorkPage from './pages/WorkPage/WorkPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import ProjectPage from "./components/ProjectManager/ProjectManager"
import { Routes, Route, useLocation } from 'react-router-dom'
import "./App.css"
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import { useEffect } from 'react';
import { tagPageView, tagRageClick, tagFeatureUsage } from './utils/clarityTag';

export default function App() {
  const location = useLocation();

  // Tag page view on route change
  useEffect(() => {
    // Use the route path as page name, e.g., 'home', 'about', etc.
    const pageName = location.pathname === '/' ? 'home' : location.pathname.replace(/^\//, '').replace(/\/.*/, '').toLowerCase();
    // Tag the page view
    // Clarity tag: viewed_<page_name>
    tagPageView(pageName);
  }, [location]);

  // Rage click detection
  useEffect(() => {
    let lastClickTime = 0;
    let clickCount = 0;
    let lastX = 0, lastY = 0;
    const threshold = 5; // px radius
    const maxInterval = 700; // ms
    const minClicks = 4; // rapid clicks to trigger

    function onClick(e: MouseEvent) {
      const now = Date.now();
      const x = e.clientX, y = e.clientY;
      if (now - lastClickTime < maxInterval && Math.abs(x - lastX) < threshold && Math.abs(y - lastY) < threshold) {
        clickCount++;
        if (clickCount >= minClicks) {
          // Clarity tag: rage_click_detected
          tagRageClick();
          clickCount = 0;
        }
      } else {
        clickCount = 1;
      }
      lastClickTime = now;
      lastX = x;
      lastY = y;
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  // Theme change detection (tracks changes to data-theme on html/body)
  useEffect(() => {
    function getTheme() {
      // Prefer html[data-theme], fallback to body[data-theme]
      return (
        document.documentElement.getAttribute('data-theme') ||
        document.body.getAttribute('data-theme') ||
        ''
      );
    }
    let lastTheme = getTheme();
    function checkTheme() {
      const currentTheme = getTheme();
      if (currentTheme && currentTheme !== lastTheme) {
        // Tag theme change
        // Clarity tag: used_theme_<theme>
        tagFeatureUsage(`theme_${currentTheme}`);
        lastTheme = currentTheme;
      }
    }
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:id" element={<ProjectPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
