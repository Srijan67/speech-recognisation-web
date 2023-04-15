import classes from "./ListenerCard.module.css";
import { Avatar, Card, Button } from "antd";
import Lottie from "lottie-react";
import recording from "../recording.json";
const { Meta } = Card;

const ListenerCard = (props) => {
  return (
    <div className={classes.header}>
      <Card
        style={{
          width: 300,
          height: 400,
        }}
        cover={
          // <img
          //   alt="example"
          //   src="https://cdn.pixabay.com/photo/2018/07/15/18/55/audio-3540254__340.jpg"
          // />
          <Lottie animationData={recording} loop={true} />
        }
        actions={[
          <Button
            type="primary"
            onClick={props.handleListen}
            disabled={props.listening}
            className={classes.button}>
            {props.listening ? "Listening..." : "Start"}
          </Button>,
          <Button
            type="primary"
            onClick={props.handleStop}
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
    </div>
  );
};

export default ListenerCard;
