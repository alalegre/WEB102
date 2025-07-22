import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DailyTempChart = ({ data }) => {
    if (!data || !Array.isArray(data)) return null;
    // Create a new field for temperature difference
    const formattedData = data.map(day => ({
        ...day,
        range: day.max_temp - day.min_temp
    }));

    return (
        <div style={{ width: '100%', height: 300, marginTop: 30 }}>
            <h3 style={{ color: 'white', textAlign: 'center' }}>Daily Temperature Range</h3>
            <ResponsiveContainer>
                <BarChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="datetime" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="range" fill="#8884d8" name="Temp Range" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DailyTempChart