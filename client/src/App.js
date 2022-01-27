import React, { useEffect, useState } from "react";
import background from './static/background.png'
import styled from 'styled-components';
import SearchBox from './components/SearchBox'
import api from "./services/api"
import WeatherCard from "./components/WeatherCard"

function App() {
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(forecast).length === 0) {
      api
        .get("/?location=Salvador")
        .then((forecast) => {
          setForecast(forecast.data)
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [forecast])

  const Weather = loading || Object.keys(forecast).length === 0 ? (<h1>Loading...</h1>) : (<WeatherCard forecast={forecast} />);

  return (
    <Container>
      <h1>Kontulari Weather</h1>
      <SearchBox setForecast={setForecast} setLoading={setLoading} />
      {Weather}
    </Container>
  );
}

const Container = styled.div`
  background: #1de9b6;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "neutra", sans-serif;
  height: 100%;
  min-height: 100vh;
  text-align: center;
  h1 {
    color: #32325d;
    font-size: 64px;
    font-weight: 600;
    line-height: 52px;
    padding-bottom: 48px;
    padding-top: 128px;
    text-align: center;
  }
`

export default App;
