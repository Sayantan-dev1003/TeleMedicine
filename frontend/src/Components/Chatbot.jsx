import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faXmark } from '@fortawesome/free-solid-svg-icons';
import Signup from "./Signup";
import Signin from "./Signin";
import Cookies from 'js-cookie';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSigninOpen, setIsSigninOpen] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');

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
        const token = Cookies.get('token');
        if (!token) {
            setIsSignupOpen(true);
            setIsSigninOpen(false);
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInput.trim() === '') return;

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: userInput }),
            });

            const data = await response.json();
            setChatResponse(data.response);
            setUserInput(''); // Clear input after sending
        } catch (error) {
            console.error('Error:', error);
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
                        className="bg-[#027c7c] text-white rounded-full px-4 py-4 cursor-pointer transition-all duration-700 hover:rotate-180"
                    >
                        <FontAwesomeIcon icon={faRobot} className='text-xl' />
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
                    <div className="bg-[#e8ffff] shadow-lg rounded-lg p-4 w-80 h-148 flex flex-col text-sm">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-[#064848]">Chat with us</h2>
                            <button onClick={toggleChat} className="text-[#064848]">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto mt-2">
                            <div className="p-2 bg-transparent mb-2 text-[#027c7c]">Hello! I'm your healthcare assistant. Please describe your symptoms.</div>
                            {chatResponse && (
                                <p
                                    style={{ whiteSpace: "pre-line" }}
                                    className="p-2 bg-transparent mb-2 text-[#027c7c]"
                                    dangerouslySetInnerHTML={{ __html: chatResponse.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                                />
                            )}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="border rounded p-2 mt-2 text-[#027c7c]"
                                value={userInput}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </form>
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