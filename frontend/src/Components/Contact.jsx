import React from "react";
import { MdSend } from "react-icons/md";

const Contact = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#D8EFED] px-36">
            <div className="w-2/3">
                <h2 className="text-6xl font-semibold text-[#064848] mb-8 montserrat">Get in Touch</h2>
                <form className="space-y-4 w-full flex flex-col justify-center items-center">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full rounded-full py-3 px-5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064848]"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full py-3 px-5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#064848]"
                    />
                    <textarea
                        placeholder="Message"
                        rows={5}
                        className="w-full p-5 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#064848]"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-[40%] flex items-center justify-center gap-2 bg-[#064848] hover:scale-105 transition-transform duration-300 shadow-lg text-white px-8 py-3 rounded-full text-xl font-semibold cursor-pointer"
                    >
                        Send <MdSend />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;