# AI-Powered Telemedicine Platform for Remote Healthcare

![Frontend + Backend](https://img.shields.io/badge/Tech%20Stack-Frontend%3A%20React.js%20%7C%20Chart.js%20%7C%20Tailwind%20CSS%20%7C%20Axios%20--Backend%3A%20Node.js%20%7C%20Express.js%20%7C%20Supabase%20%7C%20JWT%20%2F%20Bcrypt-brightgreen)
![AI/ML Stack](https://img.shields.io/badge/AI%2FML-OpenCV%20%7C%20MTCNN%20%7C%20InceptionResnetV1%20%7C%20Scikit--learn%20%7C%20NumPy-blue)

## 📌 Overview
TeleMedicine is an AI-powered platform designed to revolutionize healthcare access in rural and underserved areas. With limited infrastructure and availability of medical professionals in such regions, this platform bridges the gap by offering remote doctor consultations, AI-driven preliminary diagnoses, and smart medicine recommendations.

### ✅ Offers

- 💬 **Remote Doctor Consultations** via secure, real-time video calls.
- 🧠 **AI-Powered Preliminary Diagnoses** through intelligent symptom analysis.
- 💊 **Smart Medicine Recommendations**, including affordable alternatives.

### 🔑 Key Features

- 📹 **Real-Time Video Communication** using WebRTC for seamless doctor-patient interaction.
- 🗣️ **Multilingual NLP Chatbot** for intuitive symptom input and user-friendly interaction.
- 🤖 **Machine Learning Models** ensure accurate and data-driven health insights.

### 🚀 Enables

- ⚡ **Quick & Reliable Symptom Analysis** using AI algorithms.
- 📅 **Appointment Scheduling** with healthcare professionals.
- 💊 **Access to Alternative & Affordable Medicines** based on uploaded prescriptions or queries.

### 🌍 Provides

- 🧑‍⚕️ **Seamless and Personalized Healthcare**, even in remote or underserved areas where traditional medical facilities are limited.

## 🛠 Tech Stack
- **Frontend**: React.js, Tailwind CSS, WebRTC, Socket.io, Axios
- **Backend**: Node.js, Express.js, MongoDB, JWT / Bcrypt
- **AI/ML**: Python, TensorFlow, NLTK, Scikit-learn, Hugging Face Transformers
- **Others**: REST API, OpenStreetMap, Microservices Architecture

## 🔧 Installation & Setup

Follow the steps below to clone, install dependencies, and run the project locally. Make sure you have **Node.js**, **npm**, and **Python** installed on your machine.

### 1. **Clone the Repository**
Start by cloning the repository to your local machine:
```bash
https://github.com/Sayantan-dev1003/TeleMedicine.git
```

### 2. **Navigate to Project Directory**
Once the repository is cloned, change your working directory to the project folder:
```bash
cd TeleMedicine
```

### 3. **Set Up Frontend**
Navigate to the frontend folder where the React application is located:
```bash
cd frontend
```
Install all necessary dependencies for the frontend:
```bash
npm install
```

### 4. **Set Up Backend (Node.js)**
Open a new terminal window and navigate to the backend directory:
```bash
cd backend
```
Install all necessary dependencies for the backend:
```bash
npm install
```

### 5. **Run the Backend**
To start the backend server, use nodemon (which automatically restarts the server when code changes):
```bash
nodemon app
```
This will start the Node.js backend on the specified port (usually http://localhost:3000).

### 6. **Set Up Flask Server (AI Model)**
Open another new terminal window and navigate to the flaskserver folder, which contains the Python Flask application used for the AI model:
```bash
cd flaskserver
```
Install the required Python dependencies using pip:
```bash
pip install -r requirements.txt
```
This will install all necessary Python packages for running the AI model (e.g., OpenCV, TensorFlow, etc.).

### 7. **Run Flask Server**
To start the Flask server, use the following command:
```bash
python Run_all.py
```
This will start the Flask server that handles the NLP-based chatbot, AI-driven symptom analysis, medicine recognition, and manages interactive map.
