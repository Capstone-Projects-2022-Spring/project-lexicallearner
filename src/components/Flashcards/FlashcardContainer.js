import React, { useState }  from 'react';
import FlashcardList from './FlashcardList'
import './Flashcard.css'

function FlashcardContainer(){
    const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

    return (
      <div className = "container">
        <FlashcardList flashcards={flashcards} />
        </div>
    );
}

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

export default FlashcardContainer;