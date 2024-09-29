import { WeatherResponse } from '../types/Weather.js'
import { getWeatherEmoji } from './getEmoji.js'
import {
  getWeatherColor,
  getTemperatureColor,
  getPressureColor,
  getHumidityColor,
  getWindColor,
} from './getColor.js'
import chalk from 'chalk'

export function parseCurrentWeather(data: WeatherResponse, onlyTemp?: boolean) {
  const location = `${chalk.green(data.name)}, ${data.sys.country}`

  const temperature = `Temperature: ${getTemperatureColor(data.main.temp)(data.main.temp)}°C\n  Feels like: ${getTemperatureColor(data.main.feels_like)(data.main.feels_like)}°C\n  Min: ${getTemperatureColor(data.main.temp_min)(data.main.temp_min)}°C\n  Max: ${getTemperatureColor(data.main.temp_max)(data.main.temp_max)}°C`

  const weather = `${getWeatherEmoji(data.weather[0].description)} ${getWeatherColor(data.weather[0].description)(data.weather[0].main)}`

  const pressure = `Pressure: ${getPressureColor(data.main.pressure)(data.main.pressure)} hPa`
  const humidity = `Humidity: ${getHumidityColor(data.main.humidity)(data.main.humidity)} %`

  const wind = `Wind: ${getWindColor(data.wind.speed)(data.wind.speed)} m/s`

  return `
  ${location}

  ${weather}

  ${temperature}
  ${onlyTemp ? '' : `\n  ${pressure}\n  ${humidity}\n\n  ${wind}`}
  `
}
