import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { useState } from "react";
import { auth } from "./components/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import { ReceivedMessageProvider } from "./components/ReceivedMessageContext";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
          <ChatBox />
          </>
      )}
    </div>
  );
}

export default App;
