import { useState, useEffect } from 'react'
import './App.css'

import GameInfo from "./Components/GameInfo";
import SideBar from "./Components/SideBar";
import Card from "./Components/Card";
import tempJSON from './Components/tempJSON';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [gameList, setGameList] = useState(null);

  // useEffect(() => {
  //   const fetchGameInfo = async () => {
  //     const response = await fetch(`https://api.weatherbit.io/v2.0/current?&postal_code=95060&country=US&key=` + API_KEY);
  //     const json = await response.json();
  //     console.log(json);

  //     setGameList(json);
  //   }
  //   fetchGameInfo().catch(console.error);
  // }, []);

  console.log(tempJSON[0].data["city_name"]);

  return (
    <>
      <SideBar />
      <div className="main-content">
        <div className="cards-row">
          <Card title="Location" value="Santa Cruz, CA" />
          <Card title="Current Temp" value="40 F" />
          <Card title="Sunset | Sunrise" value="5:23a | 8:48p" />
        </div>
        {/* <ul>
          {list && Object.entries(gameList.)}
        </ul> */}
        <GameInfo />
      </div>
    </>
  );
}

export default App
