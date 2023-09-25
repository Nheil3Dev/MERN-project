import express, { type Request, type Response } from 'express'
import { HelloController } from '../controller/HelloController'
import { LogInfo } from '../utils/logger'

// Router from express
export const helloRouter = express.Router()

// http://localhost:8000/api/hello?name=Claudio/
helloRouter.route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const name: any = req?.query?.name
    LogInfo(`Query Param: ${name}`)
    // Controller Instance to execute method
    const controller: HelloController = new HelloController()
    // Obtain Response
    const response = await controller.getMessage(name)
    // Send the response to the client
    return res.send(response)
  })
