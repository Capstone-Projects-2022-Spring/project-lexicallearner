import React from "react";
import { AiOutlineClose } from "react-icons/ai";
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

  const createRoom = (e) => {
    e.preventDefault()
    if (document.getElementById("room").value === "" ||
      document.querySelector('input[name="roomtype"]:checked') == undefined) {
      alert("missing room name or room type")
    } else {
      const newRoom = {
        room: document.getElementById("room").value,
        messages: [],
        type: document.querySelector('input[name="roomtype"]:checked')?.value,
      }
      console.log(newRoom);
      props.socket.emit("join room", newRoom.room);

      //add room to room list in messages
      props.setMessages((messages) => [
        ...messages, newRoom
      ])
    }
  };

  //join room. await?
  const joinRoom = (room) => {
    //repeated room flag
    let repeated = false;
    //check for repeated room
    props.messages.map((roomx) => {
      if (roomx.room === room.room) repeated = true
      return null
    });
    //if room not repeated
    if (!repeated) {
      props.socket.emit("join room", room.room);

      //add room to room list in messages
      props.setMessages((messages) => [
        ...messages,
        {
          room: room.room,
          messages: [],
          type: 'public'
        },
      ])
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
        <form onSubmit={createRoom}>
          <input type="text" id="room" placeholder="Room Name" />
          <br />
          {/* <input type="text" placeholder="Room Description" />
          <br /> */}
          <input type="radio" name="roomtype" id="public" value="public" />
          <label htmlFor="public">Public</label>
          <input type="radio" name="roomtype" id="public" value="private" />
          <label htmlFor="public" value="private">Private</label>
          <br />
          <input type="submit" value="Create" />
        </form>
        <h3>OR</h3>
        <span className="roommodal-left-title">Join Chat Room</span>
        <br />
        <form onSubmit={joinRoom}>
          <input type="text" id="room" placeholder="Room Name" />
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
