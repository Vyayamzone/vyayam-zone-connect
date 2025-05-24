
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Users, Award, Clock } from "lucide-react";

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'trainer') return '/trainer-dashboard';
    return '/user-dashboard';
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-soft"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-soft" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Award className="w-4 h-4 mr-2" />
              India's Premier Fitness Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent">
                Fitness Match
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
              Connect with certified trainers, yoga instructors, and wellness experts. 
              Transform your fitness journey with personalized guidance and expert support.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center text-slate-600">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">10,000+ Users</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Award className="w-5 h-5 mr-2 text-cyan-600" />
                <span className="font-semibold">500+ Trainers</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {isAuthenticated ? (
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group">
                  <Link to={getDashboardLink()}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
              ) : (
                <>
                  <AuthModal>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group">
                      Get Started Free
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </AuthModal>
                  <Button variant="outline" size="lg" asChild className="border-slate-300 hover:bg-slate-50 group">
                    <a href="#services" className="flex items-center">
                      <Play className="mr-2 w-4 h-4" />
                      Watch Demo
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Right Content */}
          <div className="lg:w-1/2 relative">
            <div className="relative max-w-lg mx-auto">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Fitness training session"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-slate-100 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Certified</p>
                    <p className="text-sm text-slate-600">Trainers</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-slate-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">10k+</p>
                    <p className="text-sm text-slate-600">Happy Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
