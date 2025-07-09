import './BanList.css';

const BanList = ({ items, onClick }) => {
    return (
        <div className="BanList">
            <h2>Ban List</h2>
            <h4>Select an attribute in your listing to ban it</h4>

            {/* vertical stack of buttons */}
            {items.map(({ type, value }) => (
                <button
                    key={`${type}-${value}`}
                    className="ban-button"
                    onClick={() => onClick(type, value)}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};

export default BanList;