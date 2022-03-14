import React, { useState, useEffect } from 'react'
import "./chat.css"
import * as BsIcons from 'react-icons/bs'
import Friendbar from '../chat-friendbar/Friendbar'
import io from 'socket.io-client'
const socket = io('http://localhost:8000')

const Chat = (props) => {
  //current chat
  const [current, setCurrent] = useState('')

  //considering useReducer
  const [username, setUsername] = useState(props.user.username || "")
  const [room, setRoom] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  const [currentMessages, setCurrentMessages] = useState([])

  console.log(currentMessages);
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
    }/* ,
    {
      room: 'demo2',
      messages: [
        {
          from: 'demo',
          msg: 'Welcome to demo room',
          time: 'new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),'
        },
      ]
    } */
  ])

  const sendMessage = async () => {
    if (currentMessage !== "" && room !== "" && username !== "") {
      let data = {
        room: room,
        from: username,
        msg: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      console.log(data);
      await socket.emit("send_message", data)
      setCurrentMessages(msgs => [...msgs, data])
      setCurrentMessage("")
    } else {
      alert("no room or no message or no username")
      setCurrentMessage("")
    }
  }

  useEffect(() => {
    messages.map((msg, key) => {
      return socket.emit("join room", msg.room)
    })
  }, [])

  useEffect(() => {
    socket.on("received_message", (data) => {
      console.log('receive msg: ' + data.msg);
      setCurrentMessages(msgs => [...msgs, data])
    })
  }, [socket])

  return (
    <div className="chat">
      {/* left box */}
      <div className="chat-leftbox">
        <div className="chat-lefttitle">
          <input type="text" placeholder='set username'
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="chat-friends">
          {props.user.demo ?
            messages.map((message, key) => (
              <div key={key}>
                <Friendbar
                  logo={<BsIcons.BsRainbow />}
                  name={message.room}
                  lastmsg={'GAAAAAAAAAAkkkkkkkkkkkkkkkkkAAYOGJOAaejojojojojogk'}
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
                      <div style={{paddingBottom: "0.35rem", marginLeft: "0.2rem"}}>{msg.from}</div>
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
          <textarea cols="30" rows="10" value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}></textarea>
          {/* send button */}
          <input type="submit" value="Send" className="chat-sendbtn" onClick={sendMessage} />
        </div>
      </div>
    </div>
  )
}

export default Chat