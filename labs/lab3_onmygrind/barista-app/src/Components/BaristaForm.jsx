// Component for form details and handling

import React, { Component, useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";
import "./BaristaForm.css";

const BaristaForm = () => {

    // State variables to keep track of whether we have the correct temp, syrup, milk, and blended
    const [correct_temp, setCheckedTemperature] = useState('');
    const [correct_syrup, setCheckedSyrup] = useState('');
    const [correct_milk, setCheckedMilk] = useState('');
    const [correct_blended, setCheckedBlended] = useState('');

    // State variables to keep track of what drink we have currently
    // and its true recipe
    const [currentDrink, setCurrentDrink] = useState('');
    const [trueRecipe, setTrueRecipe] = useState({});

    // A state variable to handle all of the controlled inputs
    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    // List of options for each categeory
    const ingredients = {
        'temperature': ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }

    // Randomly select new drink
    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);

        // Get a new drink based on the randomDrinkIndex
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);

        // Get thew true recipe of the new drink
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    }

    // Clears out current values and gets new drink
    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': ''
        });

        setCheckedBlended('');
        setCheckedMilk('');
        setCheckedSyrup('');
        setCheckedTemperature('');

        getNextDrink();
    };

    const onCheckAnswer = () => {
        // Checks for temperature
        if (trueRecipe.temp != inputs['temperature']) {
            setCheckedTemperature('wrong');
        }
        else {
            setCheckedTemperature("correct");
        }

        // Checks for milk
        if (trueRecipe.milk != inputs['milk']) {
            setCheckedMilk('wrong');
        }
        else {
            setCheckedMilk("correct");
        }

        // Checks for syrup
        if (trueRecipe.syrup != inputs['syrup']) {
            setCheckedSyrup('wrong');
        }
        else {
            setCheckedSyrup("correct");
        }

        // Checks for blended
        if (trueRecipe.blended != inputs['blended']) {
            setCheckedBlended('wrong');
        }
        else {
            setCheckedBlended("correct");
        }
    };

    return (

        <div>
            <h2>Hi, I'd like to order a:</h2>
            <div className="drink-container">
                <h2 className="mini-header">{currentDrink}</h2>
                <button type="new-drink-button" className="button newDrink" onClick={onNewDrink}>🔄</button>
            </div>

            <form className="container">
                <div className="mini-container">
                    <h3>Temperature</h3>
                    <div className="answer-space" id={correct_temp}>
                        {inputs["temperature"]}  {/* Displays user's answer */}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="temperature"
                        choices={ingredients["temperature"]}
                        checked={inputs["temperature"]}
                    />
                </div>

                <div className="mini-container">
                    <h3>Syrup</h3>
                    <div className="answer-space" id={correct_syrup}>
                        {inputs["syrup"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="syrup"
                        choices={ingredients["syrup"]}
                        checked={inputs["syrup"]}
                    />
                </div>

                <div className="mini-container">
                    <h3>Milk</h3>
                    <div className="answer-space" id={correct_milk}>
                        {inputs["milk"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="milk"
                        choices={ingredients["milk"]}
                        checked={inputs["milk"]}
                    />
                </div>

                <div className="mini-container">
                    <h3>Blended</h3>
                    <div className="answer-space" id={correct_blended}>
                        {inputs["blended"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="blended"
                        choices={ingredients["blended"]}
                        checked={inputs["blended"]}
                    />
                </div>
            </form>
            <button type="submit" className="button submit" onClick={onCheckAnswer}>Check Answer</button>
            {/* <button type="new-drink-button" className="button newdrink" onClick={onNewDrink}>New Drink</button> */}




        </div>
    );

};

export default BaristaForm;