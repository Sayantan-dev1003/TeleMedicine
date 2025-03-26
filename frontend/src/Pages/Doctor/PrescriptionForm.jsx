import React, { useState } from "react";
import DoctorSidebar from "../../Components/DoctorSidebar";
import DoctorHeader from "../../Components/DoctorHeader";

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "Male",
    symptoms: "",
    medicine: "",
    doctorSuggestion: "",
    doctorName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prescription Data:", formData);
    alert("Prescription submitted successfully!");
    setFormData({
      patientName: "",
      age: "",
      gender: "Male",
      symptoms: "",
      medicine: "",
      doctorSuggestion: "",
      doctorName: "",
    });
  };

  return (
    <div className="flex h-screen bg-cover bg-[#D8EFED] text-white relative poppins">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-6">
        {/* Header */}
        <DoctorHeader />

        {/* Prescription Form */}
        <div className="flex justify-center items-center mt-4">
          <div className="bg-white text-green-700 shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center text-[#1f4e3f] mb-4">
              Create Prescription
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <label className="block text-gray-700 font-semibold">Patient Name:</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  className="w-full border  rounded-md p-2"
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold">Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div> 
              <div>
                <label className="block text-gray-700 font-semibold">Symptoms:</label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Prescribed Medicine:</label>
                <input
                  type="text"
                  name="medicine"
                  value={formData.medicine}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Doctor's Suggestion:</label>
                <textarea
                  name="doctorSuggestion"
                  value={formData.doctorSuggestion}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Doctor Name:</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1f4e3f] text-white font-semibold py-2 rounded-md hover:bg-[#163d31] transition-all"
              >
                Submit Prescription
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;
