import "./friendbar.css";
import React from "react";

const Friendbar = (props) => {
  const isactive = props.name === props.current ? "friendbar-active" : "";

  return (
    <div
      className={`friendbar ${isactive} ${
        !isactive ? "friendbar-mouseover" : ""
      }`}
      onClick={() => {
        props.setCurrent(props.name);
        props.setRoom(props.currentRoom);
      }}
    >
      <div className="friendbar-logo">{props.logo}</div>
      <div className="friendbar-friend">
        <div className="friendbar-friend-name">{props.name}</div>
        <div className="friendbar-friend-lastmsg">
          <span>
            {(props.lastmsg.from? props.lastmsg.from+": " : "")}
            {props.lastmsg.type ? "[img]" : props.lastmsg.msg}
          </span>
        </div>
      </div>
      {/* <div className="friendbar-lastdate">
                {props.lastdate}
            </div> */}
    </div>
  );
};

export default Friendbar;
