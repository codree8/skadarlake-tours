import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const email = localStorage.getItem("email");

    return email === "admin@gmail.com" ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

