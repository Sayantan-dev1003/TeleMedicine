import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faRobot, faXmark } from '@fortawesome/free-solid-svg-icons';
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
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

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

        // Stop listening if active
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: userInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setChatResponse(data.response);
            setUserInput('');
        } catch (error) {
            console.error('Error:', error);
            setChatResponse("Sorry, there was an error processing your request.");
        }
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser. Please use Chrome.');
            return;
        }

        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.continuous = false;
        newRecognition.interimResults = false;
        newRecognition.lang = 'en-US';

        newRecognition.onstart = () => {
            setIsListening(true);
        };

        newRecognition.onresult = (event) => {
            const speechText = event.results[0][0].transcript;
            setUserInput(speechText);
        };

        newRecognition.onerror = (event) => {
            if (event.error === 'no-speech') {
                alert('No speech detected. Please try again.');
            } else if (event.error === 'audio-capture') {
                alert('No microphone was found. Ensure that a microphone is connected.');
            } else if (event.error === 'not-allowed') {
                alert('Permission to use microphone was denied.');
            } else {
                alert(`Speech recognition error: ${event.error}`);
            }
        };

        newRecognition.onend = () => {
            setIsListening(false);
        };

        newRecognition.start();
        setRecognition(newRecognition);
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

                {!isOpen && (
                    <button
                        onClick={toggleChat}
                        className="bg-[#027c7c] text-white rounded-full px-4 py-4 cursor-pointer transition-all duration-700 hover:rotate-180"
                    >
                        <FontAwesomeIcon icon={faRobot} className='text-xl' />
                    </button>
                )}

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
                        <form onSubmit={handleSubmit} className='w-full flex items-center'>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full border rounded p-2 mt-2 text-[#027c7c]"
                                value={userInput}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                            <button type="button" onClick={startListening} className='text-[#027c7c] text-lg relative right-6 top-1'>
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
            {isSigninOpen && <Signin setIsSignupOpen={setIsSignupOpen} setIsSigninOpen={setIsSigninOpen} />}
        </>
    );
};

export default Chatbot;