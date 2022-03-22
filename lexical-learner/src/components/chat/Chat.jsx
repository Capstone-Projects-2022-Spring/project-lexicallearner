import React, { useState, useEffect } from 'react'
import "./chat.css"
import * as BsIcons from 'react-icons/bs'
import * as IoIcons from 'react-icons/io'
import Friendbar from '../chat-friendbar/Friendbar'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_LOCALHOST || 'http://localhost:8000')

const Chat = (props) => {
  //current chat
  const [current, setCurrent] = useState('')

  //considering useReducer
  const [username, setUsername] = useState(props.user.username || "")

  //room
  const [room, setRoom] = useState('')

  //current msg in the chat send box
  const [currentMessage, setCurrentMessage] = useState('')

  //current msgs in the chat msgs box
  const [currentMessages, setCurrentMessages] = useState([])

  //messages for demo
  const [messages, setMessages] = useState([
    {
      room: 'demo1',
      messages: [
        {
          from: 'demo',
          msg: 'Welcome to demo room',
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),'
        },
        {
          from: 'ranni',
          msg: 'HELLO',
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),'
        },
      ]
    },
    {
      room: 'demo2',
      messages: [
        {
          from: 'demo',
          msg: 'Welcome to demo room',
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),'
        },
        {
          from: 'ranni',
          msg: 'HELLO',
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),'
        },
      ]
    }
  ])

  //send msg if not empty else alert error
  const sendMessage = async () => {
    if (currentMessage !== "" && room !== "" && username !== "") {
      //sending data to chatserver
      let data = {
        room: room,
        from: username,
        msg: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      console.log("msg sent");
      console.log(data);

      //socket -> send msg
      await socket.emit("send msg", data)

      //update current chat messages
      setCurrentMessages(msgs => [...msgs, data])
      setCurrentMessage("")
    } else {
      //alert no room, message, or username
      alert("no room or no message or no username")
      setCurrentMessage("")
    }
  }

  //one time effect
  useEffect(() => {
    //join room when loaded
    messages.map((msg, key) => {
      return socket.emit("join room", msg.room)
    })

  }, [])

  //socket -> received msg
  useEffect(() => {
    socket.on("received msg", (data) => {
      console.log('receive msg: ' + data.msg);
      setCurrentMessages(msgs => [...msgs, data])
      
      /* setCurrentMessages() */ //TODO
    })
  }, [socket])

  return (
    <div className="chat">
      {/* left box */}
      <div className="chat-leftbox">
        <div className="chat-lefttitle">
          <input type="text" placeholder={'Search...'}
            onChange={(e) => setUsername(e.target.value)}>
          </input>
          <button><IoIcons.IoIosAdd /></button>
        </div>
        <div className="chat-friends">
          {props.user.demo ?
            messages.map((message, key) => (
              <div key={key}>
                <Friendbar
                  logo={<BsIcons.BsRainbow />}
                  name={message.room}
                  lastmsg={'for demo'}
                  lastdate={'Yesterday'}
                  current={current}
                  setCurrent={setCurrent}
                  currentMessages={message.messages}
                  setCurrentMessages={setCurrentMessages}
                  currentRoom={message.room}
                  setRoom={setRoom}
                />
              </div>
            ))
            :
            null //TODO database
          }
        </div>
      </div>

      {/* right box */}
      <div className="chat-rightbox">
        <div className="chat-righttitle"> {current} </div>
        {/* spawns messages */}
        <div className="chat-messages">
          {currentMessages.map((msg, key) => (
            <div className="chat-message" key={key}>
              {username === msg.from ?
                <div className="chat-mymessage">
                  <span className="chat-messagebox">{msg.msg}</span> :
                  <span className="chat-message-logo">{props.user.icon}</span>
                </div>
                :
                <div className="chat-theirmessage">

                  <div style={{ display: 'flex' }}>
                    <span className="chat-message-logo">
                      {props.user.icon}
                    </span> :
                    <div>
                      <div style={{
                        marginBottom: "0.75rem",
                        marginLeft: "0.2rem",
                        maxWidth: "400px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>{msg.from}</div>
                      <div className="chat-messagebox">
                        {msg.msg}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          ))}
        </div>

        {/* textbox */}
        <div className="chat-sendmessage">
          {/* textarea */}
          <textarea cols="30" rows="10" value={currentMessage} id="textarea"
            onChange={e => setCurrentMessage(e.target.value)}
            onKeyPress={e => {if(e.key === "Enter" && !e.shiftKey) sendMessage()}}
          />
          {/* send button */}
          <input type="submit" value="Send" className="chat-sendbtn" onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default Chat