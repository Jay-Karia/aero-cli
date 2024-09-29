import chalk from 'chalk'
import opencage from 'opencage-api-client'

export async function getCoordinates(
  city: string
): Promise<{ lat: number; lng: number } | undefined> {
  try {
    const response = opencage.geocode({ q: city })
    const data = await response

    if (data.status.code === 200) {
      if (data.results.length > 0) {
        const place = data.results[0]
        const { lat, lng } = place.geometry
        return { lat, lng }
      }
    }
  } catch {
    console.error(
      chalk.red('Could not find coordinates for the given location.')
    )
  }
}
