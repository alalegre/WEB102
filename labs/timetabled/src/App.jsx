import './App.css';  // imports the CSS file with code that styles App
import Calendar from './components/Calendar';

const App = () => {

  return (
    <div className="App">
      <h1>Itinerary for 7 Days in Chicago</h1>
      <h2>One week in Chicago is wonderful. If you want to get to know the city and see all the sights, then spending 7 days in Chicago is perfect!</h2>
      <Calendar />
    </div>
  )
}

export default App