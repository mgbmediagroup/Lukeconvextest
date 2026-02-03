import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function AdminMessages() {
  const messages = useQuery(api.emails.getMessages);

  if (!messages) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Contact Messages ({messages.length})</h1>
        
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message._id} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{message.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  message.status === 'sent' ? 'bg-green-100 text-green-800' :
                  message.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {message.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{message.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{new Date(message.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              {message.subject && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Subject</p>
                  <p className="font-medium">{message.subject}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Message</p>
                <div className="bg-gray-50 p-4 rounded border">
                  <pre className="whitespace-pre-wrap text-sm">{message.message}</pre>
                </div>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No messages yet</p>
              <p className="text-gray-400">Messages from the contact form will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}