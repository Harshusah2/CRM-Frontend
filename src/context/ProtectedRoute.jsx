import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) return null // or a spinner
  return user ? <Outlet /> : <Navigate to="/account/signin" replace />
}