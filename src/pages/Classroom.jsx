import React, { useState }  from 'react';
import Navbar from "../components/navbar/NavbarLoggedIn";
import * as BsIcons from "react-icons/bs";
import Chat from "../components/chat/Chat"
import "./styles/Classroom.css";
import "./../components/Flashcards/Flashcard.css";
import FlashcardList from "../components/Flashcards/FlashcardList";


function FlashcardContainer(){
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  return (
    <div className = "container">
      <FlashcardList flashcards={flashcards} />
      </div>
  );
}
const Classroom = (props) => {
    const user = {
        icon: <BsIcons.BsAward/>,
        username: 'user',
        password: '',
        type: '',
      }
    
    return (
      <div className="Classroom">
      <Navbar />
      <section className="chat">
        <h2 >Web Chat Demo</h2>
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
     
      <div className="flashcards">
        <h2 className ="flash-title">  Current Flashcards</h2>
        <div className="cards">
        {FlashcardContainer()}
        </div>
      </div>
    
      <footer>
        <span>Lexical Learner</span>
      </footer>
        </div>
        
    )
};


const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    vocab: 'Hello',
    translation: 'Hola',
  },
  {
    id: 2,
    vocab: 'Sleep',
    translation: 'Dormir',
  },
  {
    id: 3,
    vocab: 'Run',
    translation: 'Correr',
  },
  {
    id: 4,
    vocab: 'Help',
    translation: 'Ayuda',
  },
  {
    id: 5,
    vocab: 'My Name is ...',
    translation: 'Me llamo ...',
  },
  {
    id: 6,
    vocab: 'My favorite color is blue',
    translation: 'Mi color favorito es el azul',
  },
  {
    id: 7,
    vocab: 'Programing is hard',
    translation: 'programar es dificil',
  }
]
export default Classroom;