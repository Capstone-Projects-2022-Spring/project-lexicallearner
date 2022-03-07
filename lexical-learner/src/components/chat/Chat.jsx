import React, { useState } from 'react'
import "./chat.css"
import * as BsIcons from 'react-icons/bs'
import Friendbar from '../chat-friendbar/Friendbar'

const Chat = () => {

  //current chat
  const [current, setCurrent] = useState('')

  return (
    <div className='chat'>
      <div className="chat-leftbox">
        <div className="chat-friends">
          <Friendbar
            logo={<BsIcons.BsApple />}
            name={'APPLEAPPLEAPPLEAPPLEAPPLEAPPLEAPPLEAPPLEAPPLEAPPLEAPPLEAPPLEAPPLE'}
            lastmsg={'GAAAAAAAAAAkkkkkkkkkkkkkkkkkAAYOGJOAaejojojojojogk'}
            lastdate={'Yesterday'}
            current={current}
            setCurrent={setCurrent}
          />
          <Friendbar
            logo={<BsIcons.BsGoogle />}
            name={'BEAR'}
            lastmsg={'GAAAAAAAAAAAegkoaegk'}
            lastdate={'1:08 PM'}
            current={current}
            setCurrent={setCurrent}
          />
          <Friendbar
            logo={<BsIcons.BsShield />}
            name={'ORANGE'}
            lastmsg={'OJkoaegkoaegk'}
            current={current}
            setCurrent={setCurrent}
          />
        </div>
      </div>
      <div className="chat-rightbox">
        <div className="chat-messages">
          chat messages TODO
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