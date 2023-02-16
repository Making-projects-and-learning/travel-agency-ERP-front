/** Interfaces */
import { type User } from './user.interface'

/** Types */
import { type MongoId } from '../vite-env'

export interface Post {
  _id: MongoId
  title: string
  description: string
  imageUrl: string
  owner: User
  likedBy: User[]
  createdAt: Date
}
