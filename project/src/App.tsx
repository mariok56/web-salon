import { useEffect } from "react";
import { AppRoutes } from "./routes/router";
import { useAuthStore } from "./store/authStore";

// Helper function to handle legacy token migration
const migrateLegacyAuth = async () => {
  const legacyToken = localStorage.getItem("auth_token");
  if (legacyToken) {
    try {
      // Fetch credentials securely (e.g., from environment variables or a secure API)
      const email = process.env.REACT_APP_LEGACY_EMAIL || "default@example.com";
      const password = process.env.REACT_APP_LEGACY_PASSWORD || "defaultPassword";

      // Perform login using the auth store
      await useAuthStore.getState().login({ email, password });

      // Clean up old storage items
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    } catch (error) {
      console.error("Failed to migrate legacy auth:", error);
    }
  }
};

export const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      migrateLegacyAuth();
    }
  }, [isAuthenticated]);

  return <AppRoutes />;
};
