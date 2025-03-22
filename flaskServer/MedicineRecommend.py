from flask import Flask, request, jsonify
import pandas as pd
import pytesseract
from PIL import Image
import io
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from thefuzz import process
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load Medicine Data
file_path = "A_Z_medicines_dataset_of_India.csv"
df = pd.read_csv(file_path)

df["short_composition2"] = df["short_composition2"].fillna("")
df["full_composition"] = df["short_composition1"].str.lower() + " " + df["short_composition2"].str.lower()

# Convert Composition to Vector
tfidf = TfidfVectorizer(stop_words="english", max_features=5000)
tfidf_matrix = tfidf.fit_transform(df["full_composition"])

# Function to Match Closest Medicine
def find_best_match(partial_name):
    result = process.extractOne(partial_name, df["name"])
    if result:
        best_match = result[0]
        score = result[1]
        return best_match if score > 70 else None
    return None

# Function to Recommend Alternatives
def recommend_medicine(medicine_name, top_n=5):
    best_match = find_best_match(medicine_name)
    if not best_match:
        return None, f"No close match found for '{medicine_name}'."

    idx = df[df["name"] == best_match].index[0]
    sim_scores = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()
    similar_indices = sim_scores.argsort()[-top_n-1:-1][::-1]
    recommendations = df.iloc[similar_indices][["name", "manufacturer_name", "price(₹)"]].to_dict(orient="records")

    return recommendations, best_match

# API Route to Get Medicine Recommendations by Name
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    medicine_name = data.get("medicine_name", "")

    if not medicine_name:
        return jsonify({"error": "Medicine name is required"}), 400

    recommendations, best_match = recommend_medicine(medicine_name)
    if recommendations:
        return jsonify({"search": best_match, "recommendations": recommendations})
    else:
        return jsonify({"error": best_match}), 404

# API Route to Process Image Input and Extract Medicine Name
@app.route("/recommend-by-image", methods=["POST"])
def recommend_by_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    image = Image.open(io.BytesIO(image_file.read()))

    # Extract text using OCR
    extracted_text = pytesseract.image_to_string(image).strip()
    
    if not extracted_text:
        return jsonify({"error": "Could not extract text from image"}), 400

    # Recommend based on extracted name
    recommendations, best_match = recommend_medicine(extracted_text)
    if recommendations:
        return jsonify({"search": best_match, "recommendations": recommendations})
    else:
        return jsonify({"error": best_match}), 404

if __name__ == "__main__":
    app.run(debug=True)
