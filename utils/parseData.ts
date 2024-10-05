import { WeatherResponse } from '../types/Weather.js'
import { getWeatherEmoji } from './getEmoji.js'
import {
  getWeatherColor,
  getTemperatureColor,
  getPressureColor,
  getHumidityColor,
  getWindColor,
  getRainColor,
  getPrecipitationColor,
} from './getColor.js'
import chalk from 'chalk'
import { DailyForecast, HourlyForecast } from '../types/Forecast.js'
import { getCity } from './getCity.js'
import { WEATHER_CODE_MAP } from '../constants/index.js'

export function parseCurrentWeather(
  data: WeatherResponse,
  parsedUnit: string,
  onlyTemp?: boolean
) {
  const location = `${chalk.green(data.name)}, ${data.sys.country}`

  const temperature = `Temperature: ${getTemperatureColor(data.main.temp)(data.main.temp)} ${parsedUnit === 'celsius' ? '°C' : '°F'}\n  Feels like: ${getTemperatureColor(data.main.feels_like)(data.main.feels_like)} ${parsedUnit === 'celsius' ? '°C' : '°F'}\n  Min: ${getTemperatureColor(data.main.temp_min)(data.main.temp_min)} ${parsedUnit === 'celsius' ? '°C' : '°F'}\n  Max: ${getTemperatureColor(data.main.temp_max)(data.main.temp_max)} ${parsedUnit === 'celsius' ? '°C' : '°F'}`

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

export async function parseDailyForecast(
  data: DailyForecast,
  lat: number,
  lng: number,
  unit: string,
  days: number
) {
  const { city, country } = (await getCity({ lat, lng })) as {
    city: string
    country: string
  }

  const location = `
  ${chalk.bold('Daily Forecast')} for ${chalk.green(city)}, ${country}
  `

  console.log(location)

  const limit = days ? days : data.time.length

  for (let i = 0; i < limit; i++) {
    const date = new Date(data.time[i])
    const day =
      date.toLocaleDateString('en-US', { weekday: 'long' }) +
      ', ' +
      date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    const temperature = `${getTemperatureColor(data.temperature2mMax[i])(data.temperature2mMax[i].toFixed(0))} ${unit === 'celsius' ? '°C' : '°F'}`
    const precipitation = `${getPrecipitationColor(data.precipitationSum[i])(data.precipitationSum[i].toFixed(2))} mm`
    const rain = `${getRainColor(data.rainSum[i])(data.rainSum[i].toFixed(2))} mm`
    const windSpeed = `${getWindColor(data.windSpeed10mMax[i])(data.windSpeed10mMax[i].toFixed(2))} m/s`
    const weatherCode = data.weatherCode[i]
    const weather = `${getWeatherEmoji(WEATHER_CODE_MAP[weatherCode])} ${WEATHER_CODE_MAP[weatherCode]}`

    console.log(`${chalk.bold(day)}`)
    console.log('Temperature:' + `${temperature}`)
    console.log('Weather: ' + weather)
    console.log('Precipitation: ' + precipitation)
    console.log('Rain: ' + rain)
    console.log('Wind Speed: ' + windSpeed)

    console.log('\n---------------------------------------\n')
  }
}

export async function parseHourlyForecast(
  data: HourlyForecast,
  lat: number,
  lng: number,
  unit: string,
  days: number
) {
  const { city, country } = (await getCity({ lat, lng })) as {
    city: string
    country: string
  }

  const location = `
  ${chalk.bold('Hourly Forecast')} for ${chalk.green(city)}, ${country}
  `

  console.log(location)

  const limit = days ? days * 24 : data.time.length

  for (let i = 0; i < limit; i++) {
    const date = new Date(data.time[i])
    const day =
      date.toLocaleDateString('en-US', { weekday: 'long' }) +
      ', ' +
      date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })

    const temperature = getTemperatureColor(data.temperature2m[i])(
      data.temperature2m[i].toFixed(0)
    )
    const precipitation =
      getPrecipitationColor(data.precipitation[i])(
        data.precipitation[i].toFixed(2)
      ) + ' mm'
    const rain = getRainColor(data.rain[i])(data.rain[i].toFixed(2)) + ' mm'
    const windSpeed =
      getWindColor(data.windSpeed10m[i])(data.windSpeed10m[i].toFixed(2)) +
      ' m/s'
    const weatherCode = data.weatherCode[i]
    const weather =
      getWeatherEmoji(WEATHER_CODE_MAP[weatherCode]) +
      ' ' +
      WEATHER_CODE_MAP[weatherCode]

    if (i === 0 || date.getDate() !== new Date(data.time[i - 1]).getDate()) {
      console.log(chalk.bold(day) + '\n')
    }

    console.log(chalk.bold(`${time}`))
    console.log(
      'Temperature:' + `${temperature} ${unit === 'celsius' ? '°C' : '°F'}`
    )
    console.log('Weather: ' + weather)
    console.log('Precipitation: ' + precipitation)
    console.log('Rain: ' + rain)
    console.log('Wind Speed: ' + windSpeed)

    console.log('\n---------------------------------------\n')
  }
}
