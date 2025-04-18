import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  isAuthenticated: boolean;
}

export const Layout = ({ isAuthenticated }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const handleBookNowClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/booking");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative min-h-screen">
      <header className="relative z-50 px-4 md:px-28 py-6 bg-black/50">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img className="w-[42px] h-7" alt="Logo" src="/logo.svg" />
            <img
              className="w-[41px] h-[13px] ml-1.5"
              alt="Saloon"
              src="/saloon.svg"
            />
          </Link>

          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-['Poppins',Helvetica] font-bold text-[15px] leading-[16px] ${
                  location.pathname === item.path ? "text-[#fbb034]" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated && (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Register
                </Button>
              </>
            )}
            <Button
              onClick={handleBookNowClick}
              className="bg-[#fbb034] hover:bg-[#fbb034]/90 text-black font-['Poppins',Helvetica] font-bold text-[15px] px-6 py-4 rounded-none"
            >
              Book Now
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-black/95 p-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-['Poppins',Helvetica] font-bold text-[15px] ${
                    location.pathname === item.path
                      ? "text-[#fbb034]"
                      : "text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="text-white border-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="text-white border-white hover:bg-white/10"
                  >
                    Register
                  </Button>
                </>
              )}
              <Button
                onClick={() => {
                  handleBookNowClick();
                  setIsMenuOpen(false);
                }}
                className="bg-[#fbb034] hover:bg-[#fbb034]/90 text-black font-['Poppins',Helvetica] font-bold text-[15px] w-full py-4 rounded-none"
              >
                Book Now
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
};