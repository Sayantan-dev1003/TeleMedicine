from flask import Flask, jsonify
from flask_cors import CORS
import requests
from geopy.distance import geodesic  # To calculate straight-line distance

app = Flask(__name__)
CORS(app)

# Hardcoded IITRAM coordinates
IITRAM_LAT = 23.0041
IITRAM_LON = 72.6216

# Function to fetch hospitals & medical stores using Overpass API
def get_nearby_places(place_type, radius=20000):  # 20km radius
    overpass_url = "http://overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    node["amenity"="{place_type}"](around:{radius},{IITRAM_LAT},{IITRAM_LON});
    out;
    """
    response = requests.get(overpass_url, params={"data": query})
    data = response.json()

    places = []
    for element in data.get("elements", []):
        name = element.get("tags", {}).get("name", f"Unknown {place_type.capitalize()}")
        place_lat, place_lon = element["lat"], element["lon"]

        # Calculate straight-line distance
        distance_km = round(geodesic((IITRAM_LAT, IITRAM_LON), (place_lat, place_lon)).km, 2)

        # Generate Google Maps navigation link
        google_maps_url = f"https://www.google.com/maps/dir/?api=1&origin={IITRAM_LAT},{IITRAM_LON}&destination={place_lat},{place_lon}"

        places.append({
            "name": name,
            "lat": place_lat,
            "lon": place_lon,
            "type": place_type,
            "distance_km": distance_km,
            "google_maps_url": google_maps_url
        })
   
    return places

@app.route('/places', methods=['GET'])
def places():
    hospitals = get_nearby_places("hospital")
    medical_stores = get_nearby_places("pharmacy")

    return jsonify({
        "hospitals": hospitals,
        "medical_stores": medical_stores
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
