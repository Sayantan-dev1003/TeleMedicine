import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Pages/Hero'
import PatientDashboard from './Pages/PatientDashboard'
import VideoConsultation from './Pages/VideoConsultation'
import PatientSupport from './Pages/PatientSupport'
import MedicineRecommendation from './Pages/MedicineRecommendation'

import DoctorDashboard from './Pages/DoctorDashboard'

const App = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Hero />}></Route>

            <Route path='/patient-dashboard' element={<PatientDashboard />}></Route>
            <Route path='/video-consultation' element={<VideoConsultation />}></Route>
            <Route path='/medicine-recommendation' element={<MedicineRecommendation />}></Route>
            <Route path='/patient-support' element={<PatientSupport />}></Route>

            <Route path='/doctor-dashboard' element={<DoctorDashboard />}></Route>
        </Routes>
    </>
  )
}

export default App