/**
 * Root Router
 * Redirections to Routers
 */

import express, { type Request, type Response } from 'express'
import { LogInfo } from '../utils/logger'
import { authRouter } from './AuthRouter'
import { helloRouter } from './HelloRouter'
import { userRouter } from './UserRouter'

// Server instance
export const server = express()

// Router instance
const rootRouter = express.Router()

// Activate for request to http://localhost:8000/api
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api/')
  // Send Hello World
  res.send('<h1>Welcome to API Restful:</h1> <h2>Express + TS + Swagger + Mongoose</h2>')
})

// Redirections to Routers & Controllers
server.use('/', rootRouter) // http://localhost:8000/api/
server.use('/hello', helloRouter) // http://localhost:8000/api/hello
server.use('/users', userRouter) // http://localhost:8000/api/users
server.use('/auth', authRouter) // http://localhost:8000/api/auth
// Add more routes to the app
