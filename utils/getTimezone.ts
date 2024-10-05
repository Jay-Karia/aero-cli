import chalk from 'chalk'
import opencage from 'opencage-api-client'

type Props = {
  lat: number
  lng: number
}

export async function getTimezone({ lat, lng }: Props) {
  try {
    const response = opencage.geocode({ q: `${lat}, ${lng}` })
    const data = await response

    if (data.status.code === 200) {
      if (data.results.length > 0) {
        const place = data.results[0]
        const { timezone } = place.annotations
        return timezone.name
      }
    }
  } catch {
    console.error(chalk.red('Could not find city for the given coordinates.'))
  }
}
