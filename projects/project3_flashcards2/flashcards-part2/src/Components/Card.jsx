import React from 'react';
import "./Card.css"

const Card = (props) => {
    let cardClass = "Card";
    if (props.flipped) {
        cardClass += " flipped";
    }

    return (
        <div className={cardClass} onClick={props.onClick}>
            <div className="front">
                <p>{props.description}</p>
            </div>
            <div className="back">
                <p>{props.name}</p>
            </div>
        </div>
    );
}

export default Card;