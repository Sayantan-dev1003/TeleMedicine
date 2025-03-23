# from flask import Flask, request, jsonify
# import requests
# import json
# from datetime import datetime
# from flask_cors import CORS  # Import Flask-CORS

# app = Flask(__name__)  # Fix the typo: _name_ -> __name__
# CORS(app)  # Enable CORS for all routes

# # Google Gemini API Key (Replace with your own API Key)
# GEMINI_API_KEY = "AIzaSyDlpNK9Csn0h-B5YHWM3LU2W3o6wJGlda0"
# GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# # Function to get a response from Gemini API
# def gemini_response(prompt):
#     headers = {"Content-Type": "application/json"}
#     payload = {"contents": [{"parts": [{"text": prompt}]}]}
#     response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
   
#     if response.status_code == 200:
#         response_data = response.json()
#         try:
#             return response_data["candidates"][0]["content"]["parts"][0]["text"]
#         except KeyError:
#             return "I'm sorry, but I couldn't process your request. Please try again."
#     else:
#         return f"Error: {response.status_code}, {response.text}"

# # Recommendation Engine (Do’s and Don’ts)
# recommendations = {
#     "fever": {
#         "do": ["Stay hydrated", "Get plenty of rest", "Take paracetamol if necessary", "Monitor your temperature"],
#         "dont": ["Avoid caffeine", "Don’t overexert yourself", "Avoid cold drinks", "Don’t ignore high fever"]
#     },
#     "cold": {
#         "do": ["Drink warm fluids", "Rest well", "Use a humidifier", "Take vitamin C"],
#         "dont": ["Avoid dairy", "Don’t go outside without warm clothes", "Avoid cold beverages", "Don’t touch your face often"]
#     },
#     "diabetes": {
#         "do": ["Maintain a healthy diet", "Exercise regularly", "Monitor blood sugar levels", "Stay hydrated"],
#         "dont": ["Avoid sugary foods", "Limit processed carbs", "Don’t skip meals", "Avoid alcohol"]
#     }
# }

# # Function to provide recommendations based on detected disease
# def get_recommendations(disease):
#     if disease in recommendations:
#         dos = "\n✔ " + "\n✔ ".join(recommendations[disease]["do"])
#         donts = "\n❌ " + "\n❌ ".join(recommendations[disease]["dont"])
#         return f"*Do's:{dos}\n\nDon'ts:*{donts}"
#     return "No specific recommendations available."

# # Appointment booking function
# def book_appointment():
#     appointment_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#     return f"Your appointment is scheduled for {appointment_time}. Please check your messages for confirmation."

# # API endpoint to handle user input
# @app.route('/chat', methods=['POST'])
# def chat():
#     user_input = request.json.get('input')
#     if not user_input:
#         return jsonify({"error": "No input provided"}), 400

#     # Get response from Gemini API
#     response = gemini_response(user_input)

#     # Extract disease from response
#     detected_disease = None
#     for disease in recommendations.keys():
#         if disease in response.lower():
#             detected_disease = disease
#             break

#     # Generate response based on disease detection
#     if detected_disease:
#         response = f"To treat {detected_disease}, follow these steps:\n\n{response}\n\n{get_recommendations(detected_disease)}"

#     # Automatically book an appointment
#     appointment_info = book_appointment()

#     # Final response including chatbot-generated text and appointment details
#     response += f"\n\n{appointment_info}"

#     return jsonify({"response": response})

# # Run the Flask app
# if __name__ == "__main__":  # Fix the typo: _name_ -> __name__
#     app.run(debug=True)

# from flask import Flask, request, jsonify
# import requests
# import json
# from datetime import datetime
# from flask_cors import CORS  # Enable CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Google Gemini API Key (Replace with your own API Key)
# GEMINI_API_KEY = "AIzaSyDlpNK9Csn0h-B5YHWM3LU2W3o6wJGlda0"
# GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# # Function to get a response from Gemini API
# def gemini_response(prompt):
#     headers = {"Content-Type": "application/json"}
#     payload = {"contents": [{"parts": [{"text": prompt}]}]}
#     response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
   
#     if response.status_code == 200:
#         response_data = response.json()
#         try:
#             return response_data["candidates"][0]["content"]["parts"][0]["text"]
#         except KeyError:
#             return "I'm sorry, but I couldn't process your request. Please try again."
#     else:
#         return f"Error: {response.status_code}, {response.text}"

# # Recommendation Engine (Do’s and Don’ts)
# recommendations = {
#     "fever": {
#         "do": ["Stay hydrated", "Get plenty of rest", "Take paracetamol if necessary", "Monitor your temperature"],
#         "dont": ["Avoid caffeine", "Don’t overexert yourself", "Avoid cold drinks", "Don’t ignore high fever"]
#     },
#     "cold": {
#         "do": ["Drink warm fluids", "Rest well", "Use a humidifier", "Take vitamin C"],
#         "dont": ["Avoid dairy", "Don’t go outside without warm clothes", "Avoid cold beverages", "Don’t touch your face often"]
#     },
#     "diabetes": {
#         "do": ["Maintain a healthy diet", "Exercise regularly", "Monitor blood sugar levels", "Stay hydrated"],
#         "dont": ["Avoid sugary foods", "Limit processed carbs", "Don’t skip meals", "Avoid alcohol"]
#     }
# }

# # Function to provide recommendations based on detected disease
# def get_recommendations(disease):
#     if disease in recommendations:
#         dos = "\n✔ " + "\n✔ ".join(recommendations[disease]["do"])
#         donts = "\n❌ " + "\n❌ ".join(recommendations[disease]["dont"])
#         return f"*Do's:{dos}\n\nDon'ts:*{donts}"
#     return "No specific recommendations available."

# # Appointment booking function
# def book_appointment():
#     appointment_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#     return f"Your appointment is scheduled for {appointment_time}. Please check your messages for confirmation."

# # API endpoint to handle user input
# @app.route('/chat', methods=['POST'])
# def chat():
#     user_input = request.json.get('input')
#     if not user_input:
#         return jsonify({"error": "No input provided"}), 400

#     # Get response from Gemini API
#     response = gemini_response(user_input)

#     # Extract disease from response
#     detected_disease = None
#     for disease in recommendations.keys():
#         if disease in response.lower():
#             detected_disease = disease
#             break

#     # Generate response based on disease detection
#     if detected_disease:
#         response = f"To treat {detected_disease}, follow these steps:\n\n{response}\n\n{get_recommendations(detected_disease)}"

#     # Automatically book an appointment
#     appointment_info = book_appointment()

#     # Final response including chatbot-generated text and appointment details
#     response += f"\n\n{appointment_info}"

#     return jsonify({"response": response})

# # Run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True)




# from flask import Flask, request, jsonify
# import requests
# import random
# import speech_recognition as sr
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Google Gemini API Key
# GEMINI_API_KEY = "AIzaSyALLc-cClYH6J7gFKVH1xFgS_Zpup6yTwE"
# GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# def gemini_response(prompt):
#     headers = {"Content-Type": "application/json"}
#     payload = {"contents": [{"parts": [{"text": prompt}]}]}
#     response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
    
#     if response.status_code == 200:
#         response_data = response.json()
#         try:
#             return response_data["candidates"][0]["content"]["parts"][0]["text"]
#         except (KeyError, IndexError):
#             return "I'm sorry, but I couldn't process your request. Please try again."
#     else:
#         return f"Error: {response.status_code}, {response.text}"

# def book_appointment():
#     morning_slots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"]
#     evening_slots = ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"]
#     selected_time = random.choice(morning_slots + evening_slots)
#     confirmation_message = f"Your appointment has been scheduled at {selected_time}. Please check your messages for confirmation."
#     print(confirmation_message)
#     return confirmation_message

# @app.route('/chat', methods=['POST'])
# def chat():
#     user_input = request.json.get('input')
#     user_state = request.json.get('state', {})

#     if not user_input:
#         return jsonify({"error": "No input provided"}), 400

#     if user_state.get("awaiting_appointment_confirmation"):
#         if "yes" in user_input.lower():
#             appointment_info = book_appointment()
#             return jsonify({"response": f"✅ {appointment_info} Your appointment has been successfully booked.", "state": {}})
#         elif "no" in user_input.lower():
#             return jsonify({"response": "Alright! Let me know if you need any help.", "state": {}})
#         else:
#             return jsonify({"response": "I didn't get that. Would you like to book an appointment? (yes/no)", "state": {"awaiting_appointment_confirmation": True}})

#     response = gemini_response(user_input)
#     return jsonify({"response": response, "state": {}})

# @app.route('/voice-chat', methods=['POST'])
# def voice_chat():
#     recognizer = sr.Recognizer()
#     with sr.Microphone() as source:
#         try:
#             print("Listening...")
#             audio = recognizer.listen(source)
#             user_input = recognizer.recognize_google(audio)
#             print(f"User said: {user_input}")
#             return chat()
#         except sr.UnknownValueError:
#             return jsonify({"error": "Could not understand audio"})
#         except sr.RequestError:
#             return jsonify({"error": "Could not request results from Google Speech Recognition service"})

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
import requests
from datetime import datetime
from flask_cors import CORS  # Enable CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Google Gemini API Key (Replace with your own API Key)
GEMINI_API_KEY = "AIzaSyALLc-cClYH6J7gFKVH1xFgS_Zpup6yTwE"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# Function to get a response from Gemini API
def gemini_response(prompt):
    headers = {"Content-Type": "application/json"}
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        response_data = response.json()
        return response_data["candidates"][0]["content"]["parts"][0]["text"]
    except (requests.exceptions.RequestException, KeyError, IndexError):
        return "I'm sorry, but I couldn't process your request. Please try again."

# Recommendation Engine (Do’s and Don’ts)
recommendations = {
    "fever": {
        "do": ["Stay hydrated", "Get plenty of rest", "Take paracetamol if necessary", "Monitor your temperature"],
        "dont": ["Avoid caffeine", "Don’t overexert yourself", "Avoid cold drinks", "Don’t ignore high fever"]
    },
    "cold": {
        "do": ["Drink warm fluids", "Rest well", "Use a humidifier", "Take vitamin C"],
        "dont": ["Avoid dairy", "Don’t go outside without warm clothes", "Avoid cold beverages", "Don’t touch your face often"]
    },
    "diabetes": {
        "do": ["Maintain a healthy diet", "Exercise regularly", "Monitor blood sugar levels", "Stay hydrated"],
        "dont": ["Avoid sugary foods", "Limit processed carbs", "Don’t skip meals", "Avoid alcohol"]
    }
}

# Function to provide recommendations based on detected disease
def get_recommendations(disease):
    if disease in recommendations:
        dos = "\n✔ " + "\n✔ ".join(recommendations[disease]["do"])
        donts = "\n❌ " + "\n❌ ".join(recommendations[disease]["dont"])
        return f"**✅ Do's:**{dos}\n\n**❌ Don'ts:**{donts}"
    return "No specific recommendations available."

# Appointment booking function
def book_appointment():
    appointment_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"📅 **Your appointment is scheduled for:** {appointment_time}. Please check your messages for confirmation."

# API endpoint to handle user input
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("input", "").strip()

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    # Get response from Gemini API
    response = gemini_response(user_input)

    # Detect disease from input
    detected_disease = next((disease for disease in recommendations if disease in user_input.lower()), None)

    # Generate recommendations if disease detected
    if detected_disease:
        response = f"**🩺 Detected Condition: {detected_disease.capitalize()}**\n\n{response}\n\n{get_recommendations(detected_disease)}"

    # Automatically book an appointment
    appointment_info = book_appointment()

    # Final response including chatbot-generated text and appointment details
    response += f"\n\n{appointment_info}"

    return jsonify({"response": response})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
