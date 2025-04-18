import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/navbar";
import { Home } from "../screens/Home";
import { About } from "../screens/About";
import { Services } from "../screens/Services";
import { Contact } from "../screens/Contact";
import { Shop } from "../screens/Shop";
import { Login } from "../screens/Auth/Login";
import { Register } from "../screens/Auth/Register";
import { Booking } from "../screens/Booking";
import { ProtectedRoute } from "../components/ProtectedRoute";



type AppRoutesProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppRoutes = ({ isAuthenticated, setIsAuthenticated }: AppRoutesProps) => (
  <Routes>
    <Route path="/" element={<Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
      <Route index element={<Home isAuthenticated={isAuthenticated} />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} />
      <Route path="shop" element={<Shop />} />
      <Route
        path="booking"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
      <Route path="register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
    </Route>
  </Routes>
);