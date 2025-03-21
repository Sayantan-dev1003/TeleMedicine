import React from 'react'
import Home from "../Components/Home"
import About from '../Components/About'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'
import Chatbot from '../Components/ChatBot'

const Hero = () => {
  return (
    <>
      <div className='flex flex-col w-full'>
        <div id='home'><Home /></div>
        <div id='about'><About /></div>
        <div id='contact'><Contact /></div>
        <div id='footer'><Footer /></div>
      </div>
      <Chatbot />
    </>
  )
}

export default Hero