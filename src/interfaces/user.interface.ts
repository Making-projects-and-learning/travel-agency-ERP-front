/** Interfaces */
import { type Post } from './post.interface'
import { type Room } from './room.interface'

/** Types */
import { type MongoId } from '../vite-env'

export interface User {
  _id: MongoId
  name: string
  username: string
  email: string
  password: string
  description: string
  posts: Post[]
  friends: User[]
  groups: Room[]
  individualRooms: Room[]
  likedPosts: Post[]
  online: boolean
}
