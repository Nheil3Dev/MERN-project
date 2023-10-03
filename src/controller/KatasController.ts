import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKata, type KataResponse } from '../domain/interfaces/IKata.interface'
import { LogSucces, LogWarning } from '../utils/logger'
import { type IKataController, type StatusResponse } from './interfaces'

// ORM - Users Collection
import { createKata, deleteKataById, getAllKatas, getKataById, getKatasByUserId, updateKataById } from '../domain/orm/Kata.orm'

@Route('/api/katas')
@Tags('UserController')
export class KataController implements IKataController {
  /**
   * Endpoint to retrieve the Katas in the Collection 'Katas' of DB
   * @param {string} id Id of kata to retrieve (optional)
   * @returns All katas or kata found by ID
   */
  @Get('/')
  public async getKatas (@Query() page: number, @Query() limit: number, @Query() id?: string, @Query() userId?: string): Promise<KataResponse | IKata> {
    let response: any = {}
    if (id) {
      LogSucces(`[/api/katas] Get Kata By Id: ${id}`)

      response = await getKataById(id)
    } else if (userId) {
      LogSucces(`[/api/katas] Get All Katas By User ID: ${userId}`)

      response = await getKatasByUserId(userId, page, limit)
    } else {
      LogSucces('[/api/katas] Get All Katas Request')

      response = await getAllKatas(page, limit)
    }
    return response
  }

  /**
   * Endpoint to delete the Katas in the Collection 'Katas' of DB
   * @param {string} id Id of kata to delete (optional)
   * @returns message informing if deletion was correct
   */
  @Delete('/')
  public async deleteKata (@Query() id?: string): Promise<StatusResponse> {
    if (id !== undefined) {
      LogSucces(`[/api/katas] Delete Kata By Id: ${id}`)

      const response = await deleteKataById(id)
      if (response.deletedCount === 1) {
        return {
          status: 200,
          message: `Kata with Id: ${id} deleted successfully`
        }
      } else {
        return {
          status: 404,
          message: `Kata with Id: ${id} doesn't exist in DB`
        }
      }
    } else {
      LogWarning('[/api/katas] Delete Kata Without Id')
      const response = {
        status: 400,
        message: 'You must be provide an kata Id'
      }
      return response
    }
  }

  @Put('/')
  public async updateKata (@Query() kata: IKata, @Query() id?: string): Promise<StatusResponse> {
    LogSucces(`[api/katas] Modify Kata: ${JSON.stringify(kata)}`)

    if (id === undefined) {
      LogWarning('[/api/katas] Update kata Request Without ID')
      return {
        status: 400,
        message: 'You must be provide an kata Id'
      }
    }
    const response = await updateKataById(kata, id)
    if (response.modifiedCount === 1) {
      return {
        status: 200,
        message: `Kata with id ${id} updated successfully`
      }
    } else {
      return {
        status: 202,
        message: `No changes in request for kata with id: ${id}`
      }
    }
  }

  @Post('/')
  public async createKata (@Query() kata: IKata): Promise<StatusResponse> {
    let response: any = {}

    if (kata) {
      LogSucces(`[/api/katas] Creating New Kata: ${kata.name}`)
      await createKata(kata).then(r => {
        LogSucces(`[/api/katas] Created New Kata: ${kata.name}`)
        response = {
          status: 201,
          message: `Kata created successfully: ${kata.name}`
        }
      })
    } else {
      LogWarning('[/api/katas] Create needs Katas Entity')
      response = {
        status: 400,
        message: 'Kata not created: You shoud be provide a Kata Entity'
      }
    }
    return response
  }
}
