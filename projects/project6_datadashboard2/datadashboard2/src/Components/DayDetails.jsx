import { useParams } from "react-router-dom";
import Layout from "../routes/Layout";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const DayDetails = () => {
    const { date } = useParams();
    const [dayData, setDayData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=95061&country=US&days=15&key=${API_KEY}`);
                const json = await res.json();
                const foundDay = json.data.find((day) => day.datetime === date);
                setDayData(foundDay || null);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [date]);

    if (loading) return <p>Loading...</p>;
    if (!dayData) return <p>No data found for {date}</p>;

    const sunrise = new Date(dayData.sunrise_ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(dayData.sunset_ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="dayDetails">
            <Layout />
            <h2>{date}</h2>
            <p>High Temp: {dayData.high_temp}°C</p>
            <p>Low Temp: {dayData.low_temp}°C</p>
            <p>Weather: {dayData.weather.description}</p>
            <p>Humidity: {dayData.rh}%</p>
            <p>Wind Speed: {dayData.wind_spd} m/s</p>
            <p>Sunrise: {sunrise}</p>
            <p>Sunset: {sunset}</p>
        </div>
    );
};

export default DayDetails;
