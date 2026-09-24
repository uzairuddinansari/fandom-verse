import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const access = localStorage.getItem("adminAccess");

  return access === "true" ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;