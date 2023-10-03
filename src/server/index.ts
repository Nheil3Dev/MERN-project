import express, { type Express, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import { LogError, LogSucces } from '../utils/logger'

// Swagger
import swaggerUi from 'swagger-ui-express'

// Security
import cors from 'cors'
import helmet from 'helmet'

// TODO: HTTPS

// Root Router
import { server } from '../routes'

// Create Express App (server)
export const app: Express = express()

// Content Type Config:
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Security Config
app.use(helmet())
app.use(cors())

// Swagger Config and route
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true
    }
  }))

// Define SERVER to use /api and use rootRouter from index.ts in routes
app.use('/api', server)

// Static Server
app.use(express.static('public'))

// TODO: Mongoose Connection
mongoose.connect('mongodb://127.0.0.1:27017/mernProject')
  .then(bd => { LogSucces('[DATA BASE]: Connection Done') })
  .catch(error => { LogError(`[DATA BASE]: Conection Error: ${error}`) })

// Redirection Config
// http://localhost:8000/ --> http://localhost:8000/api/
app.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})
