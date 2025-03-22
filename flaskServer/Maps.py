# import requests
# import folium
# from folium.plugins import MarkerCluster
# from IPython.display import display

# # Function to fetch nearby hospitals using Overpass API (OpenStreetMap)
# def get_nearby_hospitals(lat, lon, radius=2000):
#     overpass_url = "http://overpass-api.de/api/interpreter"
#     query = f"""
#     [out:json];
#     node["amenity"="hospital"](around:{radius},{lat},{lon});
#     out;
#     """
#     response = requests.get(overpass_url, params={"data": query})
#     data = response.json()

#     hospitals = []
#     for element in data.get("elements", []):
#         name = element.get("tags", {}).get("name", "Unknown Hospital")
#         lat, lon = element["lat"], element["lon"]
#         hospitals.append({"name": name, "lat": lat, "lon": lon})
    
#     return hospitals

# # Function to create an interactive map with hospital markers
# def create_map(user_lat, user_lon, hospitals):
#     m = folium.Map(location=[user_lat, user_lon], zoom_start=14)

#     # Mark user's location
#     folium.Marker(
#         [user_lat, user_lon], 
#         popup="Your Location",
#         icon=folium.Icon(color="blue", icon="user")
#     ).add_to(m)

#     marker_cluster = MarkerCluster().add_to(m)

#     # Add hospital markers with Google Maps direction links
#     for hospital in hospitals:
#         hospital_lat, hospital_lon = hospital["lat"], hospital["lon"]
#         hospital_name = hospital["name"]

#         # Google Maps direction link
#         google_maps_url = f"https://www.google.com/maps/dir/?api=1&origin={user_lat},{user_lon}&destination={hospital_lat},{hospital_lon}&travelmode=driving"

#         popup_info = f"""
#         <b>{hospital_name}</b><br>
#         <a href="{google_maps_url}" target="_blank">🚗 Get Directions on Google Maps</a>
#         """

#         folium.Marker(
#             [hospital_lat, hospital_lon],
#             popup=popup_info,
#             icon=folium.Icon(color="red", icon="plus-sign")
#         ).add_to(marker_cluster)

#     return m

# # Example: Set user's location (Replace with actual GPS input)
# user_lat = 23.0225  # Example latitude (Ahmedabad, India)
# user_lon = 72.5714  # Example longitude (Ahmedabad, India)

# hospitals = get_nearby_hospitals(user_lat, user_lon)
# hospital_map = create_map(user_lat, user_lon, hospitals)

# # Display map
# display(hospital_map)

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Function to fetch nearby hospitals using OpenStreetMap Overpass API
def get_nearby_hospitals(lat, lon, radius=20000):  # 20km radius
    overpass_url = "http://overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    node["amenity"="hospital"](around:{radius},{lat},{lon});
    out;
    """
    response = requests.get(overpass_url, params={"data": query})
    data = response.json()

    hospitals = []
    for element in data.get("elements", []):
        name = element.get("tags", {}).get("name", "Unknown Hospital")
        lat, lon = element["lat"], element["lon"]
        hospitals.append({"name": name, "lat": lat, "lon": lon})
    
    return hospitals

@app.route('/hospitals', methods=['GET'])
def hospitals():
    lat = request.args.get("lat", type=float)
    lon = request.args.get("lon", type=float)

    if lat is None or lon is None:
        return jsonify({"error": "Latitude and Longitude are required"}), 400

    hospitals = get_nearby_hospitals(lat, lon)
    return jsonify({"hospitals": hospitals})

if __name__ == '__main__':
    app.run(debug=True, port=5000)