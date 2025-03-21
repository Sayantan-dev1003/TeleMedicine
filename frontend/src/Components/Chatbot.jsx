import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faXmark } from '@fortawesome/free-solid-svg-icons';
import Signup from "./Signup";
import Signin from "./Signin";
import Cookies from 'js-cookie'; // Import js-cookie

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSigninOpen, setIsSigninOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
        setShowWelcome(false);
    };

    useEffect(() => {
        let timer;
        if (!isOpen) {
            timer = setTimeout(() => {
                setShowWelcome(true);
            }, 3000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isOpen]);

    const handleInputFocus = () => {
        // Check if the token is present in the cookie
        const token = Cookies.get('token'); // Replace 'token' with your actual cookie name
        if (!token) {
            setIsSignupOpen(true); // Show Signup first
            setIsSigninOpen(false); // Ensure Signin is closed
        }
    };

    return (
        <>
            <div className="fixed bottom-4 right-4 poppins">
                <style>
                    {`
                        @keyframes slideIn {
                            0% {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                            100% {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }
                        @keyframes fadeIn {
                            0% { opacity: 0; }
                            50% { opacity: 0.5; }
                            100% { opacity: 1; }
                        }
                        .welcome-message {
                            animation: slideIn 0.5s forwards, fadeIn 0.5s forwards;
                        }
                    `}
                </style>

                {/* Robot Icon - Hidden when chat is open */}
                {!isOpen && (
                    <button
                        onClick={toggleChat}
                        className="bg-[#027c7c] text-white rounded-full px-5 py-4 cursor-pointer transition-all duration-700 hover:rotate-180"
                    >
                        <FontAwesomeIcon icon={faRobot} />
                    </button>
                )}

                {/* Welcome Message */}
                {showWelcome && !isOpen && (
                    <div className="absolute w-64 right-16 bottom-0 bg-[#027c7c] text-white rounded-full px-5 py-4 transition-all duration-300 welcome-message flex items-center justify-between text-base">
                        <span>Welcome! Click to chat.</span>
                        <button 
                            className="text-white cursor-pointer text-base font-bold" 
                            onClick={toggleChat}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                )}

                {/* Chat Section */}
                {isOpen && (
                    <div className="bg-[#e8ffff] shadow-lg rounded-lg p-4 w-80 h-148 flex flex-col">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-[#064848]">Chat with us</h2>
                            <button onClick={toggleChat} className="text-[#064848]">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto mt-2">
                            <div className="p-2 bg-transparent mb-2 text-[#027c7c]">Hello! How can I help you?</div>
                        </div>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="border rounded p-2 mt-2"
                            onFocus={handleInputFocus} // Check for token on focus
                        />
                    </div>
                )}
            </div>

            {/* Render Signup and Signin components */}
            {isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
            {isSigninOpen && <Signin setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
        </>
    );
};

export default Chatbot;   