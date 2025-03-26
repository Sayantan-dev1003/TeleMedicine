import React from "react";
import Sidebar from "../../Components/Sidebar";
import PatientHeader from "../../Components/PatientHeader";

const DoctorList = () => {
  const doctors = [
    {
      name: "Chandan Bishoyi",
      specialization: "Cardiologist",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      image: "https://randomuser.me/api/portraits/women/62.jpg",
    },
    {
      name: "Dr. Prithviraj Verma",
      specialization: "Dermatologist",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
      name: "Dr. Prithviraj Verma",
      specialization: "Dermatologist",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];

  return (
    <div className="flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins">
      <Sidebar />
      <div className="relative z-10 flex-1 p-6">
        <PatientHeader />
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-6">
          Doctors List
        </h2>
        <div className="flex flex-wrap gap-6 justify-center mt-6 p-2">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#2ab083] to-[#105b56] text-white shadow-lg rounded-xl p-6 text-center w-72 transition-all duration-300 hover:scale-105"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 mx-auto rounded-full border-2 border-white mb-4"
              />
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-200">{doctor.specialization}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
