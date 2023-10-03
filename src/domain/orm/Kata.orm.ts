import { LogError } from '../../utils/logger'
import { kataEntity } from '../entities/Kata.entity'
import { type IKata, type KataResponse } from '../interfaces/IKata.interface'

// CRUD

/**
 * Method to obtain all Katas from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async (page: number, limit: number): Promise<KataResponse | undefined> => {
  try {
    const kataModel = kataEntity()

    const response: KataResponse = {
      katas: [],
      totalPages: 1,
      currentPage: page
    }

    // Search all katas
    await kataModel.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas
      })

    // Count total documents in collection 'Katas'
    await kataModel.countDocuments().then(totalKatas => {
      response.totalPages = Math.ceil(totalKatas / limit)
    })

    return response
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting All Katas: ${error}`)
  }
}

/**
 * Method to obtain Kata by Id from Collection "Katas" in Mongo Server
 */
export const getKataById = async (id: string): Promise<IKata | undefined | null> => {
  try {
    const kataModel = kataEntity()

    // Find Kata by id
    return await kataModel.findById(id)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting Kata By Id: ${error}`)
  }
}

export const getKatasByUserId = async (userId: string, page: number, limit: number): Promise<KataResponse | undefined> => {
  try {
    const kataModel = kataEntity()

    const response: KataResponse = {
      katas: [],
      totalPages: 1,
      currentPage: page
    }

    // Search all katas created by an user
    await kataModel.find({ creator: userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas
      })

    // Count total documents in collection 'Katas'
    await kataModel.countDocuments().then(totalKatas => {
      response.totalPages = Math.ceil(totalKatas / limit)
    })

    return response
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting All Katas By User ID: ${error}`)
  }
}

// - Delete Kata By ID
export const deleteKataById = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    // Delete Kata by id
    return await kataModel.deleteOne({ _id: id })
  } catch (error: any) {
    LogError(`[ORM ERROR]: Deleting Kata By Id: ${error}`)
  }
}

// - Create New Kata
export const createKata = async (kata: IKata): Promise<any> => {
  try {
    const kataModel = kataEntity()

    // Create new Kata
    return await kataModel.create(kata)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Creating New Kata: ${error}`)
  }
}

// - Update Kata By ID
export const updateKataById = async (kata: IKata, id: string): Promise<any> => {
  try {
    const kataModel = kataEntity()

    // Update Kata by id
    return await kataModel.updateOne({ _id: id }, kata)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Updating Kata: ${error}`)
  }
}
