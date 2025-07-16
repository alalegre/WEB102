import { useEffect, useState } from "react"
import "../ComponentStyles/GameInfo.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const GameInfo = ({ title, releaseDate, platform, rating }) => {
    const [gameInfo, setGameInfo] = useState(null);

    useEffect(() => {
        const getGameInfo = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/current?&postal_code=95060&country=US&key=` + API_KEY);
            const json = await response.json();
            setGameInfo(json);
        }
    });

    return (
        <div className="GameInfo">
            <li className="title-list" key={title}>
                <span className="column title">{title}</span>
                <span className="column release-date">{releaseDate}</span>
                <span className="column platform">{platform}</span>
                <span className="column rating">{rating}</span>
            </li>
        </div>
    )
}

export default GameInfo;