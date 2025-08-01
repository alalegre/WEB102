import more from './more.png'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = (props) => {
    return (
        <div className="Card">
            {/* Link to Info page with props passed as state */}
            <Link
                to={{
                    pathname: `info/${props.id}`,
                }}
                state={{ ...props }} // Pass all props
            >
                <div className="cardContent">
                    <img
                        className="moreButton"
                        alt="edit button"
                        src={more}
                        onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `/edit/${props.id}`
                        }}
                    />
                    <h2 className="name">{props.name}</h2>
                    <h3 className="element">{props.element}</h3>
                </div>
            </Link>
        </div>
    )
}

export default Card
