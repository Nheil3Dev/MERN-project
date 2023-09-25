import { LogSucces } from '../utils/logger'
import { type BasicResponse, type IHelloController } from './interfaces'

export class HelloController implements IHelloController {
  public async getMessage (name?: string): Promise<BasicResponse> {
    LogSucces('[/api/hello] Get Request')

    return {
      message: `Hello, ${name ?? 'Anonimous!'}`
    }
  }
}
