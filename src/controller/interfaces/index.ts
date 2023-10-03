import type mongoose from 'mongoose'
import { type IKata } from '../../domain/interfaces/IKata.interface'

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

export interface UserResponse {
  users: IUserWithId[]
  totalPages: number
  currentPage: number
}

export interface IAuth {
  email: string
  password: string
}

export interface IUser extends IAuth {
  name: string
  age: number
  katas: IKata[]
}

export interface IUserWithId extends IUser {
  _id: mongoose.Types.ObjectId
}

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  // Read all users from DB || Find user by ID (ObjectID)
  getUsers: (page: number, limit: number, id?: string) => Promise<any>
  // Get Katas of user
  getKatas: (page: number, limit: number, id: string) => Promise<any>
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

export interface IKataController {
  // Read all users from DB || Find user by ID (ObjectID)
  getKatas: (page: number, limit: number, id?: string, userId?: string) => Promise<any>
  // Delete user by id
  deleteKata: (id?: string) => Promise<any>
  // Update user
  updateKata: (kata: IKata, id: string) => Promise<any>
  // Create new kata
  createKata: (kata: IKata) => Promise<any>
}
