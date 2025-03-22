import React from 'react'
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

const Sidebar = () => {
    return (
        <>
            <aside className="relative z-10 w-64 bg-gradient-to-b from-[#064848] to-[#0d3733] p-6 rounded-r-3xl shadow-2xl backdrop-blur-lg">
                <h1 className="text-2xl font-bold mb-8 text-[#e6f5ed] drop-shadow-md montserrat">
                    TeleMedicine
                </h1>
                <nav>
                    <ul className="space-y-4">
                        <li className="flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-[#326060] active:scale-110">
                            <FiHome className="mr-3" /> Dashboard
                        </li>
                        <li className="flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-[#326060] active:scale-110">
                            <FiUser className="mr-3" /> Doctors
                        </li>
                        <li className="flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-[#326060] active:scale-110">
                            <FiSettings className="mr-3" /> Settings
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar