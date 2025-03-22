import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import PatientHeader from "../../Components/PatientHeader";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PatientSupport = () => {
    const [hospitals, setHospitals] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lon: longitude });

                fetch(`http://127.0.0.1:5000/hospitals?lat=${latitude}&lon=${longitude}`)
                    .then((response) => response.json())
                    .then((data) => setHospitals(data.hospitals))
                    .catch((error) => console.error("Error fetching hospitals:", error));
            },
            (error) => console.error("Error getting location:", error)
        );
    }, []);

    return (
        <div className="flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins">
            <Sidebar />
            <div className="relative z-10 flex-1 p-6">
                <PatientHeader />

                <div className="mt-4">
                    {userLocation ? (
                        <MapContainer center={[userLocation.lat, userLocation.lon]} zoom={14} className="h-[500px] w-full">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            
                            {/* User Location Marker */}
                            <Marker position={[userLocation.lat, userLocation.lon]}>
                                <Popup>Your Location</Popup>
                            </Marker>

                            {/* Hospital Markers */}
                            {hospitals.map((hospital, index) => (
                                <Marker key={index} position={[hospital.lat, hospital.lon]}>
                                    <Popup>
                                        <b>{hospital.name}</b><br />
                                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`} target="_blank" rel="noopener noreferrer">
                                            🚗 Get Directions
                                        </a>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    ) : (
                        <p>Loading your location...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientSupport;
