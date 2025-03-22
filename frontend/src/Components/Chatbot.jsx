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
    const [chatHistory, setChatHistory] = useState([]);
    const [chatState, setChatState] = useState({});
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
                body: JSON.stringify({ input: userInput, state: chatState }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            setChatHistory([...chatHistory, { user: userInput }, { bot: data.response }]);
    
            setChatState(data.state || {});

            setChatResponse(data.response);

            setUserInput('');
        } catch (error) {
            console.error('Error:', error);
            setChatHistory([...chatHistory, { bot: "Sorry, there was an error processing your request." }]);
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
            setIsListening(false);
            alert(`Speech recognition error: ${event.error}`);
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
                {!isOpen && (
                    <button
                        onClick={toggleChat}
                        className="bg-[#027c7c] text-white rounded-full px-4 py-4 cursor-pointer transition-all duration-700 hover:rotate-180"
                    >
                        <FontAwesomeIcon icon={faRobot} className='text-xl' />
                    </button>
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
                            {chatHistory.map((msg, index) => (
                                <p 
                                style={{whiteSpace: 'pre-line'}}
                                key={index} 
                                className={`p-2 mb-2 ${msg.user ? "text-black" : "text-[#027c7c]"}`}
                                dangerouslySetInnerHTML={{ __html: msg.user ? `👤 ${msg.user}` : `🤖 ${msg.bot}` }}
                            />
                            ))}
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
                            <button type="button" onClick={startListening} className={`text-lg relative right-6 top-1 ${isListening ? "text-red-500 animate-pulse" : "text-[#027c7c]"}`}>
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