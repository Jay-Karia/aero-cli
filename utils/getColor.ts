import chalk from 'chalk'

export function getWeatherColor(weather: string) {
  if (weather.includes('clear')) return chalk.yellow
  if (weather.includes('cloud')) return chalk.white
  if (weather.includes('rain')) return chalk.blue
  if (weather.includes('thunderstorm')) return chalk.bold.yellow
  if (weather.includes('snow')) return chalk.white
  if (weather.includes('mist') || weather.includes('fog')) return chalk.grey
  if (weather.includes('drizzle')) return chalk.blue
  if (weather.includes('wind')) return chalk.green

  return chalk.green
}

export function getTemperatureColor(temp: number) {
  if (temp > 30) return chalk.red
  if (temp > 20) return chalk.yellow
  if (temp > 10) return chalk.green

  return chalk.blue
}

export function getPressureColor(pressure: number) {
  if (pressure > 1013) return chalk.hex(`#ff0000`)
  if (pressure > 1000) return chalk.hex(`#ffe600`)
  if (pressure > 990) return chalk.hex('#00ff2f')

  return chalk.blue
}

export function getHumidityColor(humidity: number) {
  if (humidity > 80) return chalk.hex(`#006370`)
  if (humidity > 60) return chalk.hex(`#00a9bf`)
  if (humidity > 40) return chalk.hex(`#1ce5ff`)
  if (humidity > 20) return chalk.hex(`#73efff`)

  return chalk.hex(`#ff0000`)
}

export function getWindColor(speed: number) {
  if (speed > 10) return chalk.hex(`#595959`)
  if (speed > 5) return chalk.hex(`#9e9e9e`)

  return chalk.hex(`#dedede`)
}

export function getRainColor(rain: number) {
  if (rain > 10) return chalk.hex(`#1481c9`)
  if (rain > 5) return chalk.hex(`#38afff`)

  return chalk.hex(`#7dcbff`)
}

export function getPrecipitationColor(precipitation: number) {
  if (precipitation > 10) return chalk.hex(`#1481c9`)
  if (precipitation > 5) return chalk.hex(`#38afff`)

  return chalk.hex(`#7dcbff`)
}
