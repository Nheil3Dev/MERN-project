import type mongoose from 'mongoose'

/**
 * Basic JSON response for Controllers
 */
export interface BasicResponse {
  message: string
}

export interface StatusResponse extends BasicResponse {
  status: number
}

/**
 * Error JSON response for Controllers
 */
export interface ErrorResponse extends BasicResponse {
  error: string
}

export interface AuthResponse extends BasicResponse {
  token: string
}

export interface IAuth {
  email: string
  password: string
}

export interface IUser extends IAuth {
  name: string
  age: number
}

export interface IUserWithId extends IUser {
  _id: mongoose.Types.ObjectId
}

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  // Read all users from DB || Find user by ID (ObjectID)
  getUsers: (id?: string) => Promise<any>
  // Delete user by id
  deleteUser: (id?: string) => Promise<any>
  // Update user
  updateUser: (user: IUser, id: string) => Promise<any>
}

export interface IAuthController {
  // Register user
  resgisterUser: (user: IUser) => Promise<any>
  // Login user
  loginUser: (auth: IAuth) => Promise<any>
  // Logout user
  logoutUser: () => Promise<any>
}
