import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ← Import Link
import "../ComponentStyles/GameInfo.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const GameInfo = ({ forecastData, isSearching }) => {
    if (!forecastData) return <p>Loading forecast...</p>;

    const renderRow = (day) => (
        <tr key={day.datetime}>
            <td>
                <Link
                    to={`/dayDetails/${day.datetime}`}
                    state={{ dayData: day }}
                    style={{ color: "inherit", textDecoration: "none", display: "block", width: "100%" }}
                >
                    {day.datetime}
                </Link>
            </td>
            <td>{day.max_temp}°C</td>
            <td>{day.min_temp}°C</td>
            <td>{day.weather.description}</td>
        </tr>
    );

    return (
        <div className="GameInfo">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>High Temp</th>
                        <th>Low Temp</th>
                        <th>Weather</th>
                    </tr>
                </thead>
                <tbody>
                    {isSearching
                        ? forecastData.map((day) => renderRow(day))
                        : forecastData.slice(1).map((day) => renderRow(day))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default GameInfo;
