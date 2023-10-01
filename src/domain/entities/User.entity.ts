import mongoose from 'mongoose'
import { type IUser, type IUserWithId } from '../../controller/interfaces'

export const userEntity = (): mongoose.Model<IUser | IUserWithId> => {
  // const userSchema = new mongoose.Schema(
  //   {
  //     name: String,
  //     email: String,
  //     age: Number
  //   }
  // )

  const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }
  })

  // Si ya está creado el modelo devolvemos el modelo, y si no lo creamos
  // Aunque aquí el modelo se declare 'Users' en la bd la collección debe ir todo minúscula
  return mongoose.models.Users ?? mongoose.model('Users', userSchema)
}

/**
 *
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents => 200 (Entity) / 204 (No return)
 *
 */
