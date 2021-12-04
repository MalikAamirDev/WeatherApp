import "./App.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import tem from "./assets/tem.png";
import humidity from "./assets/humidity.png";
import pressure from "./assets/pressure.png";
import { FetchWeather } from "./config/FetchWeather";

function App() {
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("Karachi");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await FetchWeather(search);
      setCity(data);
      setSearch("");
      setLoader(false);
    };
    getWeatherData();
  }, [search]);

  return (
    <>
      {loader ? (
        <LoaderBox>
          <div className="loader">Loading....</div>
        </LoaderBox>
      ) : (
        <MainContainer>
          <Container>
            <SearchBox>
              <SearchBar
                placeholder="Enter City"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>
            <LocationBox>
              {!city ? (
                <NoDataFound>No Data Found</NoDataFound>
              ) : (
                <>
                  <LocationBar>
                    <CityName>
                      {city.name} <sup>{city.sys.country}</sup>
                    </CityName>
                    <WeatherTemperature>
                      {city.main.temp} <sup>&deg;C</sup>
                    </WeatherTemperature>
                  </LocationBar>
                  <WeatherInfo>
                    <WeatherCondition>
                      <img
                        alt={city.weather[0].main}
                        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                      />
                      <span>{city.weather[0].main}</span>
                    </WeatherCondition>
                    <WeatherIcons>
                      <WeatherTemp>
                        <img alt={city.main.temp} src={tem} />
                        <h4>Temperature</h4>
                        <hr />
                        <span>{city.main.temp} &deg;C </span>
                      </WeatherTemp>
                      <WeatherHumidity>
                        <img alt={city.main.humidity} src={humidity} />
                        <h4>Humidity</h4>
                        <hr />
                        <span>{city.main.humidity}%</span>
                      </WeatherHumidity>
                      <WeatherPressure>
                        <img alt={city.main.pressure} src={pressure} />
                        <h4>Pressure</h4>
                        <hr />
                        <span>{city.main.pressure}p</span>
                      </WeatherPressure>
                    </WeatherIcons>
                  </WeatherInfo>
                </>
              )}
            </LocationBox>
          </Container>
        </MainContainer>
      )}
    </>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f2709c, #ff9472);
`;
const LoaderBox = styled.div`
  margin-top: 300px;
`;

const Container = styled.div`
  min-height: 100vh;
  padding-top: 50px;
`;
const SearchBox = styled.div`
  width: 100%;
  padding: 10px;
`;
const SearchBar = styled.input`
  display: block;
  width: 100%;
  padding: 15px;
  border: none;
  appearance: none;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background-color: rgba(255, 255, 255, 0.5);
  color: #313131;
  transition: 0.4 ease;
  font-size: 18px;
  :focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.75);
  }
`;
const LocationBox = styled.div`
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background-color: rgba(255, 255, 255, 0.75);
  color: #313131;
`;

const NoDataFound = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
const LocationBar = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const CityName = styled.h1`
  sup {
    background-color: coral;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    padding: 1px 10px;
    border-radius: 10px;
  }
`;
const WeatherTemperature = styled.h1`
  font-size: 72px;
  margin-top: 40px;
  sup {
    font-size: 2.5rem;
    margin-left: -0.5em;
  }
`;
const WeatherInfo = styled.div``;
const WeatherCondition = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    object-fit: contain;
    height: 100px;
  }
  span {
    margin-top: -10px;
    font-weight: 500;
    font-size: 14px;
  }
`;
const WeatherIcons = styled.div`
  display: flex;
  margin-top: 20px;
`;
const WeatherTemp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  img {
    object-fit: contain;
    height: 50px;
  }
  h4 {
    font-weight: 500;
  }
  hr {
    width: 20px;
    background-color: coral;
    height: 2px;
    border: 0;
    margin-top: 5px;
  }
  span {
    font-size: 20px;
    font-weight: 700;
    margin-top: 5px;
    text-align: center;
  }
`;
const WeatherPressure = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  img {
    object-fit: contain;
    width: auto;
    height: 40px;
  }
  h4 {
    font-weight: 500;
  }
  hr {
    width: 20px;
    background-color: coral;
    height: 2px;
    border: 0;
    margin-top: 5px;
  }
  span {
    font-size: 20px;
    font-weight: 700;
    margin-top: 5px;
  }
`;
const WeatherHumidity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
  align-items: center;
  img {
    object-fit: contain;
    width: auto;
    height: 40px;
  }
  h4 {
    font-weight: 500;
  }
  hr {
    width: 20px;
    background-color: coral;
    height: 2px;
    border: 0;
    margin-top: 5px;
  }
  span {
    font-size: 20px;
    font-weight: 700;
    margin-top: 5px;
  }
`;
