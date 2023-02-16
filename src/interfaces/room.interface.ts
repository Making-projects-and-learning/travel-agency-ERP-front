/** Interfaces */
import { type User } from './user.interface'
import { type Message } from './message.interface'

/** Types */
import { type MongoId } from '../vite-env'

export interface Room {
  _id: MongoId
  users: User[]
  messages: Message[]
}
