import { Get, Post, Query, Route, Tags } from 'tsoa'
import { getUserById, loginUser, logoutUser, registerUser } from '../domain/orm/User.orm'
import { LogSucces, LogWarning } from '../utils/logger'
import { type AuthResponse, type BasicResponse, type ErrorResponse, type IAuth, type IAuthController, type IUser } from './interfaces'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async resgisterUser (@Query() user: IUser): Promise<BasicResponse> {
    let response: BasicResponse = {
      message: ''
    }

    if (user) {
      LogSucces(`[/api/auth/register] Register New User: ${user.name}`)

      await registerUser(user)
        .then(r => {
          if (!r) {
            LogWarning(`[api/auth/register] Duplicate User: ${user.name}`)

            response = {
              message: 'Duplicate User'
            }
          } else {
            LogSucces(`[/api/auth/register] Created User: ${user.name}`)

            response = {
              message: `User Created Successfully: ${user.name}`
            }
          }
        })
    } else {
      LogWarning('[/api/auth/register] Register Needs User Entity')

      response = {
        message: 'You must be provide all data to create new user'
      }
    }
    return response
  }

  @Post('/login')
  public async loginUser (@Query() auth: IAuth): Promise<AuthResponse | ErrorResponse> {
    let response: AuthResponse | ErrorResponse | undefined

    if (auth) {
      LogSucces(`[/api/auth/login] Auth User: ${JSON.stringify(auth)}`)
      const data = await loginUser(auth)
      response = {
        token: data.token,
        message: `Welcome, ${data.user.name}`
      }
      // await loginUser(auth)
      //   .then(r => {
      //     LogSucces(`[/api/auth/login] Logged User: ${auth.email}`)
      //     response = {
      //       message: `User Logged In Successfuly: ${auth.email}`,
      //       token: r.token // JWT generated for logged in user
      //     }
      //   })
    } else {
      LogWarning('[/api/auth/login] Login Needs Auth Entity')
      response = {
        message: 'You must be provide a valid email & password to login',
        error: 'Email & password are needed'
      }
    }
    return response
  }

  /**
   * Endpoint to retrieve the User in the Collection 'Users' of DB
   * Middleware: Validate JWT
   * In headers you must add the x-access-token with a valid JWT
   * @param {string} id Id of user to retrieve
   * @returns User data
   */
  @Get('/me')
  public async getUserData (@Query() id: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSucces(`[/api/auth/me] Get User's Data By ID: ${id}`)
      response = await getUserById(id)
      // Remove the password
      response.password = ''
    }
    return response
  }

  @Post('/logout')
  public async logoutUser (): Promise<any> {
    LogSucces('[/api/auth/logout] Logout User')

    const response = await logoutUser()
    return response
  }
}
