import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function NewsletterSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const addSubscriber = useMutation(api.subscribers.create);
  const sendWelcomeEmail = useMutation(api.emails.sendWelcomeEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Add subscriber to database
      await addSubscriber({
        email: formData.email,
        name: formData.name || undefined,
      });

      // Send welcome email
      await sendWelcomeEmail({
        email: formData.email,
        name: formData.name || undefined,
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Failed to subscribe:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">Subscribe to our Newsletter</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Successfully subscribed! Check your email for a welcome message.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Failed to subscribe. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="newsletter-name">Name (optional)</Label>
          <Input
            id="newsletter-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="newsletter-email">Email *</Label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}