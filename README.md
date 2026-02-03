
# Luke Convex test

This is a code bundle for Luke Convex test with Convex and Resend integration. The original project is available at https://www.figma.com/design/9hovsK5bQgzgPf7yVpOgIz/Luke-Convex-test.

## Features

- **Convex Integration**: Real-time database with automatic syncing
- **Resend Integration**: Email sending for contact forms and newsletters
- **Contact Form**: Collects and stores messages, sends email notifications
- **Newsletter Signup**: Manages subscribers and sends welcome emails
- **Admin Dashboard**: View messages and subscribers in real-time

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Convex

1. Create a Convex account at [convex.dev](https://convex.dev)
2. Initialize Convex in your project:
   ```bash
   npx convex dev --configure
   ```
3. Follow the prompts to create a new project or connect to an existing one
4. Your Convex URL will be automatically added to your environment

### 3. Set up Resend

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key from the Resend dashboard
3. Add your domain to Resend (for production)

### 4. Environment Variables

Create a `.env.local` file in your project root:

```env
# Convex (automatically set by `npx convex dev`)
VITE_CONVEX_URL=your_convex_deployment_url

# Resend API Key (add this manually)
RESEND_API_KEY=your_resend_api_key_here
```

### 5. Update Email Configuration

In `convex/emails.ts`, update the email addresses:

```typescript
// Replace with your verified domain
from: 'Contact Form <noreply@yourdomain.com>',
// Replace with your email address
to: ['your-email@example.com'],
```

## Running the Application

### Development Mode

Start both the Vite dev server and Convex:

```bash
# Terminal 1: Start Convex
npm run convex:dev

# Terminal 2: Start Vite
npm run dev
```

### Testing the Integration

1. Visit `http://localhost:5173/contact-demo`
2. Test the contact form and newsletter signup
3. Toggle the admin dashboard to see real-time data updates

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ContactForm.tsx          # Contact form with Convex integration
│   │   ├── NewsletterSignup.tsx     # Newsletter signup component
│   │   ├── AdminDashboard.tsx       # Admin view for messages/subscribers
│   │   └── ui/                      # UI components
│   ├── pages/
│   │   ├── ContactDemo.tsx          # Demo page showcasing integration
│   │   └── ...
│   └── routes.ts
├── lib/
│   └── convex.ts                    # Convex client configuration
└── ...

convex/
├── schema.ts                        # Database schema
├── messages.ts                      # Message CRUD operations
├── subscribers.ts                   # Subscriber management
├── emails.ts                        # Email sending with Resend
└── _generated/                      # Auto-generated Convex files
```

## Key Features Explained

### Contact Form
- Stores messages in Convex database
- Sends email notifications via Resend
- Real-time status updates (pending/sent/failed)

### Newsletter Signup
- Manages subscriber list in Convex
- Prevents duplicate subscriptions
- Sends welcome emails via Resend

### Admin Dashboard
- Real-time view of all messages and subscribers
- Automatic updates when new data is added
- Status tracking for email delivery

## Deployment

### Deploy Convex Functions

```bash
npm run convex:deploy
```

### Deploy Frontend

Build and deploy your frontend to your preferred hosting service:

```bash
npm run build
```

Make sure to set the environment variables in your hosting platform.

## Troubleshooting

1. **Convex connection issues**: Make sure `VITE_CONVEX_URL` is set correctly
2. **Email not sending**: Verify your Resend API key and domain configuration
3. **Build errors**: Ensure all dependencies are installed with `--legacy-peer-deps` if needed

## Original Project

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.