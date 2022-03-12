import React, { useState } from 'react'
import "./chat.css"
import * as BsIcons from 'react-icons/bs'
import Friendbar from '../chat-friendbar/Friendbar'
import messages from './msgdata.js'

const Chat = (props) => {

  //current chat
  const [current, setCurrent] = useState('')

  return (
    <div className='chat'>
      <div className="chat-leftbox">
        <div className="chat-lefttitle">Friends</div>
        <div className="chat-friends">
          <Friendbar
            logo={<BsIcons.BsApple />}
            name={'DUNG EATER'}
            lastmsg={'GAAAAAAAAAAkkkkkkkkkkkkkkkkkAAYOGJOAaejojojojojogk'}
            lastdate={'Yesterday'}
            current={current}
            setCurrent={setCurrent}
          />

          <Friendbar
            logo={<BsIcons.BsGoogle />}
            name={'Melina'}
            lastmsg={'GAAAAAAAAAAAegkoaegk'}
            lastdate={'1:08 PM'}
            current={current}
            setCurrent={setCurrent}
          />

          <Friendbar
            logo={<BsIcons.BsShield />}
            name={'Ranni'}
            lastmsg={'OJkoaegkoaeggggggggggggggggggk'}
            current={current}
            setCurrent={setCurrent}
          />
        </div>
      </div>
      <div className="chat-rightbox">
        <div className="chat-righttitle">{current}</div>
        <div className="chat-messages">
          {messages.map((msg, key) => (
            <div key={key} className='chat-message'>
              {props.user.username === msg.from ?
                <div className='chat-mymessage'>
                  <span className='chat-messagebox'>{msg.msgs}</span>
                  : <span className='chat-message-logo'> {props.user.icon} </span>
                </div>

                :
                
                <div className="chat-theirmessage">
                  <span className='chat-message-logo'> <BsIcons.BsWrench /> </span>
                  : <span className='chat-messagebox'>{msg.msgs}</span>
                </div>
              }
            </div>
          ))}
        </div>

        <form action="" className="chat-sendmessage">
          <textarea name="text" id="" cols="30" rows="10"></textarea>
          <input type="submit" value="Send" className='chat-sendbtn' />
        </form>
      </div>


    </div>
  )
}

export default Chat