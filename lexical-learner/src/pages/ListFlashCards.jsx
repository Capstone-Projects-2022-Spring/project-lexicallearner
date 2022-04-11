import React, { useState }  from 'react';
import Navbar from "../components/navbar/NavbarLoggedIn";
import "./../components/Flashcards/Flashcard.css";
import FlashcardList from "../components/Flashcards/FlashcardList";
import "./styles/flashcardlist.css";
import { useLocation, Link, useParams } from 'react-router-dom';

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
function FlashcardContainer(){
    const  stateParamVal = useLocation().state.class;
    const [flashcards, setFlashcards] = useState(stateParamVal.flashcards)
  
    return (
      <div className = "container">
        <FlashcardList flashcards={flashcards} />
        </div>
    );
  }

  const ListFlashCards = () => {
    return(
  <div className="flashcards">
      <Navbar />
  <h2 className ="flash-title">  Current Flashcards</h2>
  <div className="cards">
  {FlashcardContainer()}
  </div>
</div>

    )
        
  };
  export default ListFlashCards;