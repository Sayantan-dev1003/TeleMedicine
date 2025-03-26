import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import PrescriptionImg from "../../../../frontend/public/admin.jpg";
import PatientImg from"../../../../frontend/public/patient.jpg"
import PatientHeader from "../../Components/PatientHeader";

const Prescription = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showTable, setShowTable] = useState(false); // Toggle state for prescriptions table

  // Sample Data for Last 7 Days Prescriptions
  const prescriptionData = [
    { 
      id: 1, 
      date: "March 17, 2025", 
      time: "10:00 AM", 
      name: "Nirmal Joshi",
      age: 30,
      gender: "Male",
      phone: "9876543210",
      symptoms: "Fever, Body Pain",
      medicine: "Paracetamol 500mg, Cough Syrup",
      doctorSuggestion: "Drink warm fluids and take rest for 3 days",
      doctorSignature: "Dr. Sayantan Halder",
      doctorId: "DOC12345"
    },
    { 
      id: 2, 
      date: "March 18, 2025", 
      time: "12:30 PM", 
      name: "Sayantan Halder",
      age: 25,
      gender: "Female",
      phone: "9876543211",
      symptoms: "Cough, Sore Throat",
      medicine: "Amoxicillin 250mg",
      doctorSuggestion: "Take antibiotics for 5 days",
      doctorSignature: "Dr. Sayantan Halder",
      doctorId: "DOC12345"
    },
    { id: 3, date: "March 19, 2025", time: "2:45 PM", name: "Chandan Bishoyi", age: 45, gender: "Male", phone: "9876543212", symptoms: "Chest Pain", medicine: "Aspirin 75mg", doctorSuggestion: "Consult cardiologist if pain persists", doctorSignature: "Dr. Sayantan Halder", doctorId: "DOC12345" },
    { id: 4, date: "March 20, 2025", time: "5:15 PM", name: "Emma Wilson", age: 35, gender: "Female", phone: "9876543213", symptoms: "Migraine", medicine: "Sumatriptan 50mg", doctorSuggestion: "Avoid stress, take medicine as required", doctorSignature: "Dr. Sayantan Halder", doctorId: "DOC12345" },
    { id: 5, date: "March 21, 2025", time: "7:30 PM", name: "James Lee", age: 50, gender: "Male", phone: "9876543214", symptoms: "Indigestion", medicine: "Pantoprazole 40mg", doctorSuggestion: "Avoid spicy food, take medicine before meals", doctorSignature: "Dr. Sayantan Halder", doctorId: "DOC12345" },
    { id: 6, date: "March 22, 2025", time: "10:30 AM", name: "Sophia Davis", age: 28, gender: "Female", phone: "9876543215", symptoms: "Allergy", medicine: "Cetirizine 10mg", doctorSuggestion: "Avoid allergens, take medicine once daily", doctorSignature: "Dr. Sayantan Halder", doctorId: "DOC12345" },
    { id: 7, date: "March 23, 2025", time: "12:00 PM", name: "Michael Johnson", age: 40, gender: "Male", phone: "9876543216", symptoms: "Back Pain", medicine: "Diclofenac 50mg", doctorSuggestion: "Apply hot pack, avoid heavy lifting", doctorSignature: "Dr. Sayantan Halder", doctorId: "DOC12345" },
  
  ];

  return (
    <div className="flex min-h-screen bg-cover bg-center text-white relative bg-[#d8efed] poppins">
      <Sidebar />

      <main className="relative z-10 flex-1 p-6">
        
       <PatientHeader/>

        

        {/* Banner Section */}
        <section
          className="w-full relative z-[-10] p-16 rounded-xl mt-6 shadow-lg backdrop-blur-xl border border-green-300/20 bg-[#1f4e3f]/10 text-white flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: `url(${PrescriptionImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full flex flex-col items-center justify-center relative z-10">
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-[#ffff] to-[#b0eede] text-transparent bg-clip-text">
              Previous Prescriptions
            </h3>
            <p className="text-lg mt-2">View and manage your past prescriptions here.</p>

            {/* Toggle Table Button */}
            <button
              className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-6 py-3 rounded-full font-bold transition-all duration-300 ease-in-out 
              hover:bg-[#1f4e3f] hover:text-white hover:scale-105 
              active:scale-95 active:bg-[#163d31]"
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? "Hide Previous Prescriptions" : "Previous Prescription"}
            </button>
          </div>
        </section>

        {/* Prescription Table - Only Shows When Button is Clicked */}
        {showTable && (
          <section className="mt-6 bg-white text-black p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#1f4e3f]">Last 7 Days Prescriptions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-[#1f4e3f] text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionData.map((prescription) => (
                    <tr
                      key={prescription.id}
                      className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer transition-all"
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <td className="py-3 px-6">{prescription.date}</td>
                      <td className="py-3 px-6">{prescription.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

         {/* Prescription Modal - Enhanced */}
{selectedPrescription && (
  <div className="fixed inset-0 flex items-center justify-center bg-linear-to-r from-[#91d9b4] to-[#114135] bg-opacity-50 p-4">
    <div className="bg-white p-12 rounded-lg shadow-xl w-full max-w-lg text-black relative">

      {/* Patient Image as ID Card (Top-Right) */}
      <div className="absolute top-4 right-4 w-24 ml-14 mt-32  h-29 bg-gray-200 rounded-lg shadow-md border border-gray-300 overflow-hidden">
        <img 
          src={selectedPrescription.image || PatientImg} 
          alt="Patient"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-[#1f4e3f] mb-16 text-center">Prescription Details</h2>

      {/* Patient Info Section */}
      
      <div className="grid grid-cols-2  gap-x-4 gap-y-2 text-gray-800">
        
        <p className="font-semibold">📌 Name:</p> <p>{selectedPrescription.name}</p>
        <p className="font-semibold">📆 Date:</p> <p>{selectedPrescription.date}</p>
        <p className="font-semibold">🕒 Time:</p> <p>{selectedPrescription.time}</p>
        <p className="font-semibold">👤 Gender:</p> <p>{selectedPrescription.gender}</p>
        <p className="font-semibold">📞 Phone No:</p> <p>{selectedPrescription.phone}</p>
        <p className="font-semibold">💊 Medicine:</p> <p>{selectedPrescription.medicine}</p>
        <p className="font-semibold">⚕ Symptoms:</p> <p>{selectedPrescription.symptoms}</p>
        <p className="font-semibold col-span-2">📝 Doctor’s Suggestion:</p>
        <p className="col-span-2">{selectedPrescription.doctorSuggestion}</p>
      </div>

      {/* Doctor's Signature & ID */}
      <div className="mt-6 text-right">
        <p className="font-semibold">{selectedPrescription.doctorSignature}</p>
        <p className="text-gray-600">ID: {selectedPrescription.doctorId}</p>
      </div>

      {/* Close Button */}
      <button 
        className="relative
   bottom-4 right-4 bg-[#1ba698] text-white px-4 py-2 rounded-lg hover:bg-[#838784] transition-all"
        onClick={() => setSelectedPrescription(null)}
      >
        
         Close
      </button>

    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default Prescription;