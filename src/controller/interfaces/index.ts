export interface BasicResponse {
  message: string
}

export interface ErrorResponse {
  error: string
  message: string
}

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}
