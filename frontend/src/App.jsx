import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PatientDashboard from './Pages/PatientDashboard'
import DoctorDashboard from './Pages/DoctorDashboard'
import Hero from './Pages/Hero'

const App = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Hero />}></Route>
            <Route path='/patient-dashboard' element={<PatientDashboard />}></Route>
            <Route path='/doctor-dashboard' element={<DoctorDashboard />}></Route>
        </Routes>
    </>
  )
}

export default App