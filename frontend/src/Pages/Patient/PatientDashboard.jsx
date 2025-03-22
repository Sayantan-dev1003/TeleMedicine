import React from "react";
import { useNavigate } from "react-router-dom";
import DeliveryImg from "../../../public/admin.jpg";
import Chatbot from "../../Components/Chatbot";
import Sidebar from "../../Components/Sidebar";
import PatientHeader from "../../Components/PatientHeader";

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins">
      <Sidebar />
      <main className="relative z-10 flex-1 p-6">
        <PatientHeader />

        <section
          className="w-full relative z-[-10] p-16 rounded-xl mt-6 shadow-lg backdrop-blur-xl  bg-[#1f4e3f]/10 text-white flex flex-col justify-center items-center text-center"
          style={{ backgroundImage: `url(${DeliveryImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="w-full relative z-10 flex flex-col justify-center items-start">
            <h3 className="text-3xl font-bold text-white">
              Expert Prescription
            </h3>
            <p className="text-lg mt-2">Better treatment at less cost and less time</p>

            <button className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out 
              hover:bg-[#1f4e3f] hover:text-white hover:scale-105 
              active:scale-95 active:bg-[#163d31]">
              See Previous Prescription
            </button>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-2xl font-bold mb-4 text-[#064848]">Specialist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Video Consultation", desc: "Instant expert advice via video call", img: DeliveryImg, route: "/video-consultation" },
              { title: "Medicine Recommendation", desc: "Reliable solutions for common health concerns", img: DeliveryImg, route: "/medicine-recommendation" },
              { title: "Nearby Hospitals", desc: "Find trusted healthcare facilities within a 20-25 km radius for quick and reliable medical assistance.", img: DeliveryImg, route: "/patient-support" },
            ].map((specialty, index) => (
              <div key={index} onClick={() => navigate(specialty.route)} className="relative z-0 p-8 rounded-xl shadow-lg backdrop-blur-xl bg-gradient-to-b from-[#69afaf] to-[#0e5952] text-white flex flex-col justify-center items-center text-center cursor-pointer">
                <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white">
                    {specialty.title}
                  </h3>
                  <p className=" text-sm mt-2 text-gray-300">{specialty.desc}</p>
                  <button className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out hover:scale-105">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Chatbot />
      </main>
    </div>
  );
};

export default PatientDashboard;
