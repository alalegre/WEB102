/*
    Component to take in our 'ingredients' and set up different blocks of
    answer choices for each list in 'ingredints'
*/

/*
    - Used to make different inputs via radio buttons
    - Pass in the different answer choices to the radio buttons as props
    - Save the user's selection from this nested component (radio buttons)
      back in our parent component (BaristaForm) as state
    - Use .map() to match each choice with a radio button
*/

import React, { Component, useEffect, useState } from "react";

/*
    - handleChange = how we'll handle change when different inputs are selected
    - label = the category of the input 
    - choices = a list of answer choices based on the label
    - checked = the currently selected value
*/
const RecipeChoices = ({ handleChange, label, choices, checked }) => {
    return (
        <div>
            <div className="radio-buttons">
                {/* Will be passed in from BaristaForm */}
                {choices && choices.map((choice) => (
                    <li key={choice}>
                        <input
                            id={choice} // Keeps track of what our form is recognizing as our choice
                            value={choice} // Keeps track of what our form is recognizing as our choice
                            name={label} // Groups the radio buttons so only one can be selected at a time per category
                            type="radio"
                            onChange={handleChange} // Lets the form know what to do when user selects a choice
                            checked={checked == choice} // Ensures the correct button is visibly selected
                        ></input>
                        {choice}
                    </li>
                ))}
            </div>
        </div>
    );
};

export default RecipeChoices;