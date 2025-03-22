import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Pages/Hero'

import Appointments from "./Pages/Patient/Appointments"
import ConsultationHistory from "./Pages/Patient/ConsultationHistory"
import DoctorsList from "./Pages/Patient/DoctorsList"
import MedicineRecommendation from './Pages/Patient/MedicineRecommendation'
import Notifications from './Pages/Patient/Notifications'
import PatientDashboard from './Pages/Patient/PatientDashboard'
import PatientSupport from './Pages/Patient/PatientSupport'
import Prescription from './Pages/Patient/Prescription'
import Settings from './Pages/Patient/Settings'
import VideoConsultation from './Pages/Patient/VideoConsultation'

import DoctorDashboard from './Pages/DoctorDashboard'

const App = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Hero />}></Route>

            <Route path='/appointments' element={<Appointments />}></Route>
            <Route path='/consultation-history' element={<ConsultationHistory />}></Route>
            <Route path='/doctors-list' element={<DoctorsList />}></Route>
            <Route path='/medicine-recommendation' element={<MedicineRecommendation />}></Route>
            <Route path='/notifications' element={<Notifications />}></Route>
            <Route path='/patient-dashboard' element={<PatientDashboard />}></Route>
            <Route path='/patient-support' element={<PatientSupport />}></Route>
            <Route path='/prescription' element={<Prescription />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path='/video-consultation' element={<VideoConsultation />}></Route>

            <Route path='/doctor-dashboard' element={<DoctorDashboard />}></Route>
        </Routes>
    </>
  )
}

export default App