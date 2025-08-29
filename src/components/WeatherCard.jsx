import { WiThermometer, WiHumidity, WiStrongWind } from "react-icons/wi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function WeatherCard({ weather, forecast }) {
  const data = forecast.map((f) => ({
    day: new Date(f.date).toLocaleDateString("en-US", { weekday: "short" }),
    temp: f.temp,
    temp_max: f.temp_max,
    temp_min: f.temp_min,
  }));

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-800 bg-opacity-70 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 text-white shadow-2xl w-full max-w-3xl mx-auto">
      {/* Current Weather */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
          alt={weather?.weather[0]?.description}
          className="w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-0 sm:mr-6"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {weather?.name}, {weather?.sys?.country}
          </h2>
          <p className="capitalize text-lg sm:text-xl">{weather?.weather[0]?.description}</p>
        </div>
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-center mb-6 text-4xl sm:text-5xl md:text-6xl font-bold">
        <WiThermometer className="mr-3 text-yellow-300" />
        {Math.round(weather?.main?.temp)}°C
      </div>

      {/* Humidity & Wind */}
      <div className="flex flex-col sm:flex-row justify-around bg-blue-400 bg-opacity-30 backdrop-blur-xl p-4 sm:p-6 rounded-xl mb-6">
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <WiHumidity className="text-2xl sm:text-3xl text-cyan-200 mb-1" />
          <span>{weather?.main?.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="text-2xl sm:text-3xl text-white mb-1" />
          <span>{weather?.wind?.speed} m/s</span>
        </div>
      </div>

      {/* Forecast Chart */}
      <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-4 text-center">
        5-Day Temperature Forecast
      </h3>
      <div className="w-full h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD700" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#FFD700" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
            <XAxis dataKey="day" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e3a8a",
                borderRadius: "8px",
                color: "white",
              }}
            />
            <Legend verticalAlign="top" align="right" wrapperStyle={{ color: "white" }} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="url(#lineColor)"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line type="monotone" dataKey="temp_max" stroke="#FF4500" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="temp_min" stroke="#00FFFF" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
