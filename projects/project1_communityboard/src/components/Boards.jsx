import React from "react";
import Button from "./Button";
import './Boards.css'


const Board = (props) => {
    return (
        <div className="boards-card">
            <img src={props.img} className="boards-img"></img>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <a href={props.link} target="_blank" rel="noopener noreferrer">
                <button>More Info</button>
            </a>
        </div>
    )
}

export default Board;