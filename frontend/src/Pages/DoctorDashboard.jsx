import React from "react";
import DeliveryImg from "../../public/adminDr.jpg";
import DoctorSidebar from "../Components/DoctorSidebar";
import DoctorHeader from "../Components/DoctorHeader";

const DoctorDashboard = () => {
  return (
    <div className="flex h-screen bg-cover bg-center text-white relative bg-[#d8efed]">
      <DoctorSidebar />
      <main className="relative z-10 flex-1 p-6">
        <DoctorHeader />
        <section
          className="w-full relative z-[-10] p-16 rounded-xl mt-6 shadow-lg backdrop-blur-xl border border-green-300/20 bg-[#1f4e3f]/10 text-white flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: `url(${DeliveryImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full flex flex-col items-start justify-center relative z-10">
            <h3 className="text-3xl font-semibold  bg-gradient-to-r from-[#ffff] to-[#b0eede] text-transparent bg-clip-text">
              Today's Appointment
            </h3>
            <p className="text-lg mt-2">See your today's patients list</p>

            <button
              className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out 
              hover:bg-[#1f4e3f] hover:text-white hover:scale-105 
              active:scale-95 active:bg-[#163d31]"
            >
              See List
            </button>
          </div>
        </section>

        {/* Specialist Section */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-[#163c25]">
            Specialist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Prescription",
                desc: "See your previous prescriptions",
                img: DeliveryImg,
              },

              {
                title: "Doctor's Off Days",
                desc: "I will be unavailable on the selected dates",
                img: DeliveryImg,
              },
            ].map((specialty, index) => (
              <div
                key={index}
                className="relative z-0 p-8 bg-gradient-to-b from-[#49e1e1] to-[#0d3733] rounded-xl shadow-lg backdrop-blur-xl border border-green-300/20 bg-[#1f4e3f]/10 text-white flex flex-col justify-center items-center text-center"
              >
                <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#ffff] to-[#90b7aa] text-transparent bg-clip-text">
                    {specialty.title}
                  </h3>
                  <p className="text-lg mt-2">{specialty.desc}</p>
                  <button
                    className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out 
            hover:bg-[#68b89f] hover:text-white hover:scale-105 
            active:scale-95 active:bg-[#163d31]"
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;