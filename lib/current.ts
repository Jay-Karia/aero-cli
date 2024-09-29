import { Unit } from '../types/Unit.js'
import chalk from 'chalk'
import { apiUnitMap } from '../constants/index.js'
import { WeatherResponse } from '../types/Weather.js'
import { parseCurrentWeather } from '../utils/parseData.js'

type CurrentWeatherOptions = {
  location: string
  unit: Unit
  temperature?: boolean
}

export async function currentWeather({
  location,
  unit,
  temperature,
}: CurrentWeatherOptions) {
  // Check if the location is provided
  if (!location) {
    console.error(
      chalk.red('Error: Please provide a location with -l or --location.')
    )
    process.exit(1)
  }

  // Check if the unit is valid
  if (unit && !['celsius', 'fahrenheit', 'c', 'f'].includes(unit)) {
    console.error(chalk.red('Error: Please provide a valid unit.'))
    console.log(chalk.yellow('Valid units are: celsius, fahrenheit, c, f'))
    process.exit(1)
  }

  // Map the unit to the API unit
  const parsedUnit =
    unit === 'f' ? 'fahrenheit' : unit === 'c' ? 'celsius' : unit
  const apiUnit = apiUnitMap[parsedUnit]

  const API_KEY = process.env.API_KEY
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${apiUnit}`

  try {
    const response = await fetch(API_URL)
    const data = (await response.json()) as WeatherResponse

    if (data.cod === '404') {
      console.error(chalk.red('Error: Location not found.'))
      process.exit(1)
    }

    console.log(parseCurrentWeather(data, temperature))
  } catch {
    console.error(chalk.red('Error: Unable to fetch weather data.'))
  }
}
