import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  role: string; // Vai trò yêu cầu (ví dụ: "admin")
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const token = localStorage.getItem("key"); // Lấy token từ localStorage
  const userRole = localStorage.getItem("role"); // Lấy vai trò từ localStorage

  console.log("Token in PrivateRoute:", token); // Kiểm tra token
  console.log("Role in PrivateRoute:", userRole); // Kiểm tra vai trò

  if (!token || userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;