import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyles";

import { CloudyImage } from "./images";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("Nepal");
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const WEATHER_API_KEY = "027a5b74fd06dbe3fbb7648579cd24c9";
  const UNSPLASH_API_KEY = "Hj3MOq6PidzY9Nkd9hSVkyjKh1v3ct1dnaui5PLVq8M";
  
  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${WEATHER_API_KEY}&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
        // console.log(weather?.weather[0]?.description);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${weather?.weather[0]?.description}&client_id=${UNSPLASH_API_KEY}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        // console.log(data);
        // console.log(data?.results[0].links.download);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
}
  return (
    <Main>
    <GlobalStyle />
      <div className="app">
        <img src={photos} alt="Hello" className="mainImage" />
        <div className="wrapper">
          <div className="search">
            <input
              type="text"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              placeholder="Enter location"
              className="location_input"
            />
            <button className="location_searcher" onClick={ifClicked}>
              Search Location
            </button>
          </div>
          <div className="app__data">
            <p className="temp">Current Temparature: {weather?.main?.temp}</p>
          </div>
        </div>
        </div>
    </Main>
  );
}

const Main = styled.div` 

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap");

.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #000;

  margin: 0;
  padding: 0;
}

.mainImage {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: fit;


  /* filter: blur(8px); */
  /* -webkit-filter: blur(8px); */
  /* opacity: 0.8; */
}

.wrapper {
  padding: 25px;
  border: 0.1px solid rgb(96, 96, 96); 
  display: flex;
  flex-direction: column;
  width: 40%;
  height: auto;
  background: rgba(219, 216, 216, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 4;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.app__image {
  margin: 24px;
  max-height: 500px;
  width: auto;
  border-radius: 10px;
}
.location_searcher {
  padding: 8px;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 5px;
  margin-left: 5px;
}
.location_input {
  z-index: 4;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #333;
  border-radius: 5px;
}

.temp {
  margin: 5px;
  font-family: Poppins;
  color: #2e2e2e;
}

`;

export default App;