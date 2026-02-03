import ContactForm from '../components/ContactForm';
import NewsletterSignup from '../components/NewsletterSignup';
import AdminDashboard from '../components/AdminDashboard';
import { useState } from 'react';
import { Button } from '../components/ui/button';

export default function ContactDemo() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Convex + Resend Integration Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Test the contact form and newsletter signup powered by Convex and Resend
          </p>
          <Button 
            onClick={() => setShowAdmin(!showAdmin)}
            variant="outline"
          >
            {showAdmin ? 'Hide Admin Dashboard' : 'Show Admin Dashboard'}
          </Button>
        </div>

        {showAdmin ? (
          <AdminDashboard />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ContactForm />
            <NewsletterSignup />
          </div>
        )}
      </div>
    </div>
  );
}