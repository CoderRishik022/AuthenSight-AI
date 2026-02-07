import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import Profiles from './pages/Profiles.js'
import Reports from './pages/Reports.js'

import './App.css'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profiles" element={<Profiles/>} />
      <Route path="/reports" element={<Reports/>} />
    </Routes>
  )
}

export default App
