import eventlet
eventlet.monkey_patch()  # Enable eventlet for better WebSocket performance

from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for frontend communication

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")  # Enable WebSockets with eventlet

# Store connected users (username -> socket ID)
users = {}

@app.route('/')
def index():
    return "WebRTC Flask Signaling Server is running!"

@socketio.on("join")
def handle_join(data):
    """Handles user joining the WebRTC session"""
    username = data.get("username")
    if not username:
        return

    if username in users:
        print(f"Username {username} already exists. Updating session ID.")
    else:
        emit("user-joined", {"username": username}, broadcast=True)

    users[username] = request.sid  # Store session ID
    print(f"{username} joined with session {request.sid}")

@socketio.on("offer")
def handle_offer(data):
    """Handles WebRTC SDP Offer"""
    target = data.get("target")
    offer = data.get("offer")

    if target in users:
        emit("offer", {"offer": offer, "from": request.sid}, room=users[target])

@socketio.on("answer")
def handle_answer(data):
    """Handles WebRTC SDP Answer"""
    target = data.get("target")
    answer = data.get("answer")

    if target in users:
        emit("answer", {"answer": answer, "from": request.sid}, room=users[target])

@socketio.on("ice-candidate")
def handle_ice_candidate(data):
    """Handles ICE Candidate exchange"""
    target = data.get("target")
    candidate = data.get("candidate")

    if target in users:
        emit("ice-candidate", {"candidate": candidate, "from": request.sid}, room=users[target])

@socketio.on("disconnect")
def handle_disconnect():
    """Handles user disconnection"""
    disconnected_user = None
    for user, sid in list(users.items()):
        if sid == request.sid:
            disconnected_user = user
            del users[user]
            break

    if disconnected_user:
        emit("user-left", {"username": disconnected_user}, broadcast=True)
        print(f"{disconnected_user} disconnected")

if __name__ == "__main__":
    print("Starting WebRTC Flask Signaling Server...")
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
