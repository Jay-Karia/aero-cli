interface DailyForecast {
  time: Date[]
  temperature2mMax: Float32Array<ArrayBufferLike>
  temperature2mMin: Float32Array<ArrayBufferLike>
  precipitationSum: Float32Array<ArrayBufferLike>
  rainSum: Float32Array<ArrayBufferLike>
  windSpeed10mMax: Float32Array<ArrayBufferLike>
  weatherCode: Float32Array<ArrayBufferLike>
}

interface HourlyForecast {
  time: Date[]
  temperature2m: Float32Array<ArrayBufferLike>
  relativeHumidity2m: Float32Array<ArrayBufferLike>
  precipitation: Float32Array<ArrayBufferLike>
  rain: Float32Array<ArrayBufferLike>
  windSpeed10m: Float32Array<ArrayBufferLike>
  temperature80m: Float32Array<ArrayBufferLike>
  weatherCode: Float32Array<ArrayBufferLike>
}

export { DailyForecast, HourlyForecast }
