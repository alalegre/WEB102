import { useState, useEffect } from 'react'
import './App.css'

import GameInfo from "./Components/GameInfo";
import SideBar from "./Components/SideBar";
import Card from "./Components/Card";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [gameList, setGameList] = useState(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      // Fetch 10-day forecast
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=95061&country=US&days=15&key=` + API_KEY);
      const json = await response.json();
      console.log(json);

      setGameList(json);
    }
    fetchGameInfo().catch(console.error);
  }, []);

  return (
    <>
      <SideBar />
      {gameList && (
        <div className="main-content">
          <div className="cards-row">
            <Card title="Location" value={gameList.city_name} />
            <Card title="Date" value={gameList.data[0].datetime} />
            <Card title="Current Temp" value={gameList.data[0].temp} />
            <Card title="High | Low" value={`${gameList.data[0].max_temp} | ${gameList.data[0].min_temp}`} />
          </div>
          <GameInfo forecastData={gameList.data} />
        </div>
      )}
    </>
  );
}

export default App
