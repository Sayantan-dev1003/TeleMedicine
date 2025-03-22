import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const DoctorHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <>
            <header className="flex flex-col sm:flex-row justify-between items-center bg-[#1f4e3f]/10 p-4 rounded-xl shadow-md border border-green-300/20 backdrop-blur-lg">
                <div className="w-full relative flex items-center gap-4 mt-3 sm:mt-0">
                    <div
                        className=" w-full relative flex items-center justify-end gap-5"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="text-[#064848] text-lg text-right font-semibold">
                            Dr. Sayantan Halder
                        </span>
                        <FontAwesomeIcon
                            icon={faEllipsisV}
                            className="text-[#064848] text-xl cursor-pointer"
                        />

                        {isDropdownOpen && (
                            <button
                                className="absolute -right-2 mt-8  top-6 w-28 text-left  bg-white text-[#064848] px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300  shadow-black shadow-lg"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    console.log("User Signed Out"); // Replace with actual sign-out logic
                                }}
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default DoctorHeader