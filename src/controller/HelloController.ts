import { Get, Query, Route, Tags } from 'tsoa'
import { LogSucces } from '../utils/logger'
import { type BasicResponse, type IHelloController } from './interfaces'

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
  /**
   * Endpoint to retreive a Message "Hello {name}" in JSON
   * @param { string | undefined } name Name of user to be greeted
   * @returns { BasicResponse } Promise of BasicResponse
   */
  @Get('/')
  public async getMessage (@Query() name?: string): Promise<BasicResponse> {
    LogSucces('[/api/hello] Get Request')

    return {
      message: `Hello, ${name ?? 'Anonimous!'}`
    }
  }
}
