import React from "react";
import Sidebar from "../../Components/Sidebar";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";

const PatientList = () => {
  const patients = [
    {
      name: "Rajesh Kumar",
      age: 45,
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
    },
    {
      name: "Ananya Sharma",
      age: 29,
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      name: "Vikram Singh",
      age: 38,
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      name: "Sneha Verma",
      age: 33,
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/60.jpg",
    },
  ];

  return (
    <div className="flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins">
      <DoctorSidebar />
      <div className="relative z-10 flex-1 p-6">
        <DoctorHeader />
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-6">
          Patient List
        </h2>
        <div className="flex flex-wrap gap-6 justify-center p-6">
          {patients.map((patient, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#2ab083] to-[#105b56] text-white shadow-lg rounded-xl p-6 text-center w-72 transition-all duration-300 hover:scale-105"
            >
              <img
                src={patient.image}
                alt={patient.name}
                className="w-24 h-24 mx-auto rounded-full border-2 border-white mb-4"
              />
              <h3 className="text-xl font-semibold">{patient.name}</h3>
              <p className="text-gray-200">Age: {patient.age}</p>
              <p className="text-gray-200">Gender: {patient.gender}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
