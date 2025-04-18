import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Footer } from "./footer/footer";

interface LayoutProps {
  isAuthenticated: boolean;
}

export const Layout = ({ isAuthenticated }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when changing route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-black py-3" 
            : "bg-black/50 py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
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
                className={`font-['Poppins',Helvetica] font-bold text-[15px] leading-[16px] transition-colors ${
                  location.pathname === item.path ? "text-[#fbb034]" : "text-white hover:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
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
            ) : (
              <Button
                onClick={() => {
                  // Add logout functionality
                  // For now just redirect to home
                  navigate("/");
                }}
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Logout
              </Button>
            )}
            <Button
              onClick={handleBookNowClick}
              className="bg-[#fbb034] hover:bg-[#fbb034]/90 text-black font-['Poppins',Helvetica] font-bold text-[15px] px-6 py-4 rounded-none"
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 p-6 md:hidden">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-['Poppins',Helvetica] font-bold text-[15px] ${
                    location.pathname === item.path
                      ? "text-[#fbb034]"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800">
                {!isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="outline"
                      className="w-full mb-3 text-white border-white hover:bg-white/10"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate("/register")}
                      variant="outline"
                      className="w-full mb-3 text-white border-white hover:bg-white/10"
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      // Add logout functionality
                      navigate("/");
                    }}
                    variant="outline"
                    className="w-full mb-3 text-white border-white hover:bg-white/10"
                  >
                    Logout
                  </Button>
                )}
                <Button
                  onClick={handleBookNowClick}
                  className="w-full bg-[#fbb034] hover:bg-[#fbb034]/90 text-black font-['Poppins',Helvetica] font-bold text-[15px] py-4 rounded-none"
                >
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-24"></div>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};