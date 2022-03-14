import React, { useState, useEffect } from 'react'
import "./chat.css"
import * as BsIcons from 'react-icons/bs'
import Friendbar from '../chat-friendbar/Friendbar'
import messages from './msgdata.js'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8000')

const Chat = (props) => {
  //props => username, room list

  //current chat
  const [current, setCurrent] = useState('')

  //considering useReducer
  const [username, setUsername] = useState(props.user.username)
  const [room, setRoom] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
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
      ]
    }
  ]
  )

  /*  const joinRoom = () => {
     username !== '' && room !== '' ?
       socket.emit("join_room", room) : console.log('wrong number');
   } */

   console.log(currentMessages);
   console.log("room: "+room);

  const sendMessage = async () => {
    console.log('sent something');
    if (currentMessage !== "" /* && room !== "" */) {
      let messageData = {
        room: room,
        from: username,
        msg: currentMessage,
        time: new Date(Date.now()).getTime + ":" + new Date(Date.now()).getMinutes(),
      };

      console.log(messageData);
      await socket.emit("send_message", messageData)
      setCurrentMessages([...currentMessages,messageData])
      setCurrentMessage("")
      
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      for (let room in messages) {
        if (messages[room].room === data.room) {
          setMessages(...messages[room].messages, {
            from: data.from,
            msg: data.msg,
            time: data.time //TODO
          })
        }
      }
    })
  }, [socket])

  return (
    <div className='chat'>
      <div className="chat-leftbox">
        <div className="chat-lefttitle">{props.user.username}</div>
        <div className="chat-friends">
          {props.user.username === "demo" ?
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
            null //TODO
          }
        </div>

      </div><div className="chat-rightbox">
        <div className="chat-righttitle">{current}</div>
        <div className="chat-messages">
          {currentMessages !== '' &&
            currentMessages.map((msg, key) => (
              <div className="chat-message" key={key}>
                {
                  props.user.username === msg.from ?
                    <div className='chat-mymessage'>
                      <span className='chat-messagebox'>{msg.msg}</span>
                      : <span className='chat-message-logo'> {props.user.icon} </span>
                    </div>

                    :

                    <div className="chat-theirmessage">
                      <span className='chat-message-logo'> <BsIcons.BsWrench /> </span>
                      : <span className='chat-messagebox'>{msg.msg}</span>
                    </div>
                }
              </div>
            ))
          }
        </div>

        <div action="sendMessage" className="chat-sendmessage">
          <textarea cols="30" rows="10" onChange={
            (e) => setCurrentMessage(e.target.value)}
            value={currentMessage}>
          </textarea>
          <input type="submit" value="Send" className='chat-sendbtn' onClick={sendMessage} />
        </div>
      </div>

    </div >
  )
}

export default Chat