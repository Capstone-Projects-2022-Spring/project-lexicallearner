import React from 'react'
import { BsAlarm } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import Friendbar from '../chat-friendbar/Friendbar'
import './roommodal.css'

const Roommodal = (props) => {

  const publicrooms = [
    {
      room: "demo3",
      description: "gaming aming aming aming aming aming aming aming aming"
    },
    {
      room: "PR1",
      description: "something"
    }
  ]

  const createRoom = () => {

  }

  //join room. await?
  const joinRoom = (room) => {
    let repeat = false;
    props.rooms.map((roomx) => {
      if(roomx.room === room.room) return repeat = true;
    })
    //if room not repeated
    if(!repeat){
      props.setRooms((rooms) => [...rooms, {
        room: room.room,
        messages: []
      }
      ])
      props.socket.emit("join room", room.room);
    }else{
      alert("already joined")
    }
  }

  return (
    <div className='roommodal'>
      <button className="roommodal-close" onClick={() => {
        props.setRoommodal(!props.roommodal)
      }}><AiOutlineClose /></button>

      <div className="roommodal-left">
        <span className="roommodal-left-title">Create Chat Room</span><br />
        <form action="#">
          <input type="text" placeholder="Room Name" /><br />
          <input type="text" placeholder="Room Description" /><br />
          <input type="radio" name="roomtype" id="public" value="public" />
          <label htmlFor="public">Public</label>
          <input type="radio" name="roomtype" id="public" value="private" />
          <label htmlFor="public" value="private">Private</label><br />
          <input type="submit" value="Create" />
        </form>
        <h3>OR</h3>
        <span className="roommodal-left-title">Join Chat Room</span><br />
        <form action="#">
          <input type="text" placeholder="Room Name" /><br />
          <input type="submit" value="Join" />
        </form>
      </div>

      <div className="roommodal-right">
        <span className="roommodal-right-title">Public Room /WIP/</span><br />
        <ul className="roommodal-right-invited">
          {publicrooms.map((room, key) => {
            return <li key={key}>
              <button onClick={() => { joinRoom(room) }}>Join</button>
              {room.room} <br />
              <span>{room.description}</span>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Roommodal