import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); 
  const apiKey = import.meta.env.VITE_CURRENCY_API_KEY;
  const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=CAD,IDR,JPY,CHF,EUR,USD`;

  const handleFetch = async () => {
    try {
      const res = await axios.get(url); 
      if (res.status !== 200) {
        setError(true);
        return;
      }
      setData(res.data.rates);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (error) {
    return <Error />;
  }

  if (loading) { 
    return (
      <div className="loading-container">
        Loading...
      </div>
    );
  }

  const currencyList = ["CAD", "CHF", "EUR", "IDR", "JPY", "USD"];

  const toBuy = (exchangeRate) => (exchangeRate * 1.02).toFixed(4);
  const toSell = (exchangeRate) => (exchangeRate * 0.98).toFixed(4);

  return (
    <div id="container">
      <table>
        <thead>
          <tr id="head-table">
            <th></th>
            <th>WE BUY</th>
            <th>EXCHANGE RATE</th>
            <th>WE SELL</th>
          </tr>
        </thead>
        <tbody>
          {currencyList.map((currency, index) => (
            <tr key={index} className="content">
              <td>{currency}</td>
              <td>{toBuy(data[currency])}</td>
              <td>{data[currency]}</td>
              <td>{toSell(data[currency])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        <li>based currency is USD</li>
        <li>
          This page using{" "}
          <a href="https://currencyfreaks.com/" style={{ color: "white" }}>
            currencyfreaks.com
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;