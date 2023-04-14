import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [transcript, setTranscript] = useState("");
  const { finalTranscript, resetTranscript, listening } = useSpeechRecognition({
    continuous: true,
  });
  const [namedEntities, setNamedEntities] = useState({});

  const handleListen = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition");
      return;
    }

    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = async () => {
    SpeechRecognition.stopListening();

    setTranscript(finalTranscript);
    console.log(" this is script ", finalTranscript);
  };

  useEffect(() => {
    const sendingRes = async () => {
      try {
        const response = await fetch("http://localhost:8080/parse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({
            // text: finalTranscript,
            text: "john doe , who is 35 years old, was diagnosed with lung cancer . His doctor prescribed him a chemotherapy treatment and a medication called Tylenol .",
          }), // Send the text data as JSON
        });

        if (response.ok) {
          const entities = await response.json();
          console.log(" this is entity ", entities);
          console.log(entities.flat());
          const result = entities.flat().reduce((acc, { label, text }) => {
            acc[label] = text;
            return acc;
          }, {});

          setNamedEntities(result);
          console.log(result);
        } else {
          console.error("Error processing text:", response.statusText);
        }
      } catch (error) {
        console.error("Error processing text:", error);
      }
    };
    if (finalTranscript) {
      sendingRes();
    }
  }, [finalTranscript]);

  return (
    <Header
      entities={namedEntities}
      handleListen={handleListen}
      listening={listening}
      handleStop={handleStop}
      resetTranscript={resetTranscript}
      setTranscript={setTranscript}
    />
  );
}

export default App;
