import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import Spacy from "spacy-js";
import axios from "axios";

function App() {
  const [transcript, setTranscript] = useState("");
  const { finalTranscript, resetTranscript } = useSpeechRecognition();
  const [namedEntities, setNamedEntities] = useState([]);

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

    try {
      const response = await fetch("http://localhost:8080/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ text: finalTranscript }), // Send the text data as JSON
      });

      if (response.ok) {
        const entities = await response.json();
        setNamedEntities(entities);
        console.log(" this is entity ", entities);
      } else {
        console.error("Error processing text:", response.statusText);
      }
    } catch (error) {
      console.error("Error processing text:", error);
    }
  };

  return (
    <div className="App">
      <button onClick={handleListen}>Start Listening</button>
      <button onClick={handleStop}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={() => setTranscript("")}>Clear</button>
      <p>This is transcript: {transcript}</p>
      <p>Named entities: {JSON.stringify(namedEntities)}</p>
    </div>
  );
}

export default App;
