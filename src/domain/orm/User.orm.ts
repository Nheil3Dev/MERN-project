import { type IAuth, type IUser, type IUserWithId, type UserResponse } from '@/controller/interfaces'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { LogError } from '../../utils/logger'
import { userEntity } from '../entities/User.entity'

// Enviroment variables
import dotenv from 'dotenv'
// Configuration of enviroment variables
dotenv.config()
// Obtain secret key to generate JWT
const secret = process.env.SECRETKEY ?? 'SECRETKEY'

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (page: number, limit: number): Promise<UserResponse | undefined> => {
  try {
    const userModel = userEntity()

    const response: UserResponse = {
      users: [],
      totalPages: 1,
      currentPage: page
    }

    // Search all users
    await userModel.find({})
      .select('name email age')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUserWithId[]) => {
        response.users = users
      })

    // Count total documents in collection 'Users'
    await userModel.countDocuments().then(totalUsers => {
      response.totalPages = Math.ceil(totalUsers / limit)
    })

    return response
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`)
  }
}

/**
 * Method to obtain User by Id from Collection "Users" in Mongo Server
 */
export const getUserById = async (id: string): Promise<IUserWithId | undefined | null> => {
  try {
    const userModel = userEntity()

    // Find user by id
    return await userModel.findById(id).select('name email age').exec()
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting User By Id: ${error}`)
  }
}

// - Delete User By ID
export const deleteUserById = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Delete user by id
    return await userModel.deleteOne({ _id: id })
  } catch (error: any) {
    LogError(`[ORM ERROR]: Deleting User By Id: ${error}`)
  }
}

// - Create New User
export const createUser = async (user: IUser): Promise<any> => {
  try {
    const userModel = userEntity()

    // Create new User
    return await userModel.create(user)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Creating New User: ${error}`)
  }
}

// - Update User By ID
export const updateUserById = async (user: IUser, id: string): Promise<any> => {
  try {
    const userModel = userEntity()

    // Update User by id
    return await userModel.updateOne({ _id: id }, user)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Updating User: ${error}`)
  }
}

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create / Insert new User
    return await userModel.create(user)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Registring User: ${error}`)
  }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    let userFound: IUserWithId | undefined
    let token: string | undefined

    // Check if user exits by unique email
    await userModel.findOne({ email: auth.email })
      .then((user: any) => {
        userFound = user
      })
      .catch(error => {
        LogError('[ORM ERROR]: User Not Found')
        throw new Error(`[ERROR AUTHENTICATION IN ORM]: User Not Found: ${error}`)
      })
    if (userFound) {
      // Use Bcrypt to compare password
      const validPassword = bcrypt.compareSync(auth.password, userFound.password)

      // Check if password is valid
      if (!validPassword) {
        LogError('[ORM ERROR]: Invalid Password')
        throw new Error('[ERROR AUTHENTICATION IN ORM]: Invalid Password')
      }
      // Genarate our JWT
      token = jwt.sign({ email: userFound.email }, secret, {
        expiresIn: '24h'
      })

      return {
        user: userFound,
        token
      }
    }
  } catch (error: any) {
    LogError(`[ORM ERROR]: Logging in User: ${error}`)
  }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {

}
