
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'trainer') return '/trainer-dashboard';
    return '/user-dashboard';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/e4fc0f62-da78-4bf7-83a3-01fd5ebc9dfa.png" 
                alt="Vyayam Zone" 
                className="h-10 w-10 rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
              Vyayam Zone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="bg-white/80 border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                    >
                      {user?.name || 'Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border-slate-200">
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardLink()} className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 hover:text-red-700">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <AuthModal variant="outline" mode="login">
                    <Button 
                      variant="outline" 
                      className="bg-white/80 border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                    >
                      Login
                    </Button>
                  </AuthModal>
                  <AuthModal mode="signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                      Sign Up
                    </Button>
                  </AuthModal>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <NavLinks isMobile />
              {isAuthenticated ? (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    className="px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200"
                  >
                    Profile
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={logout} 
                    className="mx-4 mt-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4 mt-2">
                  <AuthModal mode="signup">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </AuthModal>
                  <AuthModal mode="login" variant="outline">
                    <Button variant="outline" className="w-full border-slate-200 hover:bg-blue-50 hover:border-blue-200">
                      Login
                    </Button>
                  </AuthModal>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

interface NavLinksProps {
  isMobile?: boolean;
}

const NavLinks = ({ isMobile = false }: NavLinksProps) => {
  const linkClass = isMobile
    ? "block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200"
    : "text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full";

  const links = [
    { href: '/#services', label: 'Services' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
    { href: '/#faq', label: 'FAQ' },
  ];

  return (
    <>
      {links.map((link) => (
        <a key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </a>
      ))}
    </>
  );
};

export default Navbar;
