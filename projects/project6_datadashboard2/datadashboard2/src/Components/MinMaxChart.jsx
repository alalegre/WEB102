import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MinMaxChart = ({ data }) => (
    <div style={{ width: '100%', height: 300, marginTop: 30 }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>Temperature Trends</h3>
        <ResponsiveContainer>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="datetime" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="max_temp" stroke="#ff7300" name="Max Temp" />
                <Line type="monotone" dataKey="min_temp" stroke="#387908" name="Min Temp" />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default MinMaxChart