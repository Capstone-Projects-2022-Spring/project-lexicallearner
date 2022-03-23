import React from 'react'
import { BsAlarm } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import './roommodal.css'

const Roommodal = (props) => {

  const publicrooms = [
    {
      name: "PR1",
      description: "gaming aming aming aming aming aming aming aming aming"
    },
    {
      name: "PR2",
      description: "something"
    }
  ]

  console.log(props);
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
        <span className="roommodal-right-title">Public Room</span><br />
        <ul className="roommodal-right-invited">
          {publicrooms.map((room, key) => {
            return <li key={key}>
              <button>Join</button>
              {room.name} <br />
              <span>{room.description}</span>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Roommodal