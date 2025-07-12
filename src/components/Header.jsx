import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChefHat, Settings, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthModal from "./AuthModal";
import CartModal from "./CartModal";

function Header() {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div whileHover={{ scale: 1.05 }} className="flex ">
            <a href="/#home" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-800">
                KitchenCraft
              </span>
            </a>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Home
            </motion.a>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Products
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Contact
            </motion.a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCartModal(true)}
              className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </motion.button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, {user.displayName || user.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Logout</span>
                </motion.button>
                <Link to="/profile">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:block">Profile</span>
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthClick("login")}
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthClick("signup")}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </motion.button>
              </div>
            )}

            {/* Admin Link */}
            {/* <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/admin"
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:block">Admin</span>
              </Link>
            </motion.div> */}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
      />
    </motion.header>
  );
}

export default Header;
