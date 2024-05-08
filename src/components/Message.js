import React from "react";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>

  );
};
export default Message;

// import React, { useState, useEffect } from "react";
// import { auth } from "./Firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import * as deepl from 'deepl-node/dist';


// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);
//   const authKey = "4f50da36-2758-43d2-a887-77cc7a06db8c:fx";
//   const translator = new deepl.Translator(authKey);
//   const [translatedMessage, setTranslatedMessage] = useState(null);
//   const [translationError, setTranslationError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const translateMessage = async () => {
//     if (message.text) {
//       setIsLoading(true);
//       const sourceLang = "auto"; // Assuming the source language is auto-detected

//       // If the message is in English, translate to Japanese; if in Japanese, translate to English
//       const targetLang = message.lang === "EN" ? "JA" : "EN";

//       try {
//         (async () => {
//           const result = await translator.translateText(message.text, null, targetLang);
//           console.log(result.text);
//       })();
//         setTranslatedMessage(result);
//       } catch (error) {
//         console.error("Error translating message:", error);
//         const errorMessage = "Error translating message";
//         setTranslationError(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     translateMessage();
//   }, [message]);

//   return (
//     <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
//       <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         <p className="user-message">{message.text}</p>
//         {isLoading && <p className="loading-message">Translating...</p>}
//         {translationError ? (
//           <p className="error-message">{translationError}</p>
//         ) : (
//           <p className="user-message">{translatedMessage || message.text}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;


// import React, { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./Firebase";
// import { DeepL } from 'deepl-node';

// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);
//   const [translatedMessage, setTranslatedMessage] = useState(null);
//   const [translationError, setTranslationError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const translateMessage = async () => {
//     if (message.text) {
//       setIsLoading(true);
//       const text = message.text;
//       const sourceLang = "auto"; // Assuming the source language is auto-detected

//       // If the message is in English, translate to Japanese; if in Japanese, translate to English
//       const targetLang = message.lang === "en" ? "JA" : "EN";

//       try {
//         const deepl = new DeepL('4f50da36-2758-43d2-a887-77cc7a06db8c:fx');
//         const response = await deepl.translateText(text, sourceLang, targetLang);
//         setTranslatedMessage(response.translations[0].text);
//       } catch (error) {
//         console.error("Error translating message:", error);
//         const errorMessage = error.response?.data?.message || "Error translating message";
//         setTranslationError(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     translateMessage();
//   }, [message]);

//   return (
//     <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
//       <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         {isLoading && <p className="loading-message">Translating...</p>}
//         {translationError ? (
//           <p className="error-message">{translationError}</p>
//         ) : (
//           <p className="user-message">{translatedMessage || message.text}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;



 // Replace with your key



//  import React, { useState, useEffect } from "react";
//  import { auth } from "./Firebase";
//  import { useAuthState } from "react-firebase-hooks/auth";
//  import axios from "axios";
 
//  const Message = ({ message }) => {
//    const [user] = useAuthState(auth);
//    const [translatedMessage, setTranslatedMessage] = useState("");
//    const [sourceLang, setSourceLang] = useState("auto");
 
//    useEffect(() => {
//      const translateMessage = async () => {
//        try {
//          const response = await axios.post(
//            "http://127.0.0.1:5000/translate",
//            {
//              text: message.text,
//              source_lang: sourceLang,
//              target_lang: sourceLang === "EN" ? "JA" : "EN"
//            }
//          );
//          setTranslatedMessage(response.data.translated_text);
//        } catch (error) {
//          console.error("Error translating message:", error);
//        }
//      };
 
//      if (message.text) {
//        translateMessage();
//      }
//    }, [message.text, sourceLang]);
 
//    return (
//      <div
//        className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
//        <img
//          className="chat-bubble__left"
//          src={message.avatar}
//          alt="user avatar"
//        />
//        <div className="chat-bubble__right">
//          <p className="user-name">{message.name}</p>
//          <p className="user-message">{message.text}</p>
//          <div>
//            <label htmlFor="sourceLang">Source Language:</label>
//            <select
//              id="sourceLang"
//              value={sourceLang}
//              onChange={(e) => setSourceLang(e.target.value)}
//            >
//              <option value="auto">Auto Detect</option>
//              <option value="EN">English</option>
//              <option value="JA">Japanese</option>
//            </select>
//          </div>
//          {translatedMessage && (
//            <p className="translated-message">{translatedMessage}</p>
//          )}
//        </div>
//      </div>
//    );
//  };
 
//  export default Message;
 