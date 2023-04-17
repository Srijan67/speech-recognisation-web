import classes from "./ListenerCard.module.css";
import { Avatar, Card, Button } from "antd";
import Lottie from "lottie-react";
import recording from "../recording.json";
import { motion } from "framer-motion";
import { useState } from "react";

const { Meta } = Card;

const ListenerCard = (props) => {
  const [playingState, setPlayingState] = useState(false);

  const handleStart = () => {
    setPlayingState(true);
    props.handleListen();
  };

  const handleStop = () => {
    setPlayingState(false);
    props.handleStop();
  };
  return (
    <motion.div
      className={classes.header}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{
        delay: 1,
        duration: 1,
      }}
      whileHover={{
        scale: 1.1,
      }}>
      <Card
        style={{
          width: 300,
          height: 400,
        }}
        cover={
          playingState ? (
            <Lottie animationData={recording} loop={true} />
          ) : (
            <Lottie animationData={recording} loop={false} />
          )
        }
        actions={[
          <Button
            type="primary"
            onClick={handleStart}
            disabled={props.listening}
            className={classes.button}>
            {props.listening ? "Listening..." : "Start"}
          </Button>,
          <Button
            type="primary"
            onClick={handleStop}
            disabled={!props.listening}
            danger
            className={classes.button}>
            Stop
          </Button>,
          <Button
            onClick={() => {
              props.resetTranscript();
              props.setTranscript("");
            }}
            className={classes.button}>
            Clear
          </Button>,
        ]}>
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title="Speech To Text Recorder "
          description={props.listening ? "Listening..." : "Start Listening"}
        />
      </Card>

      {/* <p>This is transcript: {transcript}</p>
        <p>Named entities: {JSON.stringify(namedEntities)}</p> */}
    </motion.div>
  );
};

export default ListenerCard;
