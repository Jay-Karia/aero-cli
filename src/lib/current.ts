import { Unit } from '../types/Unit.js'
import chalk from 'chalk'

type CurrentWeatherOptions = {
  location: string
  unit: Unit
}

export default function currentWeather({
  location,
  unit,
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

  const parsedUnit =
    unit === 'f' ? 'fahrenheit' : unit === 'c' ? 'celsius' : unit

  console.log(
    `Getting the current weather for ${location} in ${parsedUnit || 'celsius'}...`
  )
}
