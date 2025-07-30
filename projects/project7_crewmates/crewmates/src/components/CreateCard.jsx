import './CreateCard.css'

const CreateCard = (props) => {
    return (
        <div className="CreateCard">
            <p>{props.text}</p>
            <input type='text' name='name' placeholder={props.placeholder}></input>
        </div>
    )
}

export default CreateCard