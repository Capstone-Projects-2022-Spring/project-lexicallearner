import { useState, useEffect } from "react";
import "./chat.css";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import Friendbar from "../chat-friendbar/Friendbar";
import Roommodal from "../chat-roommodal/Roommodal";
import io from "socket.io-client";
import LanguageModal from "../chat-languagemodal/LanguageModal";
import ImageModal from "../chat-imgmodal/ImageModal";
import FileUpload from "../chat-fileUpload/FileUpload";
import ProfileModal from "../chat-profilemodal/ProfileModal";

//connect to chat server
const socket = io(process.env.CHAT_SERVER_URL || "http://localhost:8000");
const Chat = (props) => {
  let pref_lang = localStorage.getItem("preferred_language");
  if (!pref_lang) pref_lang = "es";
  const [preferredLanguage, setPreferredLanguage] = useState(pref_lang);

  //current chat
  const [current, setCurrent] = useState("");
  //username TODO:
  const [username, setUsername] = useState(
    props.user.username || "User" + new Date(Date.now()).getMilliseconds()
  );
  //room
  const [room, setRoom] = useState("");
  //room modal
  const [roommodal, setRoommodal] = useState(false);
  //room modal
  const [languagemodal, setLanguagemodal] = useState(false);
  //room profile modal
  const [profilemodal, setProfileModal] = useState(false);
  //search bar
  const [searchbar, setSeearchBar] = useState("");
  //emoji picker
  const [emojiPicker, setEmojiPicker] = useState(false);
  //autoscroll height
  const [scrollHeight, setScrollHeight] = useState(
    document.querySelector(".chat-messages")?.scrollHeight
  );
  //rooms
  const [rooms, setRooms] = useState(["demo1", "demo2"]);
  //current msg in the chat send box
  const [currentMessage, setCurrentMessage] = useState("");
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
          msg: "helloworldhelloworldhelloworldhelloworldhelloworld ",
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),',
        },
      ],
    },
  ]);
  //send msg if not empty else alert error
  const send = async (e, msg, type) => {
    e.preventDefault();
    if ((currentMessage !== "" && room !== "" && username !== "") || msg) {
      //sending data to chatserver
      let data = {
        room: room,
        from: username,
        msg: currentMessage || msg,
        type: type,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      //console.log(data);
      //send msg to socket
      await socket.emit("send msg", data);
      setCurrentMessage("");
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
      //set scroll height
      setScrollHeight(document.querySelector(".chat-messages")?.scrollHeight);
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
      setMessages((messages) => {
        const messagesCopy = [...messages];
        const index = messagesCopy.findIndex((item) => item.room === data.room);
        messagesCopy[index] = {
          ...messagesCopy[index],
          messages: [...messages[index].messages, data],
        };
        return messagesCopy;
      });
      setScrollHeight(document.querySelector(".chat-messages")?.scrollHeight);
      console.log("new scroll height: " + document.querySelector(".chat-messages")?.scrollHeight);
    });
  }, [socket]);

  async function detectAndTranslate(text, targetLang, target) {
    let transObj = {
      targetLang: targetLang,
      oriText: text,
      oriLang: "",
      targetText: "",
    };

    const API_KEY =
      process.env.GOOGLE_TRANSLATE_API_KEY ||
      process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += "&q=" + encodeURI(text);
    url += `&target=${targetLang}`;

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        transObj.oriLang = response.data.translations[0].detectedSourceLanguage;
        transObj.targetText = response.data.translations[0].translatedText;
      })
      .catch((error) => {
        console.log("There was an error with the translation request: ", error);
      });
    return transObj;
  }
  function divTranslate(text, lang, key) {
    let trans = detectAndTranslate(text, lang);
    trans.then((obj) => {
      document.querySelector(".chat-msgbox-" + key).childNodes[1].innerHTML =
        obj.targetText;
    });
  }

  //autoScroll
  useEffect(() => {
    let st = document.querySelector(".chat-messages")?.scrollTop;
    let osh = document.querySelector(".chat-messages")?.offsetHeight;
    let sh = document.querySelector(".chat-messages")?.scrollHeight;
    let msgs = document.querySelector(".chat-messages").children;
    let lastmgsheight = msgs[msgs.length - 1]?.offsetHeight;
    //scrolling??
    if (sh - (st + osh) <= lastmgsheight + 1) {
      document.querySelector(".chat-messages").scrollTop = sh;
    }
  }, [scrollHeight]);

  return (
    <div className="chat">
      {/*room modal*/}
      {roommodal && (
        <Roommodal
          roommodal={roommodal}
          setRoommodal={setRoommodal}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          rooms={rooms}
          setRooms={setRooms}
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
              onChange={(e) => setSeearchBar(e.target.value)}
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
          {
            messages.map((message, key) => {
              if (searchbar === "") {
                const lastmsg =
                  message.messages.length === 0
                    ? ""
                    : message.messages[message.messages.length - 1];
                return (
                  <div key={key}>
                    <Friendbar
                      logo={<BsIcons.BsRainbow />}
                      name={message.room}
                      lastmsg={lastmsg}
                      lastdate={"Yesterday"}
                      current={current}
                      setCurrent={setCurrent}
                      currentRoom={message.room}
                      setRoom={setRoom}
                    />
                  </div>
                );
              } else {
                if (message.room.includes(searchbar)) {
                  const lastmsg =
                    message.messages.length === 0
                      ? ""
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
                        currentRoom={message.room}
                        setRoom={setRoom}
                      />
                    </div>
                  );
                }
              }
              return null;
            })

            //TODO database
          }
        </div>
      </div>
      {/* right box */}
      <div className="chat-rightbox">
        <div className="chat-righttitle">
          {current}
          <button
            className="chat-righttitle-userprofile"
            onClick={() => setProfileModal(!profilemodal)}
          >
            <BsIcons.BsPerson />
          </button>
        </div>
        <ProfileModal profilemodal={profilemodal} username={username} />
        {/* spawns messages */}
        <div className="chat-messages">
          {messages.map((room) => {
            return room.room === current
              ? room.messages.map((msg, key) => (
                  <div className="chat-message" key={key}>
                    {username === msg.from ? (
                      <div className="chat-mymessage">
                        {msg.type ? (
                          <img src={msg.msg} alt={msg.from} />
                        ) : (
                          <span className="chat-messagebox">{msg.msg}</span>
                        )}{" "}
                        :
                        <span className="chat-message-logo">
                          {props.user.icon}
                        </span>
                      </div>
                    ) : (
                      <div className="chat-theirmessage">
                        <span className="chat-message-logo">
                          {props.user.icon}
                        </span>
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
                          {msg.type ? (
                            <img src={msg.msg} alt={msg.from} />
                          ) : (
                            <div className="chat-messagebox">{msg.msg}</div>
                          )}
                          <div
                            className={`chat-messagebox chat-messagebox-translated ${
                              "chat-msgbox-" + key
                            }`}
                          >
                            <BsIcons.BsTranslate
                              style={{
                                width: "0.9rem",
                                height: "0.9rem",
                                marginRight: "0.25rem",
                              }}
                              onClick={() =>
                                divTranslate(msg.msg, preferredLanguage, key)
                              }
                            />
                            <div id="translateResponse"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              : null;
          })}
        </div>
        {/* textbox */}
        <div className="chat-sendmessage">
          <div className="chat-sendmessage-toolbar">
            <div className="chat-sendmessage-toolbar-left">
              <button
                className="chat-sendmessage-toolbar-image"
                onClick={() => setEmojiPicker(!emojiPicker)}
              >
                <IoIcons.IoMdHappy style={{ width: "25px", height: "25px" }} />
              </button>
              <FileUpload send={send} />
            </div>
            {/*language modal*/}
            {languagemodal && (
              <LanguageModal
                preferredLanguage={preferredLanguage}
                setPreferredLanguage={setPreferredLanguage}
              />
            )}
            <button onClick={() => setLanguagemodal(!languagemodal)}>
              <BsIcons.BsTranslate style={{ width: "25px", height: "25px" }} />
            </button>
          </div>
          {emojiPicker && (
            <div className="chat-sendmessage-imojipicker">
              <ImageModal
                send={send}
                emojiPicker={emojiPicker}
                setEmojiPicker={setEmojiPicker}
              />
            </div>
          )}
          {/* textarea */}
          <textarea
            cols="30"
            rows="10"
            value={currentMessage}
            id="textarea"
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) send(e);
            }}
          />

          {/* send msg button */}
          <input
            type="submit"
            value="Send"
            className="chat-sendbtn"
            onClick={send}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
