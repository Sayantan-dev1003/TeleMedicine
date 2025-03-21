import React from 'react';
import LandingImage from "../../public/Landingimg.jpg";
import Navbar from './Navbar';

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen bg-cover bg-center backdrop-blur-2xl brightness-90 flex justify-center items-center" style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${LandingImage})`
            }}>
                <div className='items-center flex flex-col gap-5 text-center w-2/3 relative top-10'>
                    <h1 className='font-bold text-7xl poppins text-white ' style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>Telemedicine</h1>
                    <p className='font-bold text-4xl monterrat text-[#C9E9D2]' style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>Quality Healthcare, Anytime, Anywhere!</p>
                    <p className='font-semibold text-3xl  text-[#C1D8C3] ' style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>Connect with top doctors online for consultations, prescriptions, and expert medical advice from the comfort of your home.</p>

                    <button className='bg-[#0c6f6f] text-white p-6 text-center text-xl rounded-full cursor-pointer poppins hover:bg-yellow-300 hover:text-[#064747] hover:scale-110 transform duration-300 ease-in-out font-bold'>Book an appointment</button>
                </div>

            </div>
        </>
    );
};

export default LandingPage;