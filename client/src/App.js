import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, SetUsername] = useState("");
  const [room, setroom] = useState("");
  const [showchat, setShowChat] = useState("");


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };
  return (
    <div className="App">
      {!showchat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter Your Name..."
            onChange={(event) => {
              SetUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setroom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;