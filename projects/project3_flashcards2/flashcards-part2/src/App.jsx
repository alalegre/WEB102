import { useState } from 'react'
import React from 'react';
import './App.css'
import Card from './Components/Card'
import { characterList } from './data';
import Form from './Components/Form';

function App() {
  const [currentChar, setCurrentChar] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function handleCardClick() {
    if (flipped == false) {
      setFlipped(true);
    } else {
      setFlipped(false);
    }
  }


  function handleNextClick() {
    if (currentChar === characterList.length - 1) {
      return;
    }
    setCurrentChar(currentChar + 1);
    setFlipped(false);
  }

  function handlePrevClick() {
    // edge-case guard
    if (currentChar === 0) {
      return;
    }
    setCurrentChar(currentChar - 1);
    setFlipped(false);
  }

  return (
    <div className="App">
      <h1>Guess Who!</h1>
      <h2>How cultured are you in the anime community?</h2>
      <h2>Test your knowledge here!</h2>
      ({currentChar + 1} / {characterList.length})

      <Card
        description={characterList[currentChar].description}
        name={characterList[currentChar].name}
        flipped={flipped}
        onClick={handleCardClick}
      />

      <Form key={currentChar} />

      <div className="buttons">
        <button onClick={handlePrevClick} disabled={currentChar === 0} className={currentChar === 0 ? 'disabled' : ''}>left</button>
        <button onClick={handleNextClick} disabled={currentChar === characterList.length - 1} className={currentChar === characterList.length - 1 ? 'disabled' : ''}> right</button>
      </div>
    </div >
  )
}

export default App
