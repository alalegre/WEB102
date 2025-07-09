import './Display.css'

const Display = (props) => {
    return (
        <div className="Display">
            <h1>Curiosity Rover</h1>
            <h3>Discover new pictures from Mars through Curiosity!</h3>


            <div className='screenshot'>
                {props.image ? (
                    <div>
                        <div className="attributes">
                            <button className='attr-button' onClick={() => props.onBan('cameras', props.camera)}>{props.camera}</button>
                            <button className='attr-button' onClick={() => props.onBan('sols', props.sol)}>{props.sol}</button>
                            <button className='attr-button' onClick={() => props.onBan('dates', props.date)}>{props.date}</button>
                        </div>
                        <img
                            src={props.image}
                            alt="Screenshot returned"
                        />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>

            <button className='discover-button' onClick={props.onSubmit}>Discover!</button>

        </div>
    );
}

export default Display;