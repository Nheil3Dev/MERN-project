import express, { type Request, type Response } from 'express'
import { UserController } from '../controller/UsersController'
import { type IUser, type StatusResponse } from '../controller/interfaces/'
import { LogInfo } from '../utils/logger'

// Body Parser to read BODY from requests
import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()

// Router from express
export const userRouter = express.Router()

// http://localhost:8000/api/users?id=6515417eae34125456eab8ee/
userRouter.route('/')

  // GET
  .get(async (req: Request, res: Response) => {
    // Obtain a Query param
    const id: any = req?.query?.id
    if (id !== undefined) LogInfo(`Query Param: ${id}`)

    // Controller Instance to execute method
    const controller: UserController = new UserController()

    // Obtain Response
    const response: any = await controller.getUsers(id)

    // Send the response to the client
    return res.status(200).send(response)
  })

  // DELETE
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query param
    const id: any = req?.query?.id
    if (id !== undefined) LogInfo(`Query Param: ${id}`)

    // Controller Instance to execute method
    const controller: UserController = new UserController()

    // Obtain Response
    const response: StatusResponse = await controller.deleteUser(id)

    // Send the response to the client
    return res.status(response.status).send(response.message)
  })

  // PUT
  .put(jsonParser, async (req: Request, res: Response) => {
    // Obtain user from body
    const user: IUser = req.body

    // Obtain id from query params
    const id: any = req.query.id

    // Controller instance to execute method
    const controller: UserController = new UserController()

    // Obtain response
    const response: StatusResponse = await controller.updateUser(user, id)

    // Send response to the client
    res.status(response.status).send(response.message)
  })