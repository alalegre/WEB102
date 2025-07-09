import { useState } from 'react'
import './App.css'
import APIForm from './components/APIForm';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {

  // State variable to be changed when user inputs something
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  //State variable to hold and display the current screenshot
  const [currentImage, setCurrentImage] = useState(null);


  // Returns a promise -- an object that represents a value that will be available later (the API's response)
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    if (json.url == null) {
      alert("Error: proper screenshot couldn't be taken. Try again.");
    } else {
      setCurrentImage(json.url);
      reset();
    }
  }


  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (inputs.url == "" || inputs.url == " ") {
      alert("LMAO you forgot to submit a url");
    } else {
      // We'll check the rest of the inputs to see if we need to include any default values
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "") {
          inputs[key] = defaultValues[key];
        }
      }
      makeQuery();
    }
  }

  const makeQuery = () => {
    // API parameters the user doesn't need to fill out but the API requires them to be sent
    let wait_until = "network_idle";  // Wait until the page is fully loaded and idle
    let response_type = "json";  // Return response type in JSON format
    let fail_on_status = "400%2C404%2C500-511";  // If the website returns any of these HTTP error codes, request failed

    // Creates the full URL
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;

    // Template literal -- uses a tilde instead of a quote
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

    // Calls the API with the query request
    callAPI(query).catch(console.error);  // .catch() runs when the Promise is rejected and prints to the console
  }

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  }

  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot!</h1>

      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />

      {/* Conditional rendering to show the currentImage if it exists, nothing otherwise */}
      <div className='screenshot'>
        {currentImage ? (
          <img
            src={currentImage}
            alt="Screenshot returned"
          />
        ) : (
          <div></div>
        )}
      </div>

      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>

      <br></br>
    </div>
  );
}

export default App
