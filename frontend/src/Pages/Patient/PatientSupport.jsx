import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Custom icons
const iitramIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177361.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const pharmacyIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1042/1042165.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const PatientSupport = () => {
  const [places, setPlaces] = useState({ hospitals: [], medical_stores: [] });

  // IITRAM, Ahmedabad Coordinates
  const IITRAM_LAT = 23.0205;
  const IITRAM_LON = 72.5060;

  // Fetch hospitals & medical stores from backend
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/places`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => console.error("Error fetching places:", error));
  }, []);

  return (
    <div>
      <h2 className="text-center font-bold text-2xl my-4 text-blue-700">
        Nearby Hospitals & Medical Stores (IITRAM, Ahmedabad)
      </h2>

      <MapContainer center={[IITRAM_LAT, IITRAM_LON]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* IITRAM Location Marker */}
        <Marker position={[IITRAM_LAT, IITRAM_LON]} icon={iitramIcon}>
          <Popup>
            <b className="text-blue-600">📍 IITRAM, Ahmedabad</b>
          </Popup>
        </Marker>

        {/* Hospital Markers */}
        {places.hospitals.map((hospital, index) => (
          <Marker key={index} position={[hospital.lat, hospital.lon]} icon={hospitalIcon}>
            <Popup>
              <b className="text-red-600">{hospital.name}</b> <br />
              🏥 <span className="text-gray-700">Hospital</span> <br />
              📏 <b>Distance:</b> {hospital.distance_km} km <br />
              <a href={hospital.google_maps_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                🚗 Open in Google Maps
              </a>
            </Popup>
          </Marker>
        ))}

        {/* Medical Store Markers */}
        {places.medical_stores.map((store, index) => (
          <Marker key={index} position={[store.lat, store.lon]} icon={pharmacyIcon}>
            <Popup>
              <b className="text-green-600">{store.name}</b> <br />
              💊 <span className="text-gray-700">Medical Store</span> <br />
              📏 <b>Distance:</b> {store.distance_km} km <br />
              <a href={store.google_maps_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                🚗 Open in Google Maps
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PatientSupport;
