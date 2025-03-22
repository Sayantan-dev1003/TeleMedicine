from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for frontend communication
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable WebSockets

# Store connected users (username -> socket ID)
users = {}

@app.route('/')
def index():
    return "WebRTC Flask Signaling Server is running!"

@socketio.on("join")
def handle_join(data):
    """Handles user joining the WebRTC session"""
    username = data.get("username")
    if username:
        users[username] = request.sid  # Store session ID
        emit("user-joined", {"username": username}, broadcast=True)
        print(f"{username} joined with session {request.sid}")

@socketio.on("offer")
def handle_offer(data):
    """Handles WebRTC SDP Offer"""
    target = data["target"]
    offer = data["offer"]
    if target in users:
        emit("offer", {"offer": offer, "from": request.sid}, room=users[target])

@socketio.on("answer")
def handle_answer(data):
    """Handles WebRTC SDP Answer"""
    target = data["target"]
    answer = data["answer"]
    if target in users:
        emit("answer", {"answer": answer}, room=users[target])

@socketio.on("ice-candidate")
def handle_ice_candidate(data):
    """Handles ICE Candidate exchange"""
    target = data["target"]
    candidate = data["candidate"]
    if target in users:
        emit("ice-candidate", {"candidate": candidate}, room=users[target])

@socketio.on("disconnect")
def handle_disconnect():
    """Handles user disconnection"""
    for user, sid in list(users.items()):
        if sid == request.sid:
            del users[user]
            emit("user-left", {"username": user}, broadcast=True)
            print(f"{user} disconnected")
            break

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
