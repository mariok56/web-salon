import { useState, useEffect } from "react";
import { AppRoutes } from "./routes/router";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) setIsAuthenticated(true);
  }, []);

  return <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />;
};
