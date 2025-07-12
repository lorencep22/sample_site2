import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const Website = lazy(() => import("./components/Website"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const UserProfile = lazy(() => import("./components/UserProfile"));

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense
          fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Website />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
