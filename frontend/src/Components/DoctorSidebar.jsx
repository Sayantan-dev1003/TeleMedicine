import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FiHome, FiUser, FiCalendar, FiFileText, FiClock, FiBell, FiSettings } from "react-icons/fi";
import { MdDashboard } from 'react-icons/md';

const DoctorSidebar = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    
        const menuItems = [
            { name: "Dashboard", icon: <FiHome />, path: "/doctor-dashboard" },
            { name: "Patients", icon: <FiUser />, path: "/patients-list" },
            { name: "Prescription Form", icon: <FiCalendar />, path: "/prescription-form" },
            // { name: "VideoCalling", icon: <FiFileText />, path: "/prescription" },
            // { name: "Consultation History", icon: <FiClock />, path: "/consultation-history" },
            // { name: "Notifications", icon: <FiBell />, path: "/notifications" },
            // { name: "Settings", icon: <FiSettings />, path: "/settings" }
        ];
    return (
        <>
            <aside className="relative z-10 w-64 bg-gradient-to-b from-[#064848] to-[#0d3733] p-6 rounded-r-3xl shadow-2xl backdrop-blur-lg">
            <h1 className="text-2xl font-bold mb-8 text-[#e6f5ed] drop-shadow-md montserrat">
                TeleMedicine
            </h1>
            <nav>
                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={`flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-[#326060] active:scale-110 
                                    ${activeTab === item.name ? "bg-[#326060]" : ""}`}
                                onClick={() => setActiveTab(item.name)}
                            >
                                <span className="mr-3">{item.icon}</span> {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
        </>
    )
}

export default DoctorSidebar






