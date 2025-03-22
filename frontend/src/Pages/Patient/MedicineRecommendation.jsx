import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import PatientHeader from "../../Components/PatientHeader";

const MedicineRecommendation = () => {
    const [medicine, setMedicine] = useState("");
    const [image, setImage] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchRecommendations = async () => {
        if (!medicine.trim()) {
            setError("Please enter a medicine name.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:5000/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ medicine_name: medicine }),
            });
            const data = await response.json();
            if (response.ok) {
                setRecommendations(data.recommendations);
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to fetch recommendations.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const fetchRecommendationsByImage = async () => {
        if (!image) {
            setError("Please upload an image.");
            return;
        }
        setLoading(true);
        setError("");
        const formData = new FormData();
        formData.append("image", image);
        try {
            const response = await fetch("http://localhost:5000/recommend-by-image", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setMedicine(data.search);
                setRecommendations(data.recommendations);
            } else {
                setError(data.error || "Could not recognize the medicine.");
            }
        } catch (err) {
            setError("Failed to process image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-cover bg-center bg-[#D8EFED] text-white relative poppins">
            <Sidebar />
            <div className="relative z-10 flex-1 p-6">
                <PatientHeader />
                <div className="bg-white p-6 rounded-lg shadow-lg text-black w-2/3 mx-auto mt-16">
                    <h2 className="text-xl font-bold mb-2 text-[#064848]">Find Medicine Alternatives</h2>
                    <input
                        type="text"
                        value={medicine}
                        onChange={(e) => setMedicine(e.target.value)}
                        placeholder="Enter medicine name..."
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    <button
                        onClick={fetchRecommendations}
                        className="mt-3 bg-[#064848] text-white px-4 py-2 rounded-md w-full hover:bg-[#043b34]"
                    >
                        {loading ? "Searching..." : "Find Alternatives"}
                    </button>

                    <div className="mt-4">
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded-md text-black" />
                        <button
                            onClick={fetchRecommendationsByImage}
                            className="mt-3 bg-[#064848] text-white px-4 py-2 rounded-md w-full hover:bg-[#043b34]"
                        >
                            {loading ? "Processing..." : "Upload & Search"}
                        </button>
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {recommendations.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-[#064848] mb-2">Alternatives:</h3>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-[#064848] text-white">
                                        <th className="border border-gray-300 p-2">Medicine Name</th>
                                        <th className="border border-gray-300 p-2">Price (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recommendations.map((med, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 p-2">{med.name}</td>
                                            <td className="border border-gray-300 p-2">₹{med["price(₹)"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedicineRecommendation;