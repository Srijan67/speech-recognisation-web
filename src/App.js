import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Fragment, useEffect, useState } from "react";
import { Button } from "antd";
import UserForm from "./components/UserForm";

import { Avatar, Card } from "antd";
const { Meta } = Card;

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
            text: finalTranscript,
            // text: "john doe , who is 35 years old, was diagnosed with lung cancer . His doctor prescribed him a chemotherapy treatment and a medication called Tylenol .",
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
    <Fragment>
      <div className="App-header">
        <Card
          style={{
            width: 350,
          }}
          cover={
            <img
              alt="example"
              src="https://cdn.pixabay.com/photo/2018/07/15/18/55/audio-3540254__340.jpg"
            />
          }
          actions={[
            <Button type="primary" onClick={handleListen} disabled={listening}>
              {listening ? "Listening..." : "Start"}
            </Button>,
            <Button
              type="primary"
              onClick={handleStop}
              disabled={!listening}
              danger>
              Stop
            </Button>,
            <Button
              onClick={() => {
                resetTranscript();
                setTranscript("");
              }}>
              Clear
            </Button>,
          ]}>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Speech To Text Recorder "
            description={listening ? "Listening..." : "Start Listening"}
          />
        </Card>

        {/* <p>This is transcript: {transcript}</p>
        <p>Named entities: {JSON.stringify(namedEntities)}</p> */}
      </div>
      <UserForm entities={namedEntities} />
    </Fragment>
  );
}

export default App;
