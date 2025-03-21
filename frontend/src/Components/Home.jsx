import React from 'react';
import LandingImage from "../../public/Landingimg.jpg";
import Navbar from './Navbar';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div 
                className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex justify-end p-8 items-center poppins" 
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.9) 70%),
                        url(${LandingImage})
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top left'
                }}
            >
                <div className='flex flex-col gap-5 text-right w-[55%] relative justify-center items-end top-10'>
                    <h1 className='font-bold text-7xl poppins text-[#81dede] montserrat' 
                        style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>
                        TeleMedicine
                    </h1>
                    <p className='font-bold text-2xl montserrat text-white' 
                        style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>
                        Quality Healthcare, Anytime, Anywhere!
                    </p>
                    <p className='font-semibold text-lg text-white' 
                        style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>
                        Connect with top doctors online for consultations, prescriptions, and expert medical advice from the comfort of your home.
                    </p>

                    <ScrollLink to="about" smooth={true} className='bg-[#027c7c] text-white mt-5 w-52 px-6 py-3 tracking-wider text-center text-xl rounded-full cursor-pointer poppins hover:bg-[#81dede] hover:text-[#064747] hover:scale-110 transform duration-300 ease-in-out font-bold'>
                        Get Started <FontAwesomeIcon icon={faArrowRight} />
                    </ScrollLink>
                </div>
            </div>
        </>
    );
};

export default LandingPage;