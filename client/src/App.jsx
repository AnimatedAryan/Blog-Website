import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header';
import Footer from './components/Footer';
import Footercom from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup />}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path="/Projects" element={<Projects />}/>
        </Routes>
        <Footer />
        </BrowserRouter>
      
    </div>
  )
}
export default App;