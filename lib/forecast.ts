import chalk from 'chalk'
import { getCoordinates } from '../utils/getCoordinates.js'
import { fetchWeatherApi } from 'openmeteo'
import { parseDailyForecast, parseHourlyForecast } from '../utils/parseData.js'
import { getTimezone } from '../utils/getTimezone.js'

type ForecastOptions = {
  location: string
  unit: string
  daily?: boolean
  hourly?: boolean
  days: number
}

export async function getForecast({
  location,
  unit,
  daily: dailyData,
  hourly: hourlyData,
  days,
}: ForecastOptions) {
  // Check if the unit is valid
  if (unit && !['celsius', 'fahrenheit', 'c', 'f'].includes(unit)) {
    console.error(chalk.red('Error: Please provide a valid unit.'))
    console.log(chalk.yellow('Valid units are: celsius, fahrenheit, c, f'))
    process.exit(1)
  }

  // check the days value
  if (days && (days < 1 || days > 7)) {
    console.error(
      chalk.red('Error: Please provide a valid number of days (1 - 7).')
    )
    process.exit(1)
  }

  const parsedUnit =
    unit === 'f' ? 'fahrenheit' : unit === 'c' ? 'celsius' : unit

  // Get the coordinates of the location
  const { lat, lng } = (await getCoordinates(location)) as {
    lat: number
    lng: number
  }

  const timezone = await getTimezone({ lat, lng })

  if (dailyData) {
    const dailyParams = {
      latitude: lat,
      longitude: lng,
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'rain_sum',
        'wind_speed_10m_max',
      ],
      temperature_unit: parsedUnit,
      wind_speed_unit: 'ms',
      timezone,
    }
    const url = 'https://api.open-meteo.com/v1/forecast'
    const responses = await fetchWeatherApi(url, dailyParams)
    const response = responses[0]

    const utcOffsetSeconds = response.utcOffsetSeconds()
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

    const daily = response.daily()!
    const weatherDataDaily = {
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        precipitationSum: daily.variables(3)!.valuesArray()!,
        rainSum: daily.variables(4)!.valuesArray()!,
        windSpeed10mMax: daily.variables(5)!.valuesArray()!,
      },
    }

    await parseDailyForecast(weatherDataDaily.daily, lat, lng, parsedUnit, days)
  }
  if (hourlyData) {
    const hourlyParams = {
      latitude: lat,
      longitude: lng,
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'precipitation',
        'rain',
        'weather_code',
        'wind_speed_10m',
        'temperature_80m',
      ],
      temperature_unit: parsedUnit,
      wind_speed_unit: 'ms',
      timezone,
    }

    const url = 'https://api.open-meteo.com/v1/forecast'
    const responses = await fetchWeatherApi(url, hourlyParams)
    const response = responses[0]

    const utcOffsetSeconds = response.utcOffsetSeconds()
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

    const hourly = response.hourly()!
    const weatherDataHourly = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        precipitation: hourly.variables(2)!.valuesArray()!,
        rain: hourly.variables(3)!.valuesArray()!,
        weatherCode: hourly.variables(4)!.valuesArray()!,
        windSpeed10m: hourly.variables(5)!.valuesArray()!,
        temperature80m: hourly.variables(6)!.valuesArray()!,
      },
    }

    await parseHourlyForecast(
      weatherDataHourly.hourly,
      lat,
      lng,
      parsedUnit,
      days
    )
  }
}
