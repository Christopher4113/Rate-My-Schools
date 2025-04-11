import React, {ReactNode} from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
interface PrivateRouteProps {
    children: ReactNode;
}
interface JwtPayload {
    sub: string;
    exp: number;
    isAdmin?: boolean;
}
const AdminRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem('token');
  let isAdmin: boolean = false;
  if (token) {
    try {
        const decoded = jwtDecode<JwtPayload>(token)
        isAdmin = decoded.isAdmin ?? false;
    } catch (error: any) {
        console.error("Invalid token ", error)
    }
  }
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};

export default AdminRoute