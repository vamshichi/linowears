# linowears E-commerce Platform

A full-stack e-commerce platform for premium cotton-linen shirts built with Next.js, Prisma, and PostgreSQL.

## Features

### Customer Features
- **Product Catalog**: Browse and filter products by category, size, color, price, and fabric
- **360° Product Viewer**: Interactive product views with drag-to-rotate functionality
- **Multiple Authentication Options**: 
  - Email OTP authentication with Nodemailer
  - Google OAuth sign-in
- **Shopping Cart**: Add, update, and remove items with real-time updates
- **Checkout**: Multi-step checkout with shipping address collection
- **Order Tracking**: Track orders with visual status timeline
- **Custom Fit Service**: Save measurements for tailored shirts
- **Loyalty Program**: Earn points on purchases, referrals, and reviews
- **Referral System**: Invite friends and earn rewards
- **Product Reviews**: Write reviews and earn loyalty points
- **Responsive Design**: Mobile-first design with elegant UI

### Admin Features
- **Dashboard**: Overview of revenue, orders, products, and customers
- **Order Management**: View, filter, and update order status
- **Product Management**: Manage product catalog
- **Customer Management**: View customer information

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth + Custom OTP
- **Email**: Nodemailer for OTP delivery
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## Database Schema

### Core Models
- **User**: Customer accounts with email, phone, and profile info
- **Account**: OAuth account connections (Google, etc.)
- **Session**: NextAuth session management
- **OTPCode**: One-time passwords for email authentication
- **Product**: Product catalog with variants
- **Cart**: Shopping cart with items
- **Order**: Orders with items and status tracking
- **Review**: Product reviews with ratings
- **LoyaltyPoint**: Points earned through purchases and actions
- **Referral**: Referral tracking system
- **Measurement**: Custom fit measurements

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google OAuth credentials (for Google sign-in)
- SMTP email account (Gmail, SendGrid, etc.)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables (copy `.env.example` to `.env.local`):
   \`\`\`env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/linowears"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Email (Nodemailer)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"
   SMTP_FROM="linowears <your-email@gmail.com>"
   \`\`\`

4. Set up Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret to `.env.local`

5. Set up Email (Gmail example):
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password at [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Use the App Password as `SMTP_PASSWORD` in `.env.local`

6. Run database migrations:
   \`\`\`bash
   npx prisma migrate dev
   \`\`\`

7. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

8. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── account/           # Customer account pages
│   ├── shop/              # Product catalog
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── orders/            # Order tracking
│   └── custom-fit/        # Custom fit service
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── auth/             # Auth components
│   ├── cart/             # Cart components
│   ├── checkout/         # Checkout components
│   ├── orders/           # Order components
│   ├── loyalty/          # Loyalty components
│   ├── ui/               # shadcn/ui components
│   └── product-viewer/   # 360° product viewer components
├── lib/                   # Utility functions
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # Authentication utilities
│   ├── cart.ts           # Cart utilities
│   └── loyalty.ts        # Loyalty utilities
└── prisma/
    └── schema.prisma     # Database schema
\`\`\`

## Key Features Implementation

### Authentication System
- **Email OTP**: Secure 6-digit codes sent via Nodemailer with 10-minute expiration
- **Google OAuth**: One-click sign-in with Google accounts via NextAuth.js
- **Session Management**: Secure HTTP-only cookies for OTP, database sessions for OAuth
- **Automatic User Creation**: Users created on first login with either method

### 360° Product Viewer
- Interactive drag-to-rotate functionality
- 8 angle views (front, back, sides, diagonals)
- Thumbnail navigation
- Auto-rotate mode
- Fullscreen support
- Touch-enabled for mobile devices

### Shopping Cart
- Persistent cart stored in database
- Real-time quantity updates
- Automatic cart clearing after checkout

### Order Management
- Unique order number generation
- Status tracking with history
- Email notifications (ready for integration)

### Loyalty Program
- 10 points per ₹100 spent
- 500 points for successful referrals
- 50 points for product reviews
- Points redeemable for discounts (100 points = ₹10)

### Admin Dashboard
- Real-time statistics
- Order status management
- Product catalog management
- Customer insights

## Environment Variables

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/linowears"

# NextAuth (required for Google OAuth)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (required for Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email/SMTP (required for OTP emails)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="linowears <your-email@gmail.com>"

# Admin Access (optional)
# Add admin emails to lib/admin.ts
\`\`\`

### SMTP Provider Options

**Gmail** (Recommended for development):
- Host: `smtp.gmail.com`
- Port: `587`
- Requires App Password (not regular password)

**SendGrid**:
- Host: `smtp.sendgrid.net`
- Port: `587`
- Use API key as password

**Mailgun**:
- Host: `smtp.mailgun.org`
- Port: `587`

**AWS SES**:
- Host: `email-smtp.region.amazonaws.com`
- Port: `587`

## Future Enhancements

- AI Size Recommendation
- Virtual Try-On
- WhatsApp/SMS notifications for OTP
- Multi-language support
- Payment gateway integration (Stripe/Razorpay)
- Advanced analytics
- Subscription model
- Social login (Facebook, Apple)

## License

MIT
