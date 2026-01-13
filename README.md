🚜 Tractor Online Store

A modern, full-stack e-commerce platform for buying and selling tractors and agricultural equipment online. Built with Next.js 15, featuring real-time video previews, secure payments, and comprehensive tractor detail management.



📋 Table of Contents

- [Overview](#overview)
- [Problem & Solution](#problem--solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

🎯 Overview

Tractor Online Store is a specialized e-commerce platform designed to connect tractor sellers with buyers. The platform provides detailed product listings with video demonstrations, secure payment processing, and comprehensive user progress tracking.

📸 Screenshots 
![Homepage](/IMG-20260113-WA0003.jpg)

🔍 Problem & Solution

Problem
Traditional agricultural equipment sales face several challenges:
- **Limited Reach**: Sellers struggle to reach potential buyers beyond their local area
- **Information Gap**: Buyers lack detailed information and visual demonstrations before purchase
- **Trust Issues**: Difficulty verifying equipment condition and history
- **Complex Transactions**: No streamlined platform for secure transactions

Solution
Our platform addresses these challenges by providing:
- **Global Marketplace**: Connect sellers and buyers worldwide
- **Rich Media Content**: Video demonstrations and detailed specifications
- **Verified Listings**: Seller authentication and equipment history tracking
- **Secure Payments**: Integrated Stripe payment processing
- **User Progress Tracking**: Monitor viewing history and purchase progress

Impact
- **For Sellers**: Expanded market reach, professional listing tools, and secure payment collection
- **For Buyers**: Access to detailed equipment information, video reviews, and secure purchasing
- **For the Industry**: Modernized agricultural equipment commerce with digital-first approach

✨ Features

🛍️ Core Features
- **Tractor Listings**: Comprehensive product catalog with search and filtering
- **Video Previews**: HD video demonstrations powered by Mux
- **Detailed Specifications**: Complete equipment specifications and history
- **User Authentication**: Secure login with Clerk
- **Payment Processing**: Stripe integration for secure transactions
- **Progress Tracking**: Monitor which details users have viewed
- **File Attachments**: Upload and share documentation, manuals, and certificates

👤 User Features
- **User Dashboard**: Personal dashboard for managing listings and purchases
- **Favorites**: Save tractors for later viewing
- **Purchase History**: Track all transactions
- **Inquiry System**: Direct communication with sellers

🔧 Seller Features
- **Listing Management**: Create, edit, and manage tractor listings
- **Detail Management**: Add multiple detail sections with videos
- **Analytics**: Track views and engagement
- **Approval Workflow**: Admin review before listings go live

🎨 UI/UX Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop

🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Reusable component library
- **[Lucide React](https://lucide.dev/)** - Icon library

Backend & Database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database (via Neon)
- **[Neon](https://neon.tech/)** - Serverless Postgres with connection pooling

Authentication & Payments
- **[Clerk](https://clerk.com/)** - User authentication and management
- **[Stripe](https://stripe.com/)** - Payment processing

Media & Storage
- **[Mux](https://mux.com/)** - Video hosting and streaming
- **[UploadThing](https://uploadthing.com/)** - File upload management

Deployment & Hosting
- **[Vercel](https://vercel.com/)** - Hosting and deployment
- **[GitHub](https://github.com/)** - Version control

Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Zod](https://zod.dev/)** - Schema validation

🚀 Getting Started

Prerequisites

Before you begin, ensure you have:
- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager
- **PostgreSQL** database (or Neon account)
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/amanidy/tractor-online-store.git
cd tractor-online-store
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Then edit `.env` with your credentials (see [Environment Variables](#environment-variables))

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
POSTGRES_PRISMA_URL="your-neon-database-url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Stripe
STRIPE_API_KEY="sk_test_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
STRIPE_WEBHOOK_SECRET="whsec_..."

# Mux (Video)
MUX_TOKEN_ID="your-mux-token-id"
MUX_TOKEN_SECRET="your-mux-token-secret"

# UploadThing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
```

How to Get API Keys

1. **Database (Neon)**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string from the dashboard

2. **Clerk**
   - Sign up at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy API keys from the dashboard

3. **Stripe**
   - Sign up at [stripe.com](https://stripe.com)
   - Get test/live API keys from the dashboard
   - Set up webhooks for payment events

4. **Mux**
   - Sign up at [mux.com](https://mux.com)
   - Create access tokens from settings

5. **UploadThing**
   - Sign up at [uploadthing.com](https://uploadthing.com)
   - Create a new app and copy credentials

🗄️ Database Setup

The project uses Prisma with PostgreSQL. The main models include:

- **User**: User accounts and profiles
- **Tractor**: Main product listings
- **Detail**: Product detail sections with videos
- **Attachment**: File attachments for tractors
- **Purchase**: Transaction records
- **UserProgress**: Tracking user viewing progress

Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Create a migration
npx prisma migrate dev --name migration-name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from your `.env` file
   - Make sure to select all environments (Production, Preview, Development)

4. **Deploy**
   - Vercel will automatically deploy your application
   - Every push to `main` triggers a new deployment

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

📁 Project Structure

```
tractor-online-store/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (tractor)/           # Main tractor pages
│   │   └── tractor/
│   │       └── tractors/
│   │           └── [tractorId]/
│   │               ├── page.tsx
│   │               └── details/
│   │                   └── [detailId]/
│   │                       └── page.tsx
│   ├── api/                 # API routes
│   ├── lib/                 # Utility functions
│   └── components/          # React components
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static files
├── .env                     # Environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies
```

## 🔧 Common Issues & Solutions

### Issue: Prisma can't find DATABASE_URL
**Solution**: Ensure environment variables are set in Vercel and redeploy

### Issue: `params` is undefined in Next.js 15
**Solution**: Await params as they're now Promises
```typescript
const params = await props.params;
```

### Issue: Video not playing
**Solution**: Check Mux credentials and ensure video is properly uploaded

### Issue: Payment not processing
**Solution**: Verify Stripe webhook is configured correctly

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Arnold Amani**
- GitHub: [@amanidy](https://github.com/amanidy)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Clerk for authentication solution
- Stripe for payment processing
- Mux for video infrastructure
- All open-source contributors




