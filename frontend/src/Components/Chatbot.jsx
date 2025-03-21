import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faXmark } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        let timer;
        if (!isOpen) {
            timer = setTimeout(() => {
                setShowWelcome(true);
            }, 3000);
        } else {
            setShowWelcome(false);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isOpen]);

    return (
        <div className="fixed bottom-4 right-4">
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
                        0% {
                            opacity: 0;
                        }
                        50% {
                            opacity: 0.5
                        }
                        100% {
                            opacity: 1;
                        }
                    }

                    .welcome-message {
                        animation: slideIn 0.5s forwards, fadeIn 0.5s forwards;
                    }
                `}
            </style>

            <div className="relative transition-all duration-700">
                {showWelcome && (
                    <div className="absolute w-64 right-16 bottom-0 bg-[#027c7c] text-white rounded-full px-5 py-4 transition-all duration-300 welcome-message flex items-center justify-between text-base">
                        <span>Welcome! Click to chat.</span>
                        <button 
                            className="text-white cursor-pointer text-base font-bold" 
                            onClick={() => setShowWelcome(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                )}
                <button
                    onClick={toggleChat}
                    className="bg-[#027c7c] text-white rounded-full px-5 py-4 cursor-pointer transition-all duration-700 hover:rotate-180"
                >
                    <FontAwesomeIcon icon={faRobot} />
                </button>
            </div>

            {/* Chat Section */}
            {isOpen && (
                <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-96 flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Chat with us</h2>
                        <button onClick={toggleChat} className="text-red-500">X</button>
                    </div>
                    <div className="flex-1 overflow-y-auto mt-2">
                        <div className="p-2 bg-gray-200 rounded mb-2">Hello! How can I help you?</div>
                    </div>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="border rounded p-2 mt-2"
                    />
                </div>
            )}
        </div>
    );
};

export default Chatbot;