export default function ForecastCard({ forecast }) {
  return (
    <div className="bg-blue-900 bg-opacity-30 backdrop-blur-xl rounded-xl p-4 sm:p-5 text-center text-white shadow-lg w-28 sm:w-32 md:w-36 m-2 sm:m-3 hover:scale-105 transform transition duration-300 flex flex-col items-center">
      {/* Day */}
      <p className="font-bold text-xs sm:text-sm mb-1 sm:mb-2">
        {new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'short' })}
      </p>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
        className="w-12 h-12 sm:w-14 sm:h-14 mb-1 sm:mb-2"
      />

      {/* Temp Details */}
      <p className="text-sm sm:text-base font-semibold mb-0.5 sm:mb-1">
        {forecast.temp}°C
      </p>
      <p className="text-xs sm:text-sm mb-1">
        H:{forecast.temp_max}° L:{forecast.temp_min}°
      </p>

      {/* Description */}
      <p className="capitalize text-xs sm:text-sm">{forecast.description}</p>
    </div>
  );
}
