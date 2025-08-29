import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "a2a1a6449d7d93c3487d0e31b51470b3";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState({ city: "", country: "" });

  const fetchWeather = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      // Current weather
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
      );
      setWeather(data);

      // 5-day forecast
      const forecastData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${API_KEY}`
      );

      const daily = [];
      const map = {};
      forecastData.data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!map[date])
          map[date] = {
            date,
            temp: Math.round(item.main.temp),
            temp_min: Math.round(item.main.temp_min),
            temp_max: Math.round(item.main.temp_max),
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          };
      });

      for (let key in map) daily.push(map[key]);
      setForecast(daily.slice(0, 5));
    } catch (err) {
      alert("City not found!");
      setWeather(null);
      setForecast([]);
    }
    setLoading(false);
  };

  // Load last search from localStorage
  useEffect(() => {
    const last = JSON.parse(localStorage.getItem("lastSearch"));
    if (last?.city) {
      setLastSearch(last);
      const query = last.country ? `${last.city},${last.country}` : last.city;
      fetchWeather(query);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg font-sans">
        Weather App
      </h1>

      <SearchBar fetchWeather={fetchWeather} value={lastSearch} />

      {loading && <p className="text-white mt-4 animate-pulse text-lg">Loading...</p>}

      {weather && !loading && (
        <WeatherCard weather={weather} forecast={forecast} />
      )}
    </div>
  );
}
