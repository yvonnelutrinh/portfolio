import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import ContactPage from './pages/ContactPage/ContactPage'
import WorkPage from './pages/WorkPage/WorkPage'
import ProcessPage from './pages/ProcessPage/ProcessPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { Routes, Route } from 'react-router-dom'
import "./App.css"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
