import React from 'react'
import Home from "../Components/Home"
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'

const Hero = () => {
  return (
    <>
      <div className='flex flex-col w-full'>
        <div id='home'><Home /></div>
        <div id='contact'><Contact /></div>
        <div id='footer'><Footer /></div>
      </div>
    </>
  )
}

export default Hero