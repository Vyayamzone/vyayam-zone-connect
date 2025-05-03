
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-vyayam-purple mb-4">VyayamZone</h3>
            <p className="text-gray-600 mb-4">
              Connect with top fitness professionals in your area. From yoga to personal training, find the perfect match for your wellness journey.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-vyayam-purple"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-vyayam-purple"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.235.585 1.8 1.15.565.565.9 1.132 1.15 1.8.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.15 1.8c-.565.565-1.132.9-1.8 1.15-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 01-1.8-1.15 4.868 4.868 0 01-1.15-1.8c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.868 4.868 0 011.15-1.8A4.903 4.903 0 016.445 2.525c.636-.247 1.363-.416 2.427-.465C9.896 2.013 10.25 2 12.68 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-vyayam-purple"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-vyayam-purple mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-vyayam-purple">Home</Link>
              <a href="/#services" className="text-gray-600 hover:text-vyayam-purple">Services</a>
              <a href="/#about" className="text-gray-600 hover:text-vyayam-purple">About Us</a>
              <a href="/#contact" className="text-gray-600 hover:text-vyayam-purple">Contact</a>
              <a href="/#faq" className="text-gray-600 hover:text-vyayam-purple">FAQs</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-vyayam-purple mb-4">Services</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 hover:text-vyayam-purple">Personal Training</a>
              <a href="#" className="text-gray-600 hover:text-vyayam-purple">Yoga Classes</a>
              <a href="#" className="text-gray-600 hover:text-vyayam-purple">Zumba Sessions</a>
              <a href="#" className="text-gray-600 hover:text-vyayam-purple">Wellness Therapy</a>
              <a href="#" className="text-gray-600 hover:text-vyayam-purple">Group Fitness</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-vyayam-purple mb-4">Contact</h3>
            <div className="flex flex-col space-y-2">
              <p className="text-gray-600">123 Fitness Street, Wellness City</p>
              <p className="text-gray-600">contact@vyayamzone.com</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} VyayamZone. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-600 hover:text-vyayam-purple text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-600 hover:text-vyayam-purple text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
