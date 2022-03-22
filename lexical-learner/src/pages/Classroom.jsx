import React from "react";
import Navbar from "../components/navbar/NavbarLoggedIn";
import * as BsIcons from "react-icons/bs";
import Chat from "../components/chat/Chat"
const Classroom = () => {
    const user = {
        icon: <BsIcons.BsAward/>,
        username: 'user',
        password: '',
        type: '',
      }
    
    return (
        <div className="Classroom">
        <Navbar />
        <section className="quickdemo">
        <Chat user={user} />
      </section>

      <footer>
        <span>Lexical Learner</span>
      </footer>
        </div>
        
    )
};

export default Classroom;