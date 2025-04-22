# AI-Powered Telemedicine Platform for Remote Healthcare

![Frontend + Backend](https://img.shields.io/badge/Tech%20Stack-Frontend%3A%20React.js%20%7C%20WebRTC%20%7C%20Socket.io%20--Backend%3A%20Node.js%20%7C%20Express.js%20%7C%20Supabase%20%7C%20MongoDB-brightgreen)<br>
![AI/ML Stack](https://img.shields.io/badge/AI%2FML-Python%20%7C%20TensorFlow%20%7C%20Scikit--Learn%20%7C%20NLTK%20%7C%20Hugging%20Face%20Transformers-blue)<br>
![Others](https://img.shields.io/badge/Others-OpenStreetMap%20%7C%20Microservices%20Architecture-orange)

## Overview
Access to quality healthcare remains a challenge, especially in underserved and rural areas with limited medical infrastructure. This AI-powered telemedicine platform bridges this gap by enabling remote healthcare consultations, making medical expertise accessible without requiring physical visits.

This platform integrates AI and ML technologies to facilitate intelligent diagnosis, automate appointment scheduling, and recommend alternative treatments. The system ensures real-time doctor-patient communication through video consultations and an AI-powered chatbot for preliminary diagnoses.

## Key Features
- **NLP-Based Interface** - Enables users to interact in their local language for better understanding.
- **AI-Powered Chatbot for Diagnosis** - Assesses symptoms and suggests preliminary recommendations if a doctor is unavailable.
- **Automated Appointment Scheduling** - Users can schedule consultations or receive AI-generated Do’s & Don’ts based on symptom analysis.
- **Interactive Map for Nearby Healthcare Services** - Displays available doctors, hospitals, and pharmacies.
- **1:1 Video Calling with Doctors** - Secure WebRTC-based video consultations.
- **Medicine Recognition Model** - Identifies medicines from images or names and suggests cheaper or more available alternatives.

## AI/ML Integration
The platform utilizes AI for:
- **Symptom Checking & Preliminary Diagnosis** - AI-driven symptom analysis provides probable conditions, risk analysis, and treatment suggestions.
- **Medicine Recognition & Alternative Recommendations** - Deep learning models process medical images and text.
- **Reinforcement Learning for Chatbot Optimization** - Chatbot interactions continuously improve based on user feedback.
- **Future Enhancements** - Integration with wearables for real-time health monitoring and AI-powered disease recognition from images.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, WebRTC, Socket.io, Axios
- **Backend**: Node.js, Express.js, MongoDB, JWT / Bcrypt
- **AI/ML**: Python, TensorFlow, NLTK, Scikit-learn, Hugging Face Transformers
- **Others**: REST API, OpenStreetMap, Microservices Architecture

## Workflow
1. User Interaction: Patients describe symptoms via NLP-based chatbot or opt for a 1:1 video consultation.
2. AI Diagnosis: The chatbot processes symptoms and provides health recommendations.
3. Medicine Recognition: Users upload medicine images or names for alternative recommendations.
4. Appointment Scheduling: The system enables users to book consultations after symptom analysis.
5. Data Processing: All interactions are securely managed via the Node.js backend and stored in databases.
6. Real-Time Consultation: WebRTC-based secure video calls connect users with specialists.
7. Continuous Improvement: Reinforcement learning optimizes chatbot responses over time.

## Installation & Setup

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
