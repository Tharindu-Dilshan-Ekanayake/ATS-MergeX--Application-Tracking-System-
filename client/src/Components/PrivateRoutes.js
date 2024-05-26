import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ isAllowed, redirectTo = "/", children }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  // If user is allowed, render the children (or outlet if using nested routes)
  return children ? children : null;
}
