import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function AdminDashboard() {
  const messages = useQuery(api.messages.list);
  const subscribers = useQuery(api.subscribers.list);

  if (!messages || !subscribers) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Messages Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Messages ({messages.length})</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{message.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    message.status === 'sent' ? 'bg-green-100 text-green-800' :
                    message.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {message.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                {message.subject && (
                  <p className="text-sm font-medium mb-2">Subject: {message.subject}</p>
                )}
                <p className="text-sm text-gray-800 mb-2">{message.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-gray-500 text-center py-8">No messages yet</p>
            )}
          </div>
        </div>

        {/* Subscribers Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Newsletter Subscribers ({subscribers.length})</h2>
          <div className="space-y-4">
            {subscribers.map((subscriber) => (
              <div key={subscriber._id} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{subscriber.name || 'Anonymous'}</h3>
                    <p className="text-sm text-gray-600">{subscriber.email}</p>
                    <p className="text-xs text-gray-500">
                      Subscribed: {new Date(subscriber.subscribedAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            ))}
            {subscribers.length === 0 && (
              <p className="text-gray-500 text-center py-8">No subscribers yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}