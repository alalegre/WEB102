import { useEffect, useState } from "react"
import "../ComponentStyles/GameInfo.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const GameInfo = ({ forecastData, isSearching }) => {
    if (!forecastData) return <p>Loading forecast...</p>;
    return (
        <>
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
                        {isSearching ? forecastData.map((day) => (
                            <tr key={day.datetime}>
                                <td>{day.datetime}</td>
                                <td>{day.max_temp}°C</td>
                                <td>{day.min_temp}°C</td>
                                <td>{day.weather.description}</td>
                            </tr>
                        ))

                            : forecastData.slice(1).map((day) => (
                                <tr key={day.datetime}>
                                    <td>{day.datetime}</td>
                                    <td>{day.max_temp}°C</td>
                                    <td>{day.min_temp}°C</td>
                                    <td>{day.weather.description}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GameInfo;