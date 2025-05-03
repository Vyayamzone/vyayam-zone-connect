
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'trainer') return '/trainer-dashboard';
    return '/user-dashboard';
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-vyayam-gray py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Find Your Perfect <span className="gradient-text">Fitness Match</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Connect with top trainers, yoga instructors, and wellness experts in your area. 
              Your wellness journey starts here.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Button size="lg" asChild>
                  <Link to={getDashboardLink()}>Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <AuthModal>
                    <Button size="lg">Get Started</Button>
                  </AuthModal>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#services">Learn More</a>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-lg shadow-xl overflow-hidden">
              <div className="aspect-w-4 aspect-h-3 bg-vyayam-purple bg-opacity-20 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Fitness class with trainer"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-vyayam-purple rounded-full opacity-20 animate-pulse-soft"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-vyayam-yellow rounded-full opacity-20 animate-pulse-soft"></div>
          </div>
        </div>
      </div>
      
      {/* Wave SVG for transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
