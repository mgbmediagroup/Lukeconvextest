# Deployment Guide for Netlify

## 📋 **Pre-Deployment Checklist**

### 1. **Convex Cloud Deployment**
Before deploying to Netlify, you need to deploy Convex to the cloud:

```bash
# Login to Convex (create account if needed)
npx convex login

# Deploy to Convex cloud
npx convex deploy
```

This will:
- Create a cloud Convex deployment
- Update your `.env.local` with the production Convex URL
- Your local database will be migrated to the cloud

### 2. **Netlify Deployment Steps**

#### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Convex + Resend integration"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

#### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub repository
4. Netlify will auto-detect the build settings from `netlify.toml`

#### Step 3: Configure Environment Variables
In your Netlify dashboard, go to **Site settings > Environment variables** and add:

```
RESEND_API_KEY=re_Gype9cus_2J4X6qKfVHjvXChrixtbLxSc
VITE_CONVEX_URL=https://your-convex-deployment-url.convex.cloud
```

**Important**: 
- Get the `VITE_CONVEX_URL` from your `.env.local` after running `npx convex deploy`
- The `RESEND_API_KEY` should be the same one you're using locally

#### Step 4: Deploy
1. Click "Deploy site"
2. Wait for the build to complete
3. Your site will be live at `https://your-site-name.netlify.app`

## 🧪 **Testing Your Deployed Site**

1. **Visit your live site**
2. **Fill out the contact form**
3. **Check your email** at `mgbmediagroup@gmail.com`
4. **Visit `/admin/messages`** to see the submission in Convex

## 🔧 **How It Works in Production**

### **Email Flow:**
1. User submits contact form
2. Form data is saved to Convex cloud database
3. Netlify function (`/.netlify/functions/send-email`) is called
4. Function uses Resend API to send email to `mgbmediagroup@gmail.com`
5. Success/error message shown to user

### **Security:**
- ✅ Resend API key is secure (server-side only)
- ✅ No sensitive data exposed to client
- ✅ CORS properly configured
- ✅ Input validation in place

## 🚨 **Troubleshooting**

### **If emails aren't sending:**
1. Check Netlify function logs in dashboard
2. Verify `RESEND_API_KEY` is set correctly
3. Check Resend dashboard for delivery status

### **If Convex isn't working:**
1. Verify `VITE_CONVEX_URL` points to cloud deployment
2. Make sure `npx convex deploy` was successful
3. Check Convex dashboard for errors

### **If build fails:**
1. Check that all dependencies are in `package.json`
2. Verify `netlify.toml` configuration
3. Check build logs in Netlify dashboard

## 📧 **Email Configuration Notes**

- **From address**: `Contact Form <onboarding@resend.dev>` (Resend's test domain)
- **To address**: `mgbmediagroup@gmail.com`
- **For production**: Consider adding your own verified domain to Resend

## 🎯 **Next Steps After Deployment**

1. **Test thoroughly** on the live site
2. **Monitor** email delivery in Resend dashboard
3. **Check** Convex dashboard for database activity
4. **Consider** adding your own domain to Resend for better deliverability

Your contact form will work seamlessly on Netlify with this setup! 🚀