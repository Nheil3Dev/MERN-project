import mongoose from 'mongoose'

export const userEntity = (): any => {
  const userSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      age: Number
    }
  )

  return mongoose.model('Users', userSchema)
}
