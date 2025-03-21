import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUserMd, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ setIsSignupOpen, setIsSigninOpen }) => {
    const [userType, setUserType] = useState("patient");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("/login", {
                email,
                password,
                userType,
            }, { withCredentials: true });
            console.log(response)
            setSuccess(`Login successful as ${userType}`);
            setIsSigninOpen(false);
            navigate(userType === "patient" ? "/patient-dashboard" : "/doctor-dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Invalid email or password. Please try again.");
        }
    };

    // Close the modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.id === "signin-modal") {
                setIsSigninOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <section id="signin-modal" className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-[rgba(17,22,28,0.8)] z-50">
            <div className="w-[40vw] flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Sign In</h2>

                {/* Close Button */}
                <button
                    className="relative bottom-14 left-56 text-gray-700 text-xl cursor-pointer"
                    onClick={() => setIsSigninOpen(false)}
                    aria-label="Close Sign In Modal"
                >
                    ✖
                </button>

                {/* User Type Selection */}
                <div className="flex gap-4 mb-6 justify-center w-full">
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${userType === "patient" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setUserType("patient")}
                        aria-label="Select Patient Role"
                    >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Patient
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${userType === "doctor" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setUserType("doctor")}
                        aria-label="Select Doctor Role"
                    >
                        <FontAwesomeIcon icon={faUserMd} className="mr-2" />
                        Doctor
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Success Message */}
                {success && <p className="text-green-500">{success}</p>}

                <form className="w-full flex flex-col gap-3 text-gray-500" onSubmit={handleSubmit}>
                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-lg outline-none transition-all duration-300 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email Address"
                        />
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-lg outline-none transition-all duration-300 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                        />
                    </div>

                    <p className="mt-4 text-gray-600 text-center text-sm">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="text-blue-400 font-semibold hover:underline hover:text-blue-600 cursor-pointer"
                            onClick={() => { setIsSigninOpen(false); setIsSignupOpen(true); }}
                            aria-label="Register here"
                        >
                            Register here
                        </button>
                    </p>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                    >
                        {userType === "patient" ? "Sign in as Patient" : "Sign in as Doctor"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Signin;