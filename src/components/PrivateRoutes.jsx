import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () => {
  const {isAdmin} = useSelector((state) => state.auth)
  return (
    isAdmin ? <Outlet /> : <Navigate to='/' />
  )
}

export default PrivateRoutes
