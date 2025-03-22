import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const PatientHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [patientName, setPatientName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/patient')
            .then(response => {
                setPatientName(response.data.name);
            })
            .catch(error => console.error("Error fetching patient data:", error));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="flex flex-col items-end bg-[#1f4e3f]/10 p-4 rounded-xl shadow-md border border-green-300/20 backdrop-blur-lg">
            <div className="relative flex items-center gap-4 mt-3 sm:mt-0">
                <div className="relative flex items-center gap-5" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <span className="text-[#064848] text-lg font-semibold">{patientName}</span>
                    <FontAwesomeIcon icon={faEllipsisV} className="text-[#064848] text-xl cursor-pointer" />

                    {isDropdownOpen && (
                        <button
                            className="absolute -right-2 top-6 w-2/3 text-left bg-white text-[#064848] px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default PatientHeader;