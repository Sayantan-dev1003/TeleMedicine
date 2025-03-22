from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from thefuzz import process
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

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
        best_match = result[0]  # Extract medicine name
        score = result[1]       # Extract similarity score
        return best_match if score > 70 else None
    return None

# Function to Recommend Alternatives
def recommend_medicine(partial_name, top_n=5):
    best_match = find_best_match(partial_name)
    if not best_match:
        return None, f"No close match found for '{partial_name}'."

    idx = df[df["name"] == best_match].index[0]
    sim_scores = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()
    similar_indices = sim_scores.argsort()[-top_n-1:-1][::-1]
    recommendations = df.iloc[similar_indices][["name", "manufacturer_name", "price(₹)"]].to_dict(orient="records")

    return recommendations, best_match

# API Route to Get Medicine Recommendations
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

if __name__ == "__main__":
    app.run(debug=True)