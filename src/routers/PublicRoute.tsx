/** Libraries */
import { Navigate } from 'react-router-dom'

/** Interfaces */
interface AppProps {
  children: JSX.Element
  isAutenticated: boolean
}

export const PublicRoute = ({ children, isAutenticated }: AppProps) => {
  return !isAutenticated ? children : <Navigate to="/" />
}
