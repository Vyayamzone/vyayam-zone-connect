
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/e4fc0f62-da78-4bf7-83a3-01fd5ebc9dfa.png" 
                alt="Vyayam Zone" 
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-xl font-bold">Vyayam Zone</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              India's premier fitness platform connecting you with certified trainers, 
              yoga instructors, and wellness experts for your perfect fitness journey.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={Facebook} label="Facebook" />
              <SocialLink href="#" icon={Instagram} label="Instagram" />
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <div className="flex flex-col space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink href="/#services" label="Services" />
              <FooterLink href="/#about" label="About Us" />
              <FooterLink href="/#contact" label="Contact" />
              <FooterLink href="/#faq" label="FAQs" />
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Services</h3>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#" label="Personal Training" />
              <FooterLink href="#" label="Yoga Classes" />
              <FooterLink href="#" label="Zumba Sessions" />
              <FooterLink href="#" label="Wellness Therapy" />
              <FooterLink href="#" label="Group Fitness" />
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Get in Touch</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300">123 Fitness Street, Wellness City, Mumbai 400001</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:contact@vyayamzone.com" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">
                  contact@vyayamzone.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Vyayam Zone. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex space-x-6">
            <FooterLink href="#" label="Privacy Policy" small />
            <FooterLink href="#" label="Terms of Service" small />
            <FooterLink href="#" label="Cookie Policy" small />
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to?: string;
  href?: string;
  label: string;
  small?: boolean;
}

const FooterLink = ({ to, href, label, small = false }: FooterLinkProps) => {
  const className = `${
    small ? 'text-sm' : ''
  } text-slate-300 hover:text-blue-400 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-200 hover:after:w-full`;

  if (to) {
    return <Link to={to} className={className}>{label}</Link>;
  }

  return <a href={href} className={className}>{label}</a>;
};

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => (
  <a
    href={href}
    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-200 group"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors duration-200" />
  </a>
);

export default Footer;
