import './APIForm.css'

const APIForm = ({ inputs, handleChange, onSubmit }) => {
    const inputsInfo = [
        "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
        "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
        "Input true or false if you would like your website screenshot to not contain any ads",
        "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
        "Choose the width of your screenshot (in pixels)",
        "Choose the height of your screenshot (in pixels)",
    ];

    return (
        <div>
            <h2>Select Your Image Attributes:</h2>
            <form className="form-container" onSubmit={(e => {
                e.preventDefault();
                onSubmit();
            })}>
                {/* 
                    Short-circut rendering
                        - If inputs is falsy, nothing inside the braces renders
                        - Handy for guarding against "cannot read property of undefined" errors while data is loading 
                    
                    Object.entries(inputs) converts the object (a dictionary) into an array of [key, value] pairs
                        - [ ["url", ""], ["format", ""] ]

                    map() -- what each list item renders
                */}
                <ul className="form-list">
                    {inputs &&
                        Object.entries(inputs).map(([category, value], index) => (
                            <li className="form" key={index}>
                                <h2 className='attr-heading'>{category}</h2>
                                <div className="attr-field">
                                    <input
                                        type="text"
                                        name={category}
                                        value={value}
                                        placeholder="Input this attribute..."
                                        onChange={handleChange}
                                        className="textbox"
                                    />
                                    <p> {inputsInfo[index]}</p>
                                </div>
                            </li>
                        ))}
                </ul>
            </form>
            <button type="submit" className="button" onClick={onSubmit}>Take that Pic!</button>
        </div>
    );
};

export default APIForm;