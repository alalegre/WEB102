import './CreateCard.css'

const CreateCard = ({ text, placeholder, name, value, onChange }) => {
    return (
        <div className="CreateCard">
            <p>{text}</p>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default CreateCard;
