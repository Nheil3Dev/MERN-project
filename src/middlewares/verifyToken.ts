import dotenv from 'dotenv'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

// Config dotenv to read enviroment variables
dotenv.config()

const secret = process.env.SECRETKEY ?? 'SECRETKEY'

/**
 *
 * @param { Request } req Original request previous middleware of verification JWT
 * @param { Respons } res Response to verification of JWT
 * @param { NextFunction } next Next function to be execute
 * @returns Errors of verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  // Check HEADER from Request for 'x-access-token'
  const jwtToken: any = req.headers['x-access-token']

  // Verify if jwt is present
  if (jwtToken === undefined) {
    return res.status(403).send({
      authenticationError: 'Missing JWT in request',
      message: 'Not authorised to consume this endpoint'
    })
  }

  // Verify the token obtained
  jwt.verify(jwtToken, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT verification failed',
        message: 'Failed to verify JWT token in request'
      })
    }
  })

  // Execute Next Function -> Protected
  next()
}
