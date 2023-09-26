/**
 * Basic JSON response for Controllers
 */
export interface BasicResponse {
  message: string
}

/**
 * Error JSON response for Controllers
 */
export interface ErrorResponse {
  error: string
  message: string
}

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}
