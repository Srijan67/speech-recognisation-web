import { Fragment } from "react";
import classes from "./Header.module.css";

import UserForm from "./UserForm";
import ListenerCard from "./ListenerCard";

const Header = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.header}>
            <h2 className={`${classes.animation} ${classes.a1}`}>Welcome</h2>
            <h4 className={`${classes.animation} ${classes.a2}`}>
              Fill your form using react to text speech recogination
            </h4>
          </div>
          <UserForm entities={props.entities} />
        </div>
        <div className={classes.right}>
          <ListenerCard
            handleListen={props.handleListen}
            listening={props.listening}
            handleStop={props.handleStop}
            resetTranscript={props.resetTranscript}
            setTranscript={props.setTranscript}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
