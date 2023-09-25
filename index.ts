import dotenv from 'dotenv'
import { app } from './src/server'
import { LogError, LogSucces } from './src/utils/logger'

// Configuration the .env file
dotenv.config()

const port: string | number = process.env.PORT ?? 8000

// Execute App and Listen Request to PORT
app.listen(port, () => {
  LogSucces(`[SERVER ON]: Running in http://localhost:${port}/api`)
})

// Control Server Error
app.on('error', (error: any) => {
  LogError(`[SERVER ERROR]: ${error}`)
})
