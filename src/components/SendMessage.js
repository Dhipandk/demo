import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from 'axios';

const SendMessage = ({ scroll }) => {

  const [message, setMessage] = useState("");
  // const { receivedMessage, setReceivedMessage } = useState("");
  // const [data,setData]=useState([{}]);
  
  // useEffect(() => {
  //   fetch("/send-messaage").then(
  //     res=>res.json()
  //   ).then(
  //     data=>{
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // },[])
  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;



      // Send message data to Flask backend
      const response = await axios.post("http://127.0.0.1:5000/send-message", {
        message: message,
        displayName: displayName,
        uid: uid,
      });

      console.log("Response from Flask:", response.data);

      // const updateReceivedMessage = (message) => {
      //   setReceivedMessage(message);
      // };

      // updateReceivedMessage(response.data.message);

      // setReceivedMessage(response.data.message);
      try {
        await addDoc(collection(db, "messages"), {
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
          translatedtext: response.data.message
        });

      setMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" })
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };



    // setMessage("");
  
 
  
  
  return (
    <div>
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
    </div>
  );

};

export default SendMessage;

