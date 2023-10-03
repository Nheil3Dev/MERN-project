import express, { type Request, type Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { type IAuth, type IUser } from '../controller/interfaces/'

// Body Parser to read BODY from requests
import bodyParser from 'body-parser'

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// Middleware
import { verifyToken } from '../middlewares/verifyToken'

const jsonParser = bodyParser.json()

export const authRouter = express.Router()

authRouter.route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    // Obtain data from body
    const { name, password, email, age } = req?.body

    if (email && name && password && age) {
      // Obtain the password in request and cypher
      const hashedPassword = bcrypt.hashSync(password, 8) ?? ''

      const newUser: IUser = { name, email, age, password: hashedPassword, katas: [] }

      // Controller instance to execute method
      const controller: AuthController = new AuthController()

      // Obtain response
      const response = await controller.resgisterUser(newUser)

      // Send response to the client
      return res.status(200).send(response)
    } else {
      return res.status(400).send({
        message: 'You should be send all data'
      })
    }
  })

authRouter.route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    // Obtain data from body
    const { email, password } = req?.body

    if (email && password) {
      const auth: IAuth = { email, password }

      // Controller instance to execute method
      const controller: AuthController = new AuthController()

      // Obtain response
      const response = await controller.loginUser(auth)

      // Send response to the client
      return res.status(200).send(response)
    } else {
      return res.status(400).send({
        message: 'You should be send all data'
      })
    }
  })

// Route Protected by VERIFY TOKEN Middleware
authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain user's id to check data
    const id: any = req?.query?.id

    if (id) {
      // Controller: Auth Controller
      const controller: AuthController = new AuthController()

      // Obtain response from Controller
      const response: any = await controller.getUserData(id)

      // If user is authorised
      return res.status(200).send(response)
    } else {
      return res.status(401).send({
        message: 'Not Authorised'
      })
    }
  })
