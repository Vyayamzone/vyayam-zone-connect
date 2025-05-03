
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated, user } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (user?.role === "trainer") {
      return <Navigate to="/trainer-dashboard" />;
    } else {
      return <Navigate to="/user-dashboard" />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-vyayam-purple">
          VyayamZone
        </a>
        <Button variant="outline" asChild>
          <a href="/">Back to Home</a>
        </Button>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {showLogin ? "Welcome Back!" : "Join VyayamZone"}
              </h1>
              <p className="text-gray-600 mb-8">
                {showLogin
                  ? "Log in to access your fitness journey and connect with top professionals."
                  : "Create an account to find your perfect fitness match and start your wellness journey today."}
              </p>
              <div className="relative">
                <div className="h-64 w-64 mx-auto md:mx-0 bg-vyayam-softpurple rounded-full opacity-30 animate-pulse-soft"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="VyayamZone" 
                    className="h-56 w-56 object-cover rounded-full border-4 border-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            {showLogin ? (
              <LoginForm onToggleForm={() => setShowLogin(false)} />
            ) : (
              <SignupForm onToggleForm={() => setShowLogin(true)} />
            )}
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} VyayamZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Auth;
