// components/ui/footer.tsx

import React, { useState, type FC, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

/**
 * Props for the Footer component.
 */
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** The source URL for the company logo. */
  logoSrc: string;
  /** The name of the company, displayed next to the logo. */
  companyName?: string;
  /** A short description of the company. */
  description?: string;
  /** An array of objects for generating useful links. */
  usefulLinks?: { label: string; href: string }[];
  /** An array of objects for generating social media links. */
  socialLinks?: { label: string; href: string; icon: ReactNode }[];
  /** The title for the newsletter subscription section. */
  newsletterTitle?: string;
  /** Async function to handle email subscription. Should return `true` for success and `false` for failure. */
  onSubscribe?: (email: string) => Promise<boolean>;
}

/**
 * A responsive and theme-adaptive footer component with a newsletter subscription form.
 * Designed following shadcn/ui and 21st.dev best practices.
 */
export const Footer: FC<FooterProps> = ({
  logoSrc,
  companyName = 'MGB Design',
  description = 'Empowering businesses with intelligent design solutions, crafted for emotional experiences.',
  usefulLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Privacy Policy', href: '#privacy' },
  ],
  socialLinks = [],
  newsletterTitle = 'Subscribe to our newsletter',
  onSubscribe,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !onSubscribe || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubscribe(email);

    setSubscriptionStatus(success ? 'success' : 'error');
    setIsSubmitting(false);

    if (success) {
      setEmail('');
    }

    // Reset the status message after 3 seconds
    setTimeout(() => {
      setSubscriptionStatus('idle');
    }, 3000);
  };

  return (
    <footer className={cn('bg-black text-white', className)} {...props}>
      <div className="container mx-auto grid grid-cols-1 gap-8 px-6 lg:px-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Company Info */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt={`${companyName} Logo`} className="h-12 w-12" />
            <span className="text-xl font-semibold">{companyName}</span>
          </div>
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        {/* Useful Links */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-semibold">Useful Links</h3>
          <ul className="space-y-2">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-semibold">Follow Us</h3>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-base font-semibold">{newsletterTitle}</h3>
          <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
            <div className="relative">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                required
                aria-label="Email for newsletter"
                className="pr-28 bg-white/10 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button
                type="submit"
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                className="absolute right-0 top-0 h-full rounded-l-none px-4 bg-white text-black hover:bg-gray-200"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {/* Advanced Animation Overlay */}
            {(subscriptionStatus === 'success' || subscriptionStatus === 'error') && (
              <div
                key={subscriptionStatus} // Re-trigger animation on status change
                className="animate-in fade-in absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 text-center backdrop-blur-sm"
              >
                {subscriptionStatus === 'success' ? (
                  <span className="font-semibold text-green-500">Subscribed! 🎉</span>
                ) : (
                  <span className="font-semibold text-red-500">Failed. Try again.</span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom section - Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <span>©{new Date().getFullYear()} {companyName}. All rights reserved</span>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};