import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import WorkPage from './pages/WorkPage/WorkPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import ProjectPage from "./components/ProjectManager/ProjectManager"
import { Routes, Route } from 'react-router-dom'
import "./App.css"
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

export default function App() {
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
