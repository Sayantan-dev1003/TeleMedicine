import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import PatientHeader from "../../Components/PatientHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    reason: "",
  });

  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/bookAppointment", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch appointments");

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("/api/bookAppointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.error}`);
      }

      const addedAppointment = await response.json();
      setAppointments([...appointments, addedAppointment]);
      setIsModalOpen(false);
      setNewAppointment({ date: "", time: "", reason: "" });
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#D8EFED] text-white relative poppins">
      <Sidebar />
      <div className="flex-1 p-6">
        <PatientHeader />
<div className="flex justify-between items-center gap-3">
        <div className="mt-6 flex justify-between items-center gap-3">
          <div className="flex gap-4">
            <button
              onClick={() => setView("upcoming")} 
              className={`px-6 py-3  shadow-lg rounded-lg font-semibold text-white ${
                view === "upcoming" ? "bg-[#064848] hover:text-yellow-300" : "bg-gray-500"
              }`}
            >
              Upcoming
            </button>
            </div>
            <button
              onClick={() => setView("past")}
              className={`px-6 py-3 shadow-lg rounded-lg font-semibold text-white ${
                view === "past" ? "bg-[#064848] hover:text-yellow-300" : "bg-gray-500"
              }`}
            >
              Past
            </button>
          </div>

        
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 shadow-lg rounded-lg font-semibold hover:text-yellow-300 hover:bg-[#0d3733] text-[#0d3733] bg-white"
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Add Appointment
          </button>
        </div>
        </div>

        {/* Appointments List */}
        <div className="mt-6 text-black">
          <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="font-semibold">Doctor: {appointment.doctor ? appointment.doctor.name : "Not Assigned"}</p>
                  <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Reason: {appointment.reason}</p>
                  <p>Status: {appointment.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed p-4 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
         
          <div className="bg-white p-6 rounded-lg w-96 text-black shadow-lg relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-red-500">
              <FontAwesomeIcon icon={faTimes} />
            </button>
           
            <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block">Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={newAppointment.reason}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <button type="submit" className="w-full bg-[#064848] text-white p-2 rounded">
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;