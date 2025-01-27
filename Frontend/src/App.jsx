
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
import Companies from './components/admin/Companies.jsx'
import CompaniesCreate from './components/admin/CompaniesCreate.jsx'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import AdminCreateJob from './components/admin/AdminCreateJob.jsx'
import Applicants from './components/admin/Applicants.jsx'
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
                <Route path='/admin/companies' element={<Companies/>} />
                <Route path='*' element={<Navigate to="/" />} />
                <Route path='/admin/companies/create' element={<CompaniesCreate/>} />
                <Route path='/admin/companies/:companyId' element={<CompanySetup/>} />
                <Route path='/admin/jobs/' element={<AdminJobs/>} />
                <Route path='/admin/job/create' element={<AdminCreateJob/>}/>
                <Route path='/admin/job/:jobId/applicants'element={<Applicants/>}/>
            </Routes>
            <Toaster />
        </>
    )
}

export default App
