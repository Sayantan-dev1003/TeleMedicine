import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faCalendarCheck, faVideo, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Signup from './Signup'
import Signin from './Signin'

const Navbar = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSigninOpen, setIsSigninOpen] = useState(false);

    return (
        <nav className="w-full fixed z-10 bg-[#064848] py-3 px-8 poppins">
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faHeart} className='fa-solid fa-heart fa-beat text-white text-3xl' />
                    <div className="text-white text-2xl font-bold montserrat">TeleMedicine</div>
                </div>
                <ul className="flex space-x-3">
                    <li
                        className="text-white flex gap-2 items-center hover:text-[#81dede]  cursor-pointer text-xl px-4 py-2 rounded-full hover:bg-[#0d3733] hover:scale-105 transform duration-300 ease-in-out"> <FontAwesomeIcon icon={faHome} className='fa-solid fa-beat text-white text-xl ' />Home
                    </li>
                    <li
                        className="text-white flex gap-2 items-center  hover:text-[#81dede] cursor-pointer text-xl px-4 py-2 rounded-full hover:bg-[#0d3733] hover:scale-105 transform duration-300 ease-in-out"><FontAwesomeIcon icon={faCalendarCheck} className='fa-solid fa-beat text-white text-xl ' />Book Appointment
                    </li>
                    <li
                        className="text-white flex gap-2 items-center hover:text-[#81dede] cursor-pointer text-xl px-4 py-2 rounded-full hover:bg-[#0d3733] hover:scale-105 transform duration-300 ease-in-out"><FontAwesomeIcon icon={faVideo} className='fa-solid fa-beat text-white text-xl ' />Video Consultation
                    </li>
                    <button
                        className="text-[#0d3733] bg-white flex gap-2 items-center hover:text-[#81dede] cursor-pointer text-lg px-4 py-2 rounded-full hover:bg-[#0d3733] hover:scale-105 transform duration-300 ease-in-out font-bold" onClick={() => setIsSignupOpen(true)}><FontAwesomeIcon icon={faUserPlus} className='fa-solid fa-beat text-lg ' />SignUp
                    </button>

                </ul>
            </div>
            {isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
            {isSigninOpen && <Signin setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
        </nav>
    );
};

export default Navbar;