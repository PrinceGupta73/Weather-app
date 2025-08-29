import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const countries = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "India", code: "IN" },
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Japan", code: "JP" },
  { name: "China", code: "CN" },
  { name: "Brazil", code: "BR" },
];

export default function SearchBar({ fetchWeather, value }) {
  const [city, setCity] = useState(value?.city || "");
  const [country, setCountry] = useState(value?.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return;

    const query = country ? `${city},${country}` : city;
    fetchWeather(query);
    localStorage.setItem("lastSearch", JSON.stringify({ city, country }));
    setCity("");
    setCountry("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row w-full max-w-xl mx-auto mb-6 bg-white rounded-2xl sm:rounded-full shadow-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400 transition"
    >
      {/* City Input with Icon */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          list="cities"
          className="w-full px-12 py-3 text-gray-800 placeholder-gray-400 outline-none border-b sm:border-b-0 sm:border-r border-gray-200 rounded-t-2xl sm:rounded-l-full sm:rounded-tr-none"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <datalist id="cities">
          {countries.map((c, i) => (
            <option key={i} value={c.name} />
          ))}
        </datalist>
      </div>

      {/* Country Select */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full sm:w-auto px-4 py-3 bg-white text-gray-800 outline-none border-t sm:border-t-0 sm:border-r border-gray-200 rounded-none sm:rounded-none"
      >
        <option value="">All Countries</option>
        {countries.map((c, i) => (
          <option key={i} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white flex items-center justify-center rounded-b-2xl sm:rounded-r-full sm:rounded-l-none mt-2 sm:mt-0"
      >
        Search
      </button>
    </form>
  );
}
