// Interfaces to type the OpenWeather API response
interface Weather {
  main: string;
  description: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Sys {
  country: string;
}

interface WeatherResponse {
  name: string;
  weather: Weather[];
  main: Main;
  wind: Wind;
  sys: Sys;
  cod: string
  message: string
}

export { WeatherResponse };