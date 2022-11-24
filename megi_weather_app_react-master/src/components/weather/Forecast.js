import axios from "axios";
import { useState, useEffect } from "react";
import "../../assets/styles/customstyles/forecast.scss";
import Accordion from "../Accordion";
import trees from "../../images/trees.jpg";
import clear from "../../images/clear.jpg";
import cloudy from "../../images/cloud.jpg";
import lightning from "../../images/lightning.jpg";
import rainy from "../../images/rainy.jpg";
import snowy from "../../images/snow.jpg";
import sunny from "../../images/sunny.jpg";

export default function Forecast() {
  const bgImage = [trees, clear, cloudy, lightning, rainy, snowy, sunny];

  const d = new Date();

  const date = d.getDate();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = weekday[d.getDay()];
  const mon = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = mon[d.getMonth()];
  const year = d.getFullYear();

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (search) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a2bd3f9f0b9eea7c0aa1803544a2168a&units=metric`
        )
        .then((res) => {
          setCity(res.data);
        })
        .catch(() => {
          setCity(null);
        });
    } else {
      setCity(null);
    }
  }, [search]);

  return (
    <div className="forecast">
      <div
        id="forecast-card"
        className="animate__animated animate__fadeInDown mx-auto my-8 w-[90%] md:w-[40%] lg:w-[30%] h-[40rem] lg:h-[50rem] rounded-3xl shadow-2xl"
      >
        <div className="flex justify-center">
          <input
            className="mx-auto mt-8 md:mt-16 mb-2 md:mb-4 p-[0.8rem] w-48 md:w-64 text-lg text-white capitalize bg-transparent rounded-xl"
            type="search"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {!city ? (
          <p className="mx-auto my-2 text-center text-white">
            <span>No data found!</span>
            <br />
            <span>Please enter your city.</span>
          </p>
        ) : (
          <div className="mx-auto flex justify-center">
            <div
              id="info"
              className="flex flex-col justify-center items-center text-white"
            >
              <p className="date text-center text-sm italic animate__animated animate__fadeIn">
                {day},&nbsp;{date} {month} {year}.
              </p>
              <h1 className="mt-8 mb-4 text-2xl md:text-4xl animate__animated animate__fadeIn">
                <span className="capitalize">{search}</span>&nbsp;
                <span className="uppercase">
                  <sup className="text-[1rem] -top-4">{city.sys.country}</sup>
                </span>
              </h1>
              <img
                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="animate__animated animate__fadeIn"
              />
              <p className="mt-4 md:mt-8 mb-2 md:mb-4 text-center text-2xl md:text-3xl animate__animated animate__fadeIn">
                {Math.round(city.main.temp)}&deg;C
              </p>
              <p className="text-center text-md md:text-lg capitalize animate__animated animate__fadeIn">
                {city.weather[0].description}
              </p>
                <Accordion
                  title="More"
                  feelsLike={city.main.feels_like}
                  sunrise={city.sys.sunrise}
                  sunset={city.sys.sunset}
                  windSpeed={city.wind.speed}
                  humidity={city.main.humidity}
                />
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <p className="absolute bottom-8 text-white text-sm">
            &copy;Megi Serjanaj ~ February 2022.
          </p>
        </div>
      </div>
    </div>
  );
}
