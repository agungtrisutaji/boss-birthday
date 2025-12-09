# 🎂 Boss Birthday Website

A professional, modern single-page birthday website for **Mr. Martin Marta**. Built with Next.js, featuring realtime wishes, confetti celebrations, and a terminal Easter egg.

## 🎯 Features

- **Hero Section** with subtle neon design and confetti
- **Spotlight** section with premium photo frame
- **Flip Birthday Card** with accessible controls
- **Realtime Wall of Wishes** powered by Supabase
- **Background Music Toggle** (off by default)
- **Terminal Easter Egg** (Konami Code + "MARTIN")
- **Responsive Design** optimized for all devices
- **Rate Limiting** on wish submissions (3 per minute per IP)

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS v4**
- **Supabase** (Realtime Database)
- **Framer Motion** (Animations)
- **Canvas Confetti**
- **Zod** (Validation)
- **shadcn/ui** components

## 📁 Project Structure

```
boss-birthday/
├── public/
│   ├── brand/
│   │   ├── logo.png          # Company logo (add your own)
│   │   └── mr-martin.jpg     # Boss photo (add your own)
│   └── audio/
│       └── birthday.mp3      # Background music (add your own)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── greetings/
│   │   │       └── route.ts  # API endpoints
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── BirthdayCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Section.tsx
│   │   ├── Spotlight.tsx
│   │   ├── TerminalEasterEgg.tsx
│   │   └── WallOfWishes.tsx
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts
│       │   ├── server.ts
│       │   └── types.ts
│       └── utils.ts
├── .env.local.example
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account
- Vercel account (for deployment)

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Setup Supabase

Create a new Supabase project at [supabase.com](https://supabase.com)

#### Run this SQL in Supabase SQL Editor:

```sql
-- Create greetings table
CREATE TABLE greetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE greetings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public SELECT (read)
CREATE POLICY "Enable read access for all users"
  ON greetings
  FOR SELECT
  USING (true);

-- Note: INSERT is handled via API route with service role key
-- This prevents direct client inserts and ensures rate limiting
```

#### Enable Realtime:

1. Go to **Database** → **Replication** in Supabase dashboard
2. Find the `greetings` table
3. Enable **Realtime**

### 3. Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Find these in**: Supabase Dashboard → Project Settings → API

### 4. Add Assets (Optional)

Add these files to the `public` directory:

- `public/brand/logo.png` - Your company logo (transparent PNG recommended)
- `public/brand/mr-martin.jpg` - Boss photo
- `public/audio/birthday.mp3` - Background music

**Note**: The app will gracefully handle missing assets with placeholders.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎮 Easter Egg

To activate the Terminal overlay:

1. Enter the **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A
2. Type **"MARTIN"**
3. Terminal appears with ASCII art and system logs
4. Close with ESC or the close button

**Shortcut**: Click the terminal icon in the bottom-right corner

## 🚢 Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Add Environment Variables**:
   - In Vercel project settings → Environment Variables
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

4. **Deploy**:
   - Click **Deploy**
   - Vercel builds and deploys automatically
   - Get your live URL!

### Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🔒 Security & Rate Limiting

- **Rate Limiting**: 3 wishes per minute per IP address
- **RLS Policies**: Public read, server-only insert via service role
- **Input Validation**: Zod schemas validate all user inputs
- **Sanitization**: Names max 50 chars, messages max 500 chars

## 🎨 Customization

### Change Company Name

Edit `src/components/Spotlight.tsx`:

```tsx
<p className="text-base text-gray-600 italic">
  — From all of us at YourCompany
</p>
```

### Modify Hero Subheadline

Edit `src/components/Hero.tsx`:

```tsx
<p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto">
  Your custom message here
</p>
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📄 License

MIT License - feel free to use this for your own birthday celebrations!

---

**Happy Birthday, Mr. Martin Marta! 🎂**


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
