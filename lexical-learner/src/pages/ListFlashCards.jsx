import React, { useState }  from 'react';
import Navbar from "../components/navbar/NavbarLoggedIn";
import "./../components/Flashcards/Flashcard.css";
import FlashcardList from "../components/Flashcards/FlashcardList";
import "./styles/flashcardlist.css";
import { useLocation, Link, useParams } from 'react-router-dom';


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