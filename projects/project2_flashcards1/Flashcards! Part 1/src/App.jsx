import { useState } from 'react'
import React from 'react';
import './App.css'
import Card from './components/Card'
import { characterList } from './data';

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
    let nextChar = currentChar + 1
    if (nextChar >= characterList.length) {
      nextChar = 0;
    }
    setCurrentChar(nextChar);
    setFlipped(false);
  }

  function handlePrevClick() {
    let prevChar;

    if (currentChar <= 0) {
      prevChar = characterList.length - 1;
    } else {
      prevChar = currentChar - 1;
    }

    setCurrentChar(prevChar);
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

      <div className="buttons">
        <button onClick={handlePrevClick}>left</button>
        <button onClick={handleNextClick}>right</button>
      </div>
    </div>
  )
}

export default App
