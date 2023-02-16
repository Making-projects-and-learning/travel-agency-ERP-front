/** Interfaces */
import { type User } from './user.interface'

/** Types */
import { type MongoId } from '../vite-env'

export interface Message {
  _id: MongoId
  from: User
  to: User[]
  body: string
  createdAt: Date
}
