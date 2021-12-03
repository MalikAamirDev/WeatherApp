import "./App.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import tem from "./assets/tem.png";
import humidity from "./assets/humidity.png";
import pressure from "./assets/pressure.png";
import haze from "./assets/haze.png";

function App() {
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState('Karachi');
  const [loader, setLoader] = useState(true);
  

  const apiHandle = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=20e09dd31d408392d524ea2d2265dba9`,
  });

  const getWeatherData = async () => {
    await apiHandle.get("").then((e) => {
      setCity(e.data);
      setLoader(false);
    });
  };

  // const SearchData = (e) =>{
  //   if(e.key === 'Enter'){
  //     setSearch(search)
  //     setSearch('')
  //   }
  // }

  useEffect(() => {
    getWeatherData();
  }, []);

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
                placeholder="Search..."
                type="text"
                // value={search}
                // onKeyPress={SearchData}
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
                      {city.main.temp} F
                    </WeatherTemperature>
                  </LocationBar>
                  <WeatherInfo>
                    <WeatherCondition>
                      <img src={haze} />
                      {/* <span>{city.weather[0].icon}</span> */}
                    </WeatherCondition>
                    <WeatherIcons>
                      <WeatherTemp>
                        <img src={tem} />
                        <h4>Temperature</h4>
                        <hr />
                        <span>{city.main.temp} F</span>
                      </WeatherTemp>
                      <WeatherHumidity>
                        <img src={humidity} />
                        <h4>Humidity</h4>
                        <hr />
                        <span>{city.main.humidity}%</span>
                      </WeatherHumidity>
                      <WeatherPressure>
                        <img src={pressure} />
                        <h4>Pressure</h4>
                        <hr />
                        <span>{city.main.pressure}</span>
                      </WeatherPressure>
                    </WeatherIcons>
                    <WeatherTemperatureMax></WeatherTemperatureMax>
                    <WeatherTemperatureMin></WeatherTemperatureMin>
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
  background: #5c258d;
  background: -webkit-linear-gradient(to right, #4389a2, #5c258d);
  background: linear-gradient(to right, #4389a2, #5c258d);
`;
const LoaderBox = styled.div`
  margin-top: 300px;
`;

const Container = styled.div`
  min-height: 100vh;
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
  margin: 50px 20px;
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
    margin-top: 8px;
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
const WeatherTemperatureMax = styled.div``;
const WeatherTemperatureMin = styled.div``;
