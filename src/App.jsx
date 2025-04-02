// App.jsx

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ThisWeekend from './pages/ThisWeekend'
import Standings from './pages/Standings'
import Statistics from './pages/Statistics'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="this-weekend" element={<ThisWeekend />} />
        <Route path="standings" element={<Standings />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
    </Routes>
  )
}

export default App