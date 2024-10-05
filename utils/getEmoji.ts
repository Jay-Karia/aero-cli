export function getWeatherEmoji(description: string): string {
  description = description.toLowerCase()

  if (description.includes('clear')) return '☀️ '
  if (description.includes('cloud')) return '☁️ '
  if (description.includes('rain')) return '🌧️ '
  if (description.includes('thunderstorm')) return '⛈️ '
  if (description.includes('snow')) return '❄️ '
  if (description.includes('mist') || description.includes('fog')) return '🌫️ '
  if (description.includes('drizzle')) return '🌦️ '
  if (description.includes('wind')) return '💨 '

  return '🌍'
}
