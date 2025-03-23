import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] }); // Ensures WebSocket connection

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStreamRef = useRef(null);
  const [username, setUsername] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("user-joined", (data) => {
      console.log(`${data.username} has joined the session`);
    });

    socket.on("offer", async (data) => {
      console.log("Received offer from:", data.from);
      peerConnection.current = createPeerConnection(data.from);
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { target: data.from, answer });
    });

    socket.on("answer", async (data) => {
      console.log("Received answer");
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    socket.on("ice-candidate", async (data) => {
      console.log("Received ICE candidate");
      if (peerConnection.current) {
        try {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (error) {
          console.error("Error adding received ICE candidate", error);
        }
      }
    });

    return () => {
      socket.disconnect();
      endCall(); // Cleanup on component unmount
    };
  }, []);

  const createPeerConnection = (remoteUsername) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { target: remoteUsername, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onnegotiationneeded = async () => {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { target: remoteUsername, offer });
      } catch (error) {
        console.error("Error during renegotiation", error);
      }
    };

    return pc;
  };

  const startCall = async () => {
    if (!username || !targetUser) {
      alert("Enter both your name and the target user.");
      return;
    }

    socket.emit("join", { username });
    peerConnection.current = createPeerConnection(targetUser);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

      setConnected(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    setConnected(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Patient-Doctor Video Call</h1>
      
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Target User (Doctor/Patient)"
          value={targetUser}
          onChange={(e) => setTargetUser(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <button onClick={startCall} disabled={connected} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Start Call
        </button>
        <button onClick={endCall} disabled={!connected} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2">
          End Call
        </button>
      </div>

      <div className="flex justify-between mt-4 w-full max-w-lg">
        <video ref={localVideoRef} autoPlay playsInline className="w-1/2 border rounded-lg" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 border rounded-lg" />
      </div>
    </div>
  );
};

export default VideoCall;
