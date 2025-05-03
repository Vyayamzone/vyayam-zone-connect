
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I find the right trainer for me?",
    answer:
      "VyayamZone matches you with trainers based on your fitness goals, preferred workout style, location, and availability. You can browse trainer profiles, read reviews, and even book trial sessions before committing to a long-term arrangement.",
  },
  {
    question: "What qualifications do your fitness professionals have?",
    answer:
      "All fitness professionals on VyayamZone are certified in their respective fields. We verify credentials, experience, and conduct background checks. Many of our trainers hold certifications from nationally recognized organizations like ACE, NASM, or specialized yoga and wellness certifications.",
  },
  {
    question: "How much do fitness sessions typically cost?",
    answer:
      "Session costs vary based on the type of service, trainer experience, location, and session duration. On average, personal training sessions range from $50-$100, yoga sessions from $40-$80, and wellness therapy from $60-$120. Many trainers offer package discounts for multiple sessions.",
  },
  {
    question: "Can I cancel or reschedule a booked session?",
    answer:
      "Yes, you can reschedule or cancel sessions according to the trainer's policy. Many allow changes up to 24-48 hours before the scheduled time. Check each trainer's specific cancellation policy on their profile page.",
  },
  {
    question: "Do trainers come to my home or do I go to them?",
    answer:
      "Both options are available! Many trainers offer in-home sessions, sessions at their own facilities, or sessions at partner gyms. You can filter your trainer search based on your preferred location type.",
  },
  {
    question: "How do I become a trainer on VyayamZone?",
    answer:
      "Fitness professionals can sign up through our 'Become a Trainer' page. You'll need to submit your certifications, experience details, and pass our verification process. Once approved, you can create your profile and start accepting clients.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-16 bg-vyayam-gray bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about VyayamZone's services and how
            our platform works.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-vyayam-purple">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact"
            className="text-vyayam-purple hover:underline font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
