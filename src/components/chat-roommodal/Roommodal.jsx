import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./roommodal.css";
const axios = require("axios");

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
    e.preventDefault();
    let room = document.getElementById("room").value;
    if (document.getElementById("room").value === "") {
      alert("missing room name or room type");
    } else {
      let API;
      if (process.env.CHAT_SERVER_URL) {
        API = process.env.CHAT_SERVER_URL + "/chat/rooms";
      }
      axios
        .get(API || "http://localhost:8000/chat/rooms")
        .then((res) => {
          //console.log(res.data);
          if (!res.data.includes(room, 0)) {
            console.log("Not Found");
            const newRoom = {
              room: room,
              messages: [],
              type: null,
            };
            console.log(room);
            props.socket.emit("join room", room);

            //add room to room list in messages
            props.setMessages((messages) => [...messages, newRoom]);
          } else {
            alert("Room Already Created");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      /*       const newRoom = {
        room: document.getElementById("room").value,
        messages: [],
        type: document.querySelector('input[name="roomtype"]:checked')?.value,
      };
      console.log(document.getElementById("room").value);
      props.socket.emit("join room", document.getElementById("room").value);

      //add room to room list in messages
      props.setMessages((messages) => [...messages, newRoom]); */
    }
  };

  //join public room. await?
  const joinPublicRoom = (room) => {
    //repeated room flag
    let repeated = false;
    //check for repeated room
    props.messages.map((roomx) => {
      if (roomx.room === room.room) repeated = true;
      return null;
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
          type: "public",
        },
      ]);
    } else {
      alert("already joined");
    }
  };

  //join custom room
  const joinRoom = (e) => {
    e.preventDefault();

    const room = document.getElementById("joinRoomName").value;
    if (room === "") {
      alert("missing room name");
    } else {
      if (props.rooms.includes(room, 0)) {
        alert("Room Already Joined");
      } else {
        let API;
        if (process.env.CHAT_SERVER_URL) {
          API = process.env.CHAT_SERVER_URL + "/chat/rooms";
        }
        axios
          .get(API || "http://localhost:8000/chat/rooms")
          .then((res) => {
            //console.log(res.data);
            if (res.data.includes(room, 0)) {
              console.log("found");
              const newRoom = {
                room: room,
                messages: [],
                type: null,
              };
              console.log(room);
              props.socket.emit("join room", room);

              //add room to room list in messages
              props.setMessages((messages) => [...messages, newRoom]);
            } else {
              alert("Room Not Found");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
          {/* <input type="radio" name="roomtype" id="public" value="public" />
          <label htmlFor="public">Public</label>
          <input type="radio" name="roomtype" id="public" value="private" />
          <label htmlFor="public" value="private">Private</label>
          <br /> */}
          <input type="submit" value="Create" />
        </form>
        <br />
        <hr />
        <br />
        <span className="roommodal-left-title">Join Chat Room</span>
        <br />
        <form onSubmit={joinRoom}>
          <input type="text" id="joinRoomName" placeholder="Room Name" />
          <br />
          <input type="submit" value="Join" />
        </form>
      </div>

      <div className="roommodal-right">
        <span className="roommodal-right-title">Public Room</span>
        <hr />
        <ul className="roommodal-right-invited">
          {publicrooms.map((room, key) => {
            return (
              <li key={key}>
                {room.room}
                <button
                  onClick={() => {
                    joinPublicRoom(room);
                  }}
                >
                  Join
                </button>
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
