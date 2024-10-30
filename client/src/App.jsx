import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
        <Route path="/Projects" element={<Projects />}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}
export default App;