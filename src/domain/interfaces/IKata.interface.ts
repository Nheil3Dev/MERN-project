export enum KataLevel {
  BASIC = 'Basic',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface IKata {
  name: string
  description: string
  level: KataLevel
  intents: number
  stars: number
  creator: string // ID of user
  participants: string[]
  solution: string
}

export interface KataResponse {
  katas: IKata[]
  totalPages: number
  currentPage: number
}
