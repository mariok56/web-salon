import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./screens/Home";
import { About } from "./screens/About";
import { Services } from "./screens/Services";
import { Contact } from "./screens/Contact";
import { Shop } from "./screens/Shop";
import { Login } from "./screens/Auth/Login";
import { Register } from "./screens/Auth/Register";
import { Booking } from "./screens/Booking";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useState } from "react";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Layout isAuthenticated={isAuthenticated} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shop" element={<Shop />} />
        <Route path="booking" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Booking />
          </ProtectedRoute>
        } />
        <Route path="login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
      </Route>
    </Routes>
  );
};