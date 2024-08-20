import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("Gwalior");
  const [weatherData, setWeatherData] = useState({});
  const [query, setQuery] = useState("");

  const apiKey = "4b9cefabb8844f6da59125902230512";
  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setCity(query);
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#4B515D", fontSize: "2rem" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-4">
            <div
              style={{ height: "4rem" }}
              className="my-4 w-100 d-flex justify-content-center fs-4"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-75 mx-3 rounded-4 border-0 px-2"
                placeholder="Enter city"
              />
              <button
                onClick={handleSearch}
                style={{ outline: "none", border: "none" }}
                className="w-25 rounded-4 bg-dark text-white border-0"
              >
                Search
              </button>
            </div>
            {weatherData.current && (
              <div className="card" style={{ color: "#4B515D", borderRadius: "35px" }}>
                <div className="card-body p-4">
                  <div className="d-flex">
                    <h6 id="city" className="flex-grow-1">
                      {weatherData.location.name}
                    </h6>
                    <h6 id="time">{weatherData.location.localtime}</h6>
                  </div>

                  <div className="d-flex flex-column text-center mt-5 mb-4">
                    <h6
                      id="temp"
                      className="display-4 mb-0 font-weight-bold"
                      style={{ color: "#1C2331" }}
                    >
                      {weatherData.current.feelslike_c}°C
                    </h6>
                    <span id="status" className="small" style={{ color: "#868B94" }}>
                      {weatherData.current.condition.text}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                      <div>
                        <i className="fas fa-wind fa-fw" style={{ color: "#868B94" }}></i>{" "}
                        <span id="wspeed" className="ms-1">
                          {weatherData.current.gust_kph} km/h
                        </span>
                      </div>
                      <div>
                        <i className="fas fa-tint fa-fw" style={{ color: "#868B94" }}></i>{" "}
                        <span id="humidity" className="ms-1">
                          {weatherData.current.humidity}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={weatherData.current.condition.icon}
                        id="icon"
                        width="100px"
                        alt="Weather Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
