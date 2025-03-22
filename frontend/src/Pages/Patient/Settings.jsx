import React from 'react'
import Sidebar from '../../Components/Sidebar'
import PatientHeader from '../../Components/PatientHeader'

const Settings = () => {
  return (
    <>
      <div className='flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins'>
        <Sidebar />
        <div className='relative z-10 flex-1 p-6'>
          <PatientHeader />
        </div>
      </div>
    </>
  )
}

export default Settings