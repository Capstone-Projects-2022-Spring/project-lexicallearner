import React, { useState, useEffect } from "react";
import "./chat.css";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import Friendbar from "../chat-friendbar/Friendbar";
import Roommodal from "../chat-roommodal/Roommodal";
import io from "socket.io-client";

//connect to chat server
const socket = io(process.env.REACT_APP_LOCALHOST || "http://localhost:8000");

const Chat = (props) => {
  //current chat
  const [current, setCurrent] = useState("");

  //username
  const [username, setUsername] = useState(props.user.username || 
    new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMilliseconds());

  //room
  const [room, setRoom] = useState("");

  //room modal
  const [roommodal, setRoommodal] = useState(false);

  //rooms, not used
  const [rooms, setRooms] = useState([]);

  //current msg in the chat send box
  const [currentMessage, setCurrentMessage] = useState("");

  //current msgs in the chat msgs box
  const [currentMessages, setCurrentMessages] = useState([]);

  //messages that contain room and msgs, for demo, default
  const [messages, setMessages] = useState([
    {
      room: "demo1",
      messages: [
        {
          from: "Lexical Chat",
          msg: "Welcome to demo room",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
        {
          from: "ranni",
          msg: "HELLO",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
      ],
    },
    {
      room: "demo2",
      messages: [
        {
          from: "Lexical Chat",
          msg: "Welcome to demo room",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
        {
          from: "ranni",
          msg: "hello world",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
      ],
    },
  ]);

  //send msg if not empty else alert error
  const sendMessage = async () => {
    if (currentMessage !== "" && room !== "" && username !== "") {
      //sending data to chatserver
      let data = {
        room: room,
        from: username,
        msg: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log("msg sent");
      console.log(data);

      //send msg to socket
      await socket.emit("send msg", data);

      //update current chat messages
      setCurrentMessages((msgs) => [...msgs, data]);
      await setCurrentMessage("");

      //update entire chat messages
      setMessages((messages) => {
        const messagesCopy = [...messages];
        const index = messagesCopy.findIndex((item) => item.room === room);
        if (index !== -1) {
          messagesCopy[index] = {
            ...messagesCopy[index],
            messages: [...messages[index].messages, data],
          };
        }

        return messagesCopy;
      });
    } else {
      //alert no room, message, or username
      alert("no room or no message or no username");
      setCurrentMessage("");
    }
  };

  //one time effect
  useEffect(() => {
    //join room when loaded
    messages.map((msg, key) => {
      return socket.emit("join room", msg.room);
    });
  }, []);

  //socket -> received msg
  useEffect(() => {
    socket.on("received msg", (data) => {
      console.log(data);
      console.log(current === data.room);
      if(current === data.room) setCurrentMessages((msgs) => [...msgs, data]);

      setMessages((messages) => {
        const messagesCopy = [...messages];
        const index = messagesCopy.findIndex((item) => item.room === data.room);
        messagesCopy[index] = {
          ...messagesCopy[index],
          messages: [...messages[index].messages, data],
        };
        return messagesCopy;
      });
    });
  }, [socket, current]);


  return (
    <div className="chat">
      {/*room moda*/}
      {roommodal && (
        <Roommodal
          roommodal={roommodal}
          setRoommodal={setRoommodal}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
      )}

      {/* left box */}
      <div className="chat-leftbox">
        <div className="chat-lefttitle">
          <div className="chat-searchbar">
            <IoIcons.IoMdSearch
              style={{
                height: "25px",
                backgroundColor: "rgb(216, 216, 216)",
                borderTopLeftRadius: "10%",
                borderBottomLeftRadius: "10%",
                paddingLeft: "0.2rem",
                paddingRight: "0.4rem",
                Color: "rgb(216, 216, 216)",
              }}
            />
            <input
              type="text"
              placeholder="Search"
              //TODO
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setRoommodal(!roommodal);
            }}
          >
            <IoIcons.IoIosAdd />
          </button>
        </div>
        <div className="chat-friends">
          {/*for demo*/}
          {messages.map((message, key) => {
            const lastmsg =
              message.messages.length === 0 ? ""
                : message.messages[message.messages.length - 1].msg;

            return (
              <div key={key}>
                <Friendbar
                  logo={<BsIcons.BsRainbow />}
                  name={message.room}
                  lastmsg={lastmsg}
                  lastdate={"Yesterday"}
                  current={current}
                  setCurrent={setCurrent}
                  currentMessages={message.messages}
                  setCurrentMessages={setCurrentMessages}
                  currentRoom={message.room}
                  setRoom={setRoom}
                />
              </div>
            );
          })

            //TODO database
          }
        </div>
      </div>

      {/* right box */}
      <div className="chat-rightbox">
        <div className="chat-righttitle">
          {current}
          <button className="chat-righttitle-userprofile">
            <BsIcons.BsPerson />
          </button>
        </div>
        {/* spawns messages */}
        <div className="chat-messages">
          {currentMessages.map((msg, key) => (
            <div className="chat-message" key={key}>
              {username === msg.from ? (
                <div className="chat-mymessage">
                  <span className="chat-messagebox">{msg.msg}</span> :
                  <span className="chat-message-logo">{props.user.icon}</span>
                </div>
              ) : (
                <div className="chat-theirmessage">
                  <div style={{ display: "flex" }}>
                    <span className="chat-message-logo">{props.user.icon}</span>{" "}
                    :
                    <div>
                      <div
                        style={{
                          marginBottom: "0.75rem",
                          marginLeft: "0.2rem",
                          maxWidth: "400px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {msg.from}
                      </div>
                      <div className="chat-messagebox">{msg.msg}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* textbox */}
        <div className="chat-sendmessage">
          {/*TOOLBAR IS HERE, if you are doing integration with google translate
          , then work on the last button that has a translate icon*/}
          <div className="chat-sendmessage-toolbar">
            {/* <div className="chat-sendmessage-toolbar-left">
              <button className="chat-sendmessage-toolbar-image">
                <BsIcons.BsImages style={{ width: "25px", height: "25px" }} />
              </button>
              <button>
                <BsIcons.BsFolder style={{ width: "25px", height: "25px" }} />
              </button>
            </div> */}

            <button>
              <BsIcons.BsTranslate style={{ width: "25px", height: "25px" }} />
            </button>
          </div>

          {/* textarea */}
          <textarea
            cols="30"
            rows="10"
            value={currentMessage}
            id="textarea"
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) sendMessage();
            }}
          />

          {/* send msg button */}
          <input
            type="submit"
            value="Send"
            className="chat-sendbtn"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
