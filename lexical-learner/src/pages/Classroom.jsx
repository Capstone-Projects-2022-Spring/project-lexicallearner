import React, { useState }  from 'react';
import Navbar from "../components/navbar/NavbarLoggedIn";
import * as BsIcons from "react-icons/bs";
import Chat from "../components/chat/Chat"
import "./styles/Classroom.css";
import { useLocation, Link, useParams } from 'react-router-dom';



const Classroom = () => {
  const  stateParamVal = useLocation().state.class;
  console.log(stateParamVal.title)

    const user = {
        icon: <BsIcons.BsAward/>,
        username: 'user',
        password: '',
        type: '',
      }
    
    return (
      <div className="Classroom">
      <Navbar />
      <h2 className="title">{stateParamVal.title}</h2>
      <section className="chat">
        <h2 style={{textAlign:'center'}}>Web Chat Demo</h2>
        {user.username !== "" ? 
          <Chat user={{
            user: user, 
          }} />
          :
          <Chat user={{
            icon: <BsIcons.BsExclamationDiamond/>,
            demo: true,
          }}/>
        }
      </section>

        <div className="Options">
        <li>
        <Link to="/listflashcards" state={{
                class: stateParamVal,
            }}>Check Out Current Flashcards</Link>
        </li>
        <li>
        <Link to="/createflashcards">Create Your Own Flashcards</Link>
        </li>
        <li>
        <Link to='/Game'>Play A Game</Link>
        </li>
        </div>
     
      <footer>
        <span>Lexical Learner</span>
      </footer>
        </div>
        
        
    )
};

export default Classroom;