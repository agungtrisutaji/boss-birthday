# Supabase Setup Guide

This guide walks you through setting up Supabase for the Boss Birthday website.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Access to the Supabase SQL Editor

## Step 1: Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name**: `boss-birthday` (or your preferred name)
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to your users
4. Click **"Create new project"**
5. Wait for the project to be provisioned (1-2 minutes)

## Step 2: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy and paste the SQL below:

```sql
-- Create greetings table
CREATE TABLE greetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_greetings_created_at ON greetings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE greetings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public SELECT (everyone can read greetings)
CREATE POLICY "Enable read access for all users"
  ON greetings
  FOR SELECT
  USING (true);

-- IMPORTANT: Do NOT create a public INSERT policy
-- INSERTs are handled via the API route using the service role key
-- This ensures rate limiting and validation are enforced
```

4. Click **"Run"** or press `Ctrl+Enter`
5. You should see: **"Success. No rows returned"**

## Step 3: Enable Realtime

Realtime allows new wishes to appear instantly without refreshing.

1. Go to **Database** → **Replication** (left sidebar)
2. Scroll down to **"Tables"**
3. Find the `greetings` table
4. Toggle **Realtime** to **ON** (it should turn green)
5. Click **"Save"** if prompted

## Step 4: Get Your API Keys

1. Go to **Project Settings** → **API** (left sidebar)
2. You'll find:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (click "Reveal" to see it)

⚠️ **Important**: The `service_role` key should **NEVER** be exposed to the client. Only use it in server-side code (API routes).

## Step 5: Configure Environment Variables

1. In your project root, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in the values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Save the file

## Step 6: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)
3. Scroll to the **Wall of Wishes** section
4. Try submitting a test wish
5. If successful, you should see:
   - A confetti animation
   - Your wish appear in the wall immediately
   - No errors in the browser console

## Verification Checklist

- [ ] Supabase project created
- [ ] `greetings` table created with correct schema
- [ ] Row Level Security (RLS) enabled
- [ ] SELECT policy created (public read)
- [ ] Realtime enabled on `greetings` table
- [ ] API keys copied to `.env.local`
- [ ] Test wish submitted successfully

## Database Schema

Here's the final schema for reference:

```
Table: greetings
┌─────────────┬──────────────┬──────────┬─────────────────────┐
│ Column      │ Type         │ Nullable │ Default             │
├─────────────┼──────────────┼──────────┼─────────────────────┤
│ id          │ UUID         │ NO       │ gen_random_uuid()   │
│ name        │ TEXT         │ NO       │                     │
│ message     │ TEXT         │ NO       │                     │
│ emoji       │ TEXT         │ YES      │ NULL                │
│ created_at  │ TIMESTAMPTZ  │ NO       │ NOW()               │
└─────────────┴──────────────┴──────────┴─────────────────────┘

Primary Key: id
Index: idx_greetings_created_at (created_at DESC)
```

## Security Notes

### Why No Public INSERT Policy?

We intentionally **do NOT** create a public INSERT policy. Here's why:

1. **Rate Limiting**: The API route enforces 3 requests/minute per IP
2. **Validation**: Zod schemas validate and sanitize all inputs
3. **Control**: All inserts go through the server, giving us full control
4. **Safety**: Prevents malicious clients from bypassing our rules

The `service_role` key in the API route bypasses RLS, allowing server-controlled inserts only.

### RLS Policies Summary

| Operation | Who Can Do It? | Why? |
|-----------|----------------|------|
| SELECT    | Everyone       | Wishes are public, anyone can read |
| INSERT    | Server only    | Enforces rate limiting & validation |
| UPDATE    | No one         | Wishes are immutable once posted |
| DELETE    | No one         | Wishes are permanent (delete via dashboard if needed) |

## Troubleshooting

### "Failed to fetch greetings"

- Check that your Supabase project URL is correct
- Verify the `anon` key in `.env.local`
- Check browser console for CORS errors
- Ensure RLS SELECT policy exists

### "Failed to save greeting"

- Verify `service_role` key in `.env.local`
- Check API route logs for errors
- Ensure the table schema matches exactly

### "Realtime not working"

- Confirm Realtime is enabled on the `greetings` table
- Check browser console for WebSocket errors
- Try refreshing the page
- Verify Supabase project is not paused (free tier projects pause after inactivity)

### View Data in Supabase

1. Go to **Table Editor** in Supabase dashboard
2. Select the `greetings` table
3. You can view, edit, and delete records here

## Optional: Seed Data

Want to add some test wishes? Run this SQL:

```sql
INSERT INTO greetings (name, message, emoji) VALUES
  ('Alice Johnson', 'Wishing you a fantastic birthday filled with joy and success!', '🎉'),
  ('Bob Smith', 'Happy Birthday! Thank you for your incredible leadership.', '🎂'),
  ('Carol White', 'May this year bring you happiness and new achievements!', '🌟'),
  ('David Lee', 'Happy Birthday, Mr. Martin! Your guidance means so much to us.', '🎈');
```

## Production Deployment

When deploying to Vercel:

1. Add the same environment variables in **Vercel Project Settings** → **Environment Variables**
2. Make sure to add them for **Production**, **Preview**, and **Development** environments
3. Redeploy if you add variables after initial deployment

---

Need help? Check the [Supabase Documentation](https://supabase.com/docs) or the main README.md.
