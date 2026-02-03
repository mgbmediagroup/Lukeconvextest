import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { Footer as FooterUI } from '@/app/components/ui/footer';

const socialLinks = [
  { icon: <Facebook size={18} />, label: 'Facebook', href: 'https://facebook.com/mgbdesign' },
  { icon: <Youtube size={18} />, label: 'Youtube', href: 'https://youtube.com/mgbdesign' },
  { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com/company/mgbdesign' },
  { icon: <Instagram size={18} />, label: 'Instagram', href: 'https://instagram.com/mgbdesign' },
];

const usefulLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Privacy Policy', href: '#privacy' },
];

export function Footer() {
  /**
   * A mock function to simulate an API call for newsletter subscription.
   * Returns a promise that resolves to true (success) or false (failure).
   */
  const handleNewsletterSubscribe = async (email: string): Promise<boolean> => {
    console.log(`Subscribing ${email}...`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Simulate a 90% success rate
    if (Math.random() > 0.1) {
      console.log(`Successfully subscribed ${email}!`);
      return true;
    } else {
      console.error(`Failed to subscribe ${email}.`);
      return false;
    }
  };

  return (
    <FooterUI
      logoSrc="https://via.placeholder.com/120x40/ffffff/000000?text=MGB"
      companyName="MGB Design"
      description="Empowering businesses with intelligent design solutions. We craft digital experiences that resonate."
      usefulLinks={usefulLinks}
      socialLinks={socialLinks}
      newsletterTitle="Subscribe to our newsletter"
      onSubscribe={handleNewsletterSubscribe}
    />
  );
}