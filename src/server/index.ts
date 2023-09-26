import express, { type Express, type Request, type Response } from 'express'
// Security
import cors from 'cors'
import helmet from 'helmet'

// TODO: HTTPS

// Root Router
import { server } from '../routes'

// Create Express App (server)
export const app: Express = express()

// Define SERVER to use /api and use rootRouter from index.ts in routes
app.use('/api', server)

// Static Server
app.use(express.static('public'))

// TODO: Mongoose Connection

// Security Config
app.use(helmet())
app.use(cors())

// Content Type Config:
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))

// Redirection Config
// http://localhost:8000/ --> http://localhost:8000/api/
app.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})
