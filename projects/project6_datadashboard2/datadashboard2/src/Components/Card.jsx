import "../ComponentStyles/Card.css";

const Card = ({ title, value }) => {
    return (
        <div className="Card">
            <h2>{title}</h2>
            <h3>{value}</h3>
        </div>
    )
}

export default Card;