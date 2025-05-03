
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-vyayam-softpurple bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="VyayamZone team" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-vyayam-purple rounded-lg opacity-10 transform rotate-6"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-vyayam-yellow rounded-lg opacity-10 transform -rotate-6"></div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About VyayamZone</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2023, VyayamZone was born from a simple idea: make fitness and wellness services more accessible to everyone, anywhere.
            </p>
            <p className="text-gray-700 mb-8">
              Our mission is to bridge the gap between qualified fitness professionals and clients seeking personalized wellness services. We believe that everyone deserves access to quality fitness guidance, regardless of their experience level or location.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 text-vyayam-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Certified Professionals</h4>
                  <p className="text-gray-600 text-sm">All trainers are fully vetted and certified</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-vyayam-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Personalized Approach</h4>
                  <p className="text-gray-600 text-sm">Services tailored to your specific needs</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-vyayam-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Flexible Scheduling</h4>
                  <p className="text-gray-600 text-sm">Book sessions that fit your busy lifestyle</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-vyayam-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Community Support</h4>
                  <p className="text-gray-600 text-sm">Join a community of like-minded individuals</p>
                </div>
              </div>
            </div>
            
            <Button>Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
