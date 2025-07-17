import { useState, useEffect } from 'react'
import './App.css'

import GameInfo from "./Components/GameInfo";
import SideBar from "./Components/SideBar";
import Card from "./Components/Card";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [gameList, setGameList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [weatherFilter, setWeatherFilter] = useState("None");


  const searchDate = (searchValue, selectedWeather = weatherFilter) => {
    setSearchInput(searchValue);

    if (gameList?.data) {
      // Gets rid of the current date
      let filteredData = gameList.data.slice(1);

      if (searchValue !== "") {
        filteredData = filteredData.filter(item =>
          item.datetime.includes(searchValue)
        );
      }

      // Filters based on selected weather
      if (selectedWeather !== "None") {
        filteredData = filteredData.filter(item =>
          item.weather.description === selectedWeather
        );
      }

      setFilteredResults(filteredData);
      setSearching(searchValue !== "" || selectedWeather !== "None");
    }
  };


  const handleWeatherChange = (e) => {
    const selected = e.target.value;
    setWeatherFilter(selected);
    searchDate(searchInput, selected);
  };


  useEffect(() => {
    const fetchGameInfo = async () => {
      // Fetch 10-day forecast
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=95061&country=US&days=15&key=` + API_KEY);
      const json = await response.json();
      console.log(json);

      setGameList(json);
      setFilteredResults(json.data);
    }
    fetchGameInfo().catch(console.error);
  }, []);


  return (
    <>
      <SideBar />
      {gameList && (
        <div className="main-content">
          <div className="cards-row">
            <Card title="Location" value={`${gameList.city_name}, ${gameList.state_code}`} />
            <Card title="Date" value={gameList.data[0].datetime} />
            <Card title="Current Temp" value={`${gameList.data[0].temp}°C`} />
            <Card title="High | Low" value={`${gameList.data[0].max_temp}°C | ${gameList.data[0].min_temp}°C`} />
          </div>
          <div className="filters">
            <input
              type="text"
              placeholder="Enter date... (YYYY-MM-DD)"
              value={searchInput}
              onChange={(inputString) => searchDate(inputString.target.value)}
            />
            <div className="dropdown">
              <label>Choose weather:</label>
              <select value={weatherFilter} onChange={handleWeatherChange}>
                <option>None</option>
                <option>Broken clouds</option>
                <option>Clear Sky</option>
                <option>Few clouds</option>
                <option>Rain</option>
                <option>Scattered clouds</option>
                <option>Thunderstorm</option>
              </select>
            </div>
          </div>
          {searchInput.length > 0 ?
            <GameInfo forecastData={filteredResults} isSearching={searching} />
            : <GameInfo forecastData={filteredResults} isSearching={false} />
          }
        </div>
      )}
    </>
  );
}

export default App
