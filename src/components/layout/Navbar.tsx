
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
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-vyayam-purple' : 'text-vyayam-purple'}`}>
              VyayamZone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks isScrolled={isScrolled} />
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {user?.name || 'Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardLink()}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <AuthModal variant="outline">
                    <Button variant="outline">Login</Button>
                  </AuthModal>
                  <AuthModal>
                    <Button>Sign Up</Button>
                  </AuthModal>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-vyayam-purple" />
            ) : (
              <Menu className="h-6 w-6 text-vyayam-purple" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <NavLinks isMobile isScrolled={isScrolled} />
              {isAuthenticated ? (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    className="px-4 py-2 text-vyayam-purple hover:bg-vyayam-purple hover:bg-opacity-10 rounded-md"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="px-4 py-2 text-vyayam-purple hover:bg-vyayam-purple hover:bg-opacity-10 rounded-md"
                  >
                    Profile
                  </Link>
                  <Button variant="outline" onClick={logout} className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <AuthModal>
                    <Button className="w-full">Sign Up</Button>
                  </AuthModal>
                  <AuthModal variant="outline">
                    <Button variant="outline" className="w-full">Login</Button>
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
  isScrolled?: boolean;
}

const NavLinks = ({ isMobile = false, isScrolled = false }: NavLinksProps) => {
  const textColorClass = isScrolled ? 'text-foreground' : 'text-foreground';
  const linkClass = isMobile
    ? `block px-4 py-2 ${textColorClass} hover:text-vyayam-purple`
    : `${textColorClass} hover:text-vyayam-purple`;

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
