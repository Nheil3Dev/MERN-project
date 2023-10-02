import { Delete, Get, Put, Query, Route, Tags } from 'tsoa'
import { LogSucces, LogWarning } from '../utils/logger'
import { type IUser, type IUserController, type IUserWithId } from './interfaces'

// ORM - Users Collection
import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retrieve the Users in the Collection 'Users' of DB
   * @param {string} id Id of user to retrieve (optional)
   * @returns All user or user found by ID
   */
  @Get('/')
  public async getUsers (@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<IUserWithId[] | IUserWithId | undefined | null> {
    let response: any = {}
    if (id !== undefined) {
      LogSucces(`[/api/users] Get User By Id: ${id} Request`)

      response = await getUserById(id)
    } else {
      LogSucces('[/api/users] Get All Users Request')

      response = await getAllUsers(page, limit)
    }
    return response
  }

  /**
   * Endpoint to delete the Users in the Collection 'Users' of DB
   * @param {string} id Id of user to delete (optional)
   * @returns message informing if deletion was correct
   */
  @Delete('/')
  public async deleteUser (@Query() id?: string): Promise<any> {
    if (id !== undefined) {
      LogSucces(`[/api/users] Delete User By Id: ${id} Request`)

      const response = await deleteUserById(id)
      if (response.deletedCount === 1) {
        return {
          status: 200,
          message: `User with Id: ${id} deleted successfully`
        }
      } else {
        return {
          status: 404,
          message: `User with Id: ${id} doesn't exist in DB`
        }
      }
    } else {
      LogWarning('[/api/users] Delete User Without Id')
      const response = {
        status: 400,
        message: 'You must be provide an user Id'
      }
      return response
    }
  }

  @Put('/')
  public async updateUser (@Query() user: IUser, @Query() id?: string): Promise<any> {
    LogSucces(`[api/users] Modify User: ${JSON.stringify(user)}`)

    if (id === undefined) {
      LogWarning('[/api/users] Update User Request Without ID')
      return {
        status: 400,
        message: 'You must be provide an user Id'
      }
    }
    const response = await updateUserById(user, id)
    if (response.modifiedCount === 1) {
      return {
        status: 200,
        message: `User with id ${id} updated successfully`
      }
    } else {
      return {
        status: 202,
        message: `No changes in request for user with id: ${id}`
      }
    }
  }
}
