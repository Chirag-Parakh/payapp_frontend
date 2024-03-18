import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Dashboard from './Components/Dashboard'

function App() {

  return (
    <>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
