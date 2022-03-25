import React from "react";
import { BsAlarm } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Friendbar from "../chat-friendbar/Friendbar";
import "./roommodal.css";

const Roommodal = (props) => {
  const publicrooms = [
    {
      room: "demo3",
      messages: [
        {
          from: "Lexical Chat",
          msg: "Welcome to demo room",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
        {
          from: "demo3",
          msg: "HELLO",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
      ],
    },
    {
      room: "PR1",
      messages: [
        {
          from: "Lexical Chat",
          msg: "Welcome to PR1 room",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
      ],
    },
  ];

  const createRoom = () => {};

  //join room. await?
  const joinRoom = (room) => {
    //repeated room flag
    let repeated = false;
    //check for repeated room
    props.rooms.map((roomx) => {
      return (repeated = roomx.room === room.room);
    });
    //if room not repeated
    if (!repeated) {
      /* props.setRooms((rooms) => [
        ...rooms,
        {
          room: room.room,
          messages: [],
        },
      ]); */
      props.setRooms([...props.rooms, room]);
      props.socket.emit("join room", room.room);
      /*
      props.setMessages((messages) => [
        ...messages,
        {
          room: room.room,
          messages: [],
        },
      ]); */
    } else {
      alert("already joined");
    }
  };

  return (
    <div className="roommodal">
      <button
        className="roommodal-close"
        onClick={() => {
          props.setRoommodal(!props.roommodal);
        }}
      >
        <AiOutlineClose />
      </button>

      <div className="roommodal-left">
        <span className="roommodal-left-title">Create Chat Room</span>
        <br />
        <form action="#">
          <input type="text" placeholder="Room Name" />
          <br />
          <input type="text" placeholder="Room Description" />
          <br />
          <input type="radio" name="roomtype" id="public" value="public" />
          <label htmlFor="public">Public</label>
          <input type="radio" name="roomtype" id="public" value="private" />
          <label htmlFor="public" value="private">
            Private
          </label>
          <br />
          <input type="submit" value="Create" />
        </form>
        <h3>OR</h3>
        <span className="roommodal-left-title">Join Chat Room</span>
        <br />
        <form action="#">
          <input type="text" placeholder="Room Name" />
          <br />
          <input type="submit" value="Join" />
        </form>
      </div>

      <div className="roommodal-right">
        <span className="roommodal-right-title">Public Room /WIP/</span>
        <br />
        <ul className="roommodal-right-invited">
          {publicrooms.map((room, key) => {
            return (
              <li key={key}>
                <button
                  onClick={() => {
                    joinRoom(room);
                  }}
                >
                  Join
                </button>
                {room.room} <br />
                {/* <span>{room.description}</span> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Roommodal;
