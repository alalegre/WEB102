import { useState, useEffect } from 'react';
import './App.css'
import CoinInfo from "./Components/CoinInfo"

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = searchValue => {
    setSearchInput(searchValue);  // State variable updates whenever user types something
    if (searchValue != "") {
      const filteredData = Object.keys(list.Data)  // Gets an array of coin symbols | item = coin symbol
        .filter((item) =>  // Filtering the list to only include coins that match the search
          Object.values(item)  // Treats the item string and returns something like ["B", "T", "C"]
            .join("")  // Makes the string into "BTC"
            .toLowerCase().includes(searchValue.toLowerCase())  // Makes both input and coin symbol into lower case and make the match case-insensitive
        );
      setFilteredResults(filteredData);  // Saves the filtered list of symbols into state
    } else {
      setFilteredResults(Object.keys(list.Data));  // If the search bar is empty, show all coin symbols again
    }
  }


  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key"
        + API_KEY
      )
      const json = await response.json()
      setList(json)
    }
    fetchAllCoinData().catch(console.error);
  }, []);

  // console.log(list.Data);
  return (
    <div className='whole-page'>
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder='Search...'
        onChange={(inputString) => searchItems(inputString.target.value)}  // Function runs when the user types
      />
      <ul>
        {
          searchInput.length > 0  // Did the user type anything

            // IF TRUE: use the filtered result list
            ? filteredResults
              .map((coin) => {  // For each matching coin
                const coinData = list.Data[coin];  // Get the coin's full info

                // Display only if it passes 3 conditions
                if (
                  coinData.IsTrading &&
                  coinData.Algorithm !== "N/A" &&
                  coinData.ProofType !== "N/A"
                ) {
                  return (
                    <CoinInfo
                      key={coin}
                      image={coinData.ImageUrl}
                      name={coinData.FullName}
                      symbol={coinData.Symbol}
                    />
                  );
                }
                return null;  // Don't render if not
              })

            // ELSE: The user didn't type any data and we have API data
            : list &&
            Object.entries(list.Data)  // Turn object into [key, value] pairs
              .filter(([_, coinData]) =>  // Filter coins that passes 3 conditions
                coinData.IsTrading &&
                coinData.Algorithm !== "N/A" &&
                coinData.ProofType !== "N/A"
              )
              .slice(0, 20)  // Only take the first 20
              .map(([coin, coinData]) => (  // Render CoinInfo for each
                <CoinInfo
                  key={coin}
                  image={coinData.ImageUrl}
                  name={coinData.FullName}
                  symbol={coinData.Symbol}
                />
              ))
        }
      </ul>
    </div>
  );
}

export default App
