import { Fragment } from "react";
import classes from "./Header.module.css";

import UserForm from "./UserForm";
import ListenerCard from "./ListenerCard";
import { useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import recording from "../recording.json";

const Header = (props) => {
  const [showListener, setShowListener] = useState(false);

  const showListenerHandler = () => {
    setShowListener((prevState) => !prevState);
  };
  return (
    <Fragment>
      <div
        className={
          showListener
            ? `${classes["showlistener-container"]}`
            : `${classes.container}`
        }>
        <div className={classes.left}>
          <div className={classes.header}>
            <h2 className={`${classes.animation} ${classes.a1}`}>Welcome</h2>
            <h4 className={`${classes.animation} ${classes.a2}`}>
              Fill your form using react to text speech recogination
            </h4>
          </div>
          <UserForm entities={props.entities} />
        </div>

        {showListener && (
          <div
            className={showListener ? `${classes.right}` : `${classes.hidden}`}>
            <ListenerCard
              handleListen={props.handleListen}
              listening={props.listening}
              handleStop={props.handleStop}
              resetTranscript={props.resetTranscript}
              setTranscript={props.setTranscript}
              showListener={showListener}
            />
          </div>
        )}
      </div>
      {!showListener && (
        <motion.div
          className={classes["box-container"]}
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            delay: 2,
            duration: 5,
          }}>
          <div className={classes.box}>
            <Lottie animationData={recording} loop={false} />
            <h2>Voice Recogination</h2>
            <p>
              Hey there! Would you like to fill out this form using your voice?
            </p>
            <button type="primary" onClick={showListenerHandler}>
              click here
            </button>
          </div>
        </motion.div>
      )}
    </Fragment>
  );
};

export default Header;
