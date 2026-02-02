import { useState } from 'react';
import { Send, Mail, ArrowRight } from 'lucide-react';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, label: 'TikTok', href: 'https://tiktok.com/@mgbdesign' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/mgbdesign' },
  { icon: Facebook, label: 'X', href: 'https://x.com/mgbdesign' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/mgbdesign' },
  { icon: Youtube, label: 'Youtube', href: 'https://youtube.com/mgbdesign' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/mgbdesign' },
];

const services = ['UI/UX', 'Development', 'Branding', '3D Animation'];

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    interests: [] as string[],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ 
        fullName: '', 
        company: '', 
        email: '', 
        phone: '', 
        interests: [], 
        message: '' 
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleInterest = (service: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(service)
        ? formData.interests.filter(s => s !== service)
        : [...formData.interests, service]
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column */}
          <div className="flex flex-col justify-between min-h-[500px]">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-orange-500 text-sm font-medium">• Connect with us!</p>
                <h2 className="text-4xl md:text-5xl font-normal leading-tight text-black">
                  Turn Your Vision Into an Experience That Lasts
                </h2>
              </div>

              <div className="w-16 border-t border-black/20" />

              <a 
                href="mailto:hello@mgbdesign.com" 
                className="inline-flex items-center gap-2 text-sm text-black hover:text-gray-600 transition-colors"
              >
                <Mail size={16} />
                <span>hello@mgbdesign.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-12">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-8">
            <h3 className="text-3xl font-normal text-black text-center">Let's talk</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name and Company */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder="Company"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder="Phone"
                  />
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="block text-sm text-black/50">I'm interested in</label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleInterest(service)}
                      className={`px-5 py-2 text-sm transition-all ${
                        formData.interests.includes(service)
                          ? 'bg-black text-white border border-black'
                          : 'bg-transparent border border-black/20 text-black hover:border-black'
                      }`}
                      style={{ borderRadius: '20px' }}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about your project!"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-all ${
                    isSubmitted
                      ? 'bg-green-600 text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ borderRadius: '30px' }}
                >
                  {isSubmitting ? (
                    'SENDING...'
                  ) : isSubmitted ? (
                    'MESSAGE SENT!'
                  ) : (
                    <>
                      SEND
                      <ArrowRight size={16} className="text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}