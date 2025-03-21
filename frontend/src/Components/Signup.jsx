import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faIdCard, faLock, faPhone, faUser, faCalendar, faVenusMars, faMapMarkerAlt, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsSignupOpen, setIsSigninOpen }) => {
    const [userType, setUserType] = useState("patient");
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        location: "",
        medicalRegNo: "",
        specialization: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Remove unnecessary fields based on user type
        const payload = { ...formData, userType };
        if (userType === "patient") {
            delete payload.medicalRegNo;
            delete payload.specialization;
        }

        try {
            const response = await axios.post("/register", payload, {
                headers: { "Content-Type": "application/json" },
            });

            setSuccess(response.data.message);
            setFormData({
                fullname: "",
                email: "",
                phone: "",
                password: "",
                dateOfBirth: "",
                gender: "",
                location: "",
                medicalRegNo: "",
                specialization: ""
            });

            setIsSignupOpen(false);
            navigate(userType === "patient" ? "/patient-dashboard" : "/doctor-dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed!");
        }
    };

    // Close the modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.id === "signup-modal") {
                setIsSignupOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    // Function to open login form
    const openLogin = () => {
        setIsSignupOpen(false);
        setIsSigninOpen(true);
    };

    return (
        <section
            id="signup-modal"
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-[rgba(17,22,28,0.8)] z-50"
        >
            <div className="w-[60vw] flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-blue-800 mt-2 text-center mb-6">
                    Telemedicine Signup
                </h2>

                {/* Close Button */}
                <button className="relative bottom-14 left-56 text-gray-500 cursor-pointer text-xl font-bold" onClick={() => setIsSignupOpen(false)}>
                    ✖
                </button>

                {/* User Type Selection */}
                <div className="flex gap-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer hover:scale-105 ${userType === "patient" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setUserType("patient")}
                    >
                        Patient
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer hover:scale-105 ${userType === "doctor" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setUserType("doctor")}
                    >
                        Doctor
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Success Message */}
                {success && <p className="text-green-500">{success}</p>}

                {/* Signup Form */}
                <form className="w-full flex flex-col gap-3 text-gray-500" onSubmit={handleSubmit}>
                    <div className="w-full flex gap-4">
                        <div className="relative w-1/2">
                            <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required />
                        </div>
                        <div className="relative w-1/2">
                            <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="relative w-1/2">
                            <FontAwesomeIcon icon={faPhone} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required />
                        </div>
                        <div className="relative w-1/2">
                            <FontAwesomeIcon icon={faCalendar} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="relative w-1/2">
                            <FontAwesomeIcon icon={faVenusMars} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="relative w-1/2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required />
                        </div>
                    </div>

                    {/* Doctor-Specific Fields */}
                    {userType === "doctor" && (
                        <>
                            <div className="w-full flex gap-4">
                                <div className="relative w-1/2">
                                    <FontAwesomeIcon icon={faIdCard} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input type="text" name="medicalRegNo" value={formData.medicalRegNo} onChange={handleChange} placeholder="Medical Registration Number" className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required />
                                </div>
                                <div className="relative w-1/2">
                                    <FontAwesomeIcon icon={faStethoscope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:border-blue-500" required />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="relative w-[49%]">
                        <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            value={userType === "attendee" ? formData.password : formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-lg outline-none transition-all duration-300 focus:border-blue-500"
                            required
                        />
                    </div>
                    <p className="mt-4 text-gray-600 text-center text-sm">
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="text-blue-400 font-semibold hover:underline hover:text-blue-600 cursor-pointer"
                            onClick={openLogin}
                        >
                            Login
                        </button>
                    </p>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                    >
                        {userType === "patient" ? "Register as Patient" : "Register as Doctor"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Signup;