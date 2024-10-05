#!/usr/bin/env node

import figlet from 'figlet'
import { Command } from 'commander'
import { currentWeather } from './lib/current.js'
import * as dotenv from 'dotenv'
import { getForecast } from './lib/forecast.js'

const program = new Command()
dotenv.config()

program
  .name('aero')
  .version('1.0.0')
  .description('⛅ Weather updates right in your terminal')
  .action(() => {
    console.log(figlet.textSync('⛅ Aero', { horizontalLayout: 'full' }))
    program.help()
  })

// Get the current weather
program
  .command('current')
  .description('Get the current weather for a location')
  .requiredOption(
    '-l, --location <type>',
    'Specify the location (city or zip code)'
  )
  .option(
    '-u, --unit <type>',
    'Set temperature unit (celsius or fahrenheit)',
    'celsius'
  )
  .option('-t, --temperature', 'Display only the temperature data')
  .action((options) => {
    const { location, unit, temperature } = options
    currentWeather({ location, unit, temperature })
  })

// Get the forecast
program
  .command('forecast')
  .description('Get the weather forecast for a location')
  .requiredOption(
    '-l, --location <type>',
    'Specify the location (city or zip code)'
  )
  .option(
    '-u, --unit <type>',
    'Set temperature unit (celsius or fahrenheit)',
    'celsius'
  )
  .option('-d, --daily', 'Daily forecast for the next 7 days')
  .option('-h, --hourly', 'Hourly forecast for the next 48 hours')
  .option('--days <number>', 'Number of forecast days')
  .action((options) => {
    const { location, unit, daily, hourly, days } = options
    getForecast({ location, unit, daily, hourly, days })
  })

program.parse(process.argv)
