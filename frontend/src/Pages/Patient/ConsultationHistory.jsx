import React, { useState } from 'react';
import Sidebar from "../../Components/Sidebar";
import PatientHeader from '../../Components/PatientHeader';
import PrescriptionImg from "../../../../frontend/public/admin.jpg";
import PatientImg from"../../../../frontend/public/patient.jpg"

const ConsultationHistory = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const consultations = [
    {
      name: "Dr. Aman Sharma",
      specialization: "Cardiologist",
      date: "2024-03-20",
      time: "10:30 AM",
      gender: "Male",
      phone: "+91 9876543210",
      medicine: "Aspirin, Metoprolol",
      symptoms: "Chest pain, Shortness of breath",
      doctorSuggestion: "Maintain a healthy diet and regular exercise.",
      doctorSignature: "Dr. Aman Sharma",
      doctorId: "DOC-2024-001",
      image: PatientImg,
      
    },
    {
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      date: "2024-02-10",
      time: "02:00 PM",
      gender: "Female",
      phone: "+91 9876543222",
      medicine: "Clindamycin, Isotretinoin",
      symptoms: "Acne, Skin irritation",
      doctorSuggestion: "Apply prescribed creams and avoid oily foods.",
      doctorSignature: "Dr. Priya Mehta",
      doctorId: "DOC-2024-002",
      image: "https://randomuser.me/api/portraits/women/62.jpg",
    
    },
    {
      name: "Dr. Prithviraj Verma",
      specialization: "Dermatologist",
      date: "2024-02-10",
      time: "02:00 PM",
      gender: "Female",
      phone: "+91 9876543222",
      medicine: "Clindamycin, Isotretinoin",
      symptoms: "Acne, Skin irritation",
      doctorSuggestion: "Apply prescribed creams and avoid oily foods.",
      doctorSignature: "Dr. Priya Mehta",
      doctorId: "DOC-2024-002",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      
    }
  ];

  return (
    <div className='flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins'>
      <Sidebar />
      <div className='relative z-10 flex-1 p-6'>
        <PatientHeader />

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
              Consultation History
            </h3>
            <p className="text-lg mt-2">See your previous doctors.</p>

            {/* Toggle Table Button */}
            <button
              className="mt-4 z-10 text-[17px] bg-white text-[#1f4e3f] px-6 py-3 rounded-full font-bold transition-all duration-300 ease-in-out 
              hover:bg-[#1f4e3f] hover:text-white hover:scale-105 
              active:scale-95 active:bg-[#163d31]"
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? "Hide Consultation History" : "Show Consultation History"}
            </button>
          </div>
        </section>

      {/* Consultation History Section (Only shown when showTable is true) */}
{showTable && (
  <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consultation History</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {consultations.map((consult, index) => (
        <div 
          key={index} 
          className="bg-gradient-to-br from-[#2ab083] to-[#105b56] text-white p-4 rounded-lg shadow-md transition-all duration-300 pt-15 pb-15 hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <img src={consult.image} alt={consult.name} className="w-12 h-12 rounded-full border-2 border-white" />
            <div>
              <h3 className="text-lg font-bold">{consult.name}</h3>
              <p className="text-sm">{consult.specialization}</p>
            </div>
          </div>
          
         
          <button
            className="mt-15 w-full bg-white text-[#135a52] font-semibold px-4 py-2 rounded-md hover:bg-gray-200  transition-all"
            onClick={() => setSelectedConsultation(consult)}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  </div>
)}


        {/* Consultation Modal */}
        {selectedConsultation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
            <div className="bg-white p-12 rounded-lg shadow-xl w-full max-w-lg text-black relative">



              <h2 className="text-3xl font-bold text-[#1f4e3f] mb-16 text-center">Consultation Details</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-800">
                <p className="font-semibold">📌 Name:</p> <p>{selectedConsultation.name}</p>
                <p className="font-semibold">📆 Date:</p> <p>{selectedConsultation.date}</p>
                <p className="font-semibold">🕒 Time:</p> <p>{selectedConsultation.time}</p>
                <p className="font-semibold">👤 Gender:</p> <p>{selectedConsultation.gender}</p>
                <p className="font-semibold">📞 Phone No:</p> <p>{selectedConsultation.phone}</p>
                <p className="font-semibold">💊 Medicine:</p> <p>{selectedConsultation.medicine}</p>
                <p className="font-semibold">⚕ Symptoms:</p> <p>{selectedConsultation.symptoms}</p>
                <p className="font-semibold col-span-2">📝 Doctor’s Suggestion:</p>
                <p className="col-span-2">{selectedConsultation.doctorSuggestion}</p>
              </div>
              <button 
                className="relative bottom-4 right-4 bg-[#1ba698]  text-white px-4 py-2 rounded-lg hover:bg-[#838784] transition-all mt-15"
                onClick={() => setSelectedConsultation(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationHistory;