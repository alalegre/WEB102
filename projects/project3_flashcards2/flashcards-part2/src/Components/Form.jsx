import React, { useState } from 'react';
import { characterList } from '../data.js';


const Form = () => {

    // State variables for correct answers
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState('');

    const checkAnswer = (e) => {
        e.preventDefault();

        // Normalize input to make it case insensitive
        const trimmedInput = userInput.trim().toLowerCase();

        // Finds
        const match = characterList.find((char) => char.name.toLowerCase() == trimmedInput);

        if (match) {
            setResult(`Correct! That's ${match.name}.`);
        } else {
            setResult(`That's not a character in the list.`);
        }
    };

    return (
        <div>
            <form onSubmit={checkAnswer}>
                <input
                    type='text'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder='Enter Character Name'
                />
                <button type='submit'>Check Answer</button>
                <p>{result}</p>
            </form>
        </div>
    );
}

export default Form;