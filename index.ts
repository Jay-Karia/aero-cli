#!/usr/bin/env node

import figlet from 'figlet'
import { Command } from 'commander'
import { currentWeather } from './lib/current.js'
import * as dotenv from 'dotenv'

const program = new Command()
dotenv.config()

program
  .name('aero')
  .version('1.0.0')
  .description('⛅ Weather updates right in your terminal')
  .action(() => {
    console.log(figlet.textSync('Aero', { horizontalLayout: 'full' }))
    program.help()
  })

// Get the current weather
program
  .command('current')
  .description('Get the current weather for a location')
  .option('-l, --location <type>', 'Specify the location (city or zip code)')
  .option(
    '-u, --unit <type>',
    'Set temperature unit (celsius or fahrenheit)',
    'celsius'
  )
  .action((options) => {
    const { location, unit } = options
    currentWeather({ location, unit })
  })

program.parse(process.argv)
