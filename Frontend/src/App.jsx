
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

import Login from './components/auth/Login.jsx'
import SignUp from './components/auth/SignUp'
import Home from './components/Home.jsx'
import { Toaster } from 'react-hot-toast'
import { useEffect, } from 'react'


import { useAuthStore } from './store/useAuthStore'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobsDescription from './components/JobsDescription.jsx'
function App() {

    const { authUser, checkAuth, } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [])

    return (

        <>
            <Navbar />
            
            <Routes>
                <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/contact" element={<h1>Contact</h1>} />
                <Route path="/jobs" element={<Jobs/>} />
                <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
                <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" />} />
                <Route path='/browse' element={<Browse  />} />
                <Route path="/profile" element={authUser ? <Profile/> : <Navigate to="/login" />} />
                <Route path='/description/:id' element={<JobsDescription />} />
            </Routes>
            <Toaster />
        </>
    )
}

export default App
