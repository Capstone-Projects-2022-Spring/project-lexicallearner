import React, { useState } from 'react'

export default function Flashcard({ flashcard }){
    const [flip, setFlip] = useState(false)


return (
    <div 
    className={`card ${flip ? 'flip' : ''}`}
    onClick={() => setFlip(!flip)}>
       
       <div className= "front">{flashcard.vocab}</div>
           <div className= "back"> {flashcard.translation}</div>
       
    </div>
)
}