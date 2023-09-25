import dotenv from 'dotenv'
import express, { type Express, type Request, type Response } from 'express'

// Configuration the .env file
dotenv.config()

// Create Express App
const app: Express = express()
const port: string | number = process.env.PORT ?? 8000

// Define the first route
app.get('/', (req: Request, res: Response) => {
  // Send Hello World
  res.send('<h1>Welcome to API Restful:</h1> <h2>Express + TS + Swagger + Mongoose</h2>')
})

app.get('/hello', (req: Request, res: Response) => {
  res.send('Welcome to Get Route: Hello!')
})

// Execute App and Listen Request to PORT
app.listen(port, () => {
  console.log(`Listening at: http://localhost:${port}`)
})
