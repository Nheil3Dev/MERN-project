import express, { type Request, type Response } from 'express'
import { KataController } from '../controller/KatasController'
import { KataLevel, type IKata } from '../domain/interfaces/IKata.interface'
import { LogInfo } from '../utils/logger'

// Body Parser to read BODY from requests
import bodyParser from 'body-parser'

// JWT Verifier Middleware
import { verifyToken } from '../middlewares/verifyToken'

const jsonParser = bodyParser.json()

// Router from express
export const kataRouter = express.Router()

kataRouter.route('/')

  // GET
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query param
    const id: any = req?.query?.id
    if (id !== undefined) LogInfo(`Query Param Id: ${id}`)

    const userId: any = req?.query?.userId
    if (userId !== undefined) LogInfo(`Query Param userId: ${userId}`)

    // Pagination
    // No utilizar el nullish (??) ya que Number(undefined) = NaN y NaN ?? 1 = NaN
    const page: number = Number(req?.query?.page) || 1
    const limit: number = Number(req?.query?.limit) || 10

    // Controller Instance to execute method
    const controller: KataController = new KataController()

    // Obtain Response
    const response = await controller.getKatas(page, limit, id, userId)

    // Send the response to the client
    return res.status(200).send(response)
  })

  // DELETE
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query param
    const id: any = req?.query?.id
    if (id !== undefined) LogInfo(`Query Param: ${id}`)

    // Controller Instance to execute method
    const controller: KataController = new KataController()

    // Obtain Response
    const response = await controller.deleteKata(id)

    // Send the response to the client
    return res.status(response.status).send(response.message)
  })

  // PUT --> Revisar!! Hay que pasarle todos los datos sino los sobreescribe por los de por defecto
  .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
    // Obtain kata from body
    const name: string = req?.body?.name
    const description: string = req?.body?.description || ''
    const level: KataLevel = req?.body?.level || KataLevel.BASIC
    const intents: number = req?.body?.intents || 0
    const stars: number = req?.body?.stars || 0
    const creator: string = req?.body?.creator
    const solution: string = req?.body?.solution || ''
    const participants: string[] = req?.body?.participants || []

    if (!name || !creator) {
      return res.status(400).send({
        message: 'You need to send all data'
      })
    }

    const kata: IKata = {
      name,
      description,
      level,
      intents,
      stars,
      creator,
      solution,
      participants
    }

    // Obtain id from query params
    const id: any = req.query.id

    // Controller instance to execute method
    const controller: KataController = new KataController()

    // Obtain response
    const response = await controller.updateKata(kata, id)

    // Send response to the client
    return res.status(response.status).send(response.message)
  })

  // POST
  .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
    // Obtain kata from body
    const name: string = req?.body?.name
    const description: string = req?.body?.description || ''
    const level: KataLevel = req?.body?.level || KataLevel.BASIC
    const intents: number = req?.body?.intents || 0
    const stars: number = req?.body?.stars || 0
    const creator: string = req?.body?.creator
    const solution: string = req?.body?.solution || ''
    const participants: string[] = req?.body?.participants || []

    if (!name || !creator) {
      return res.status(400).send({
        message: 'You need to send all data'
      })
    }

    const kata: IKata = {
      name,
      description,
      level,
      intents,
      stars,
      creator,
      solution,
      participants
    }

    console.log(kata)

    // Controller instance to execute method
    const controller: KataController = new KataController()

    // Obtain response
    const response = await controller.createKata(kata)

    return res.status(response.status).send(response.message)
  })
