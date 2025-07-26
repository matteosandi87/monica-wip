# Supabase Setup Guide for NetworkSync

## Overview
NetworkSync uses Supabase as its database and authentication provider. Follow these steps to set up your Supabase project.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `networksync-db` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
6. Click "Create new project"

## Step 2: Get Your Project Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://your-project-id.supabase.co`)
3. Copy your **anon public** key (starts with `eyJhbGciOiJIUzI1NiI...`)
4. Copy your **service_role** key (starts with `eyJhbGciOiJIUzI1NiI...`)

## Step 3: Update Environment Variables

### Backend (.env)
Edit `/app/backend/.env` and replace the placeholder values:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-anon-key
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-service-key
```

### Frontend (.env)
Edit `/app/frontend/.env` and replace the placeholder values:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-anon-key
```

## Step 4: Create Database Schema

In the Supabase dashboard:

1. Go to **SQL Editor**
2. Create a new query
3. Run the following SQL to create the initial tables:

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Create users profile extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    title TEXT,
    notes TEXT,
    linkedin_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relationships table (for network connections)
CREATE TABLE IF NOT EXISTS public.relationships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    from_contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
    to_contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
    relationship_type TEXT DEFAULT 'colleague',
    strength_score INTEGER DEFAULT 1 CHECK (strength_score >= 1 AND strength_score <= 5),
    context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, from_contact_id, to_contact_id)
);

-- Interactions table
CREATE TABLE IF NOT EXISTS public.interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
    interaction_type TEXT NOT NULL DEFAULT 'other',
    content TEXT,
    channel TEXT DEFAULT 'other',
    interaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sentiment_score FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, name)
);

-- Contact tags junction table
CREATE TABLE IF NOT EXISTS public.contact_tags (
    contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (contact_id, tag_id)
);

-- Reminders table
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    reminder_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    reminder_type TEXT DEFAULT 'follow_up',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 5: Set up Row Level Security (RLS)

Run this SQL to enable proper data isolation:

```sql
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage their own contacts" ON public.contacts
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own relationships" ON public.relationships
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own interactions" ON public.interactions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own tags" ON public.tags
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own contact tags" ON public.contact_tags
    FOR ALL USING (auth.uid() = (SELECT user_id FROM public.contacts WHERE id = contact_id));

CREATE POLICY "Users can manage their own reminders" ON public.reminders
    FOR ALL USING (auth.uid() = user_id);
```

## Step 6: Test the Connection

1. Restart your backend server:
   ```bash
   sudo supervisorctl restart backend
   ```

2. Test the database connection:
   ```bash
   curl http://localhost:8001/api/health/database
   ```

   You should see a success message instead of an error.

## Step 7: Enable Authentication

In your Supabase dashboard:

1. Go to **Authentication** → **Settings**
2. Configure your site URL to `http://localhost:3000` (for development)
3. Add any additional redirect URLs you need
4. Configure email templates if desired

## Next Steps

Once Supabase is configured:

1. The backend will be able to connect to the database
2. Authentication will work through Supabase Auth
3. All data will be properly isolated per user with RLS
4. You can proceed with importing contacts and building your network

## Troubleshooting

**Database Connection Issues:**
- Verify your Supabase URL and keys are correct
- Check that your project is active in Supabase dashboard
- Ensure you're using the correct environment variable names

**Authentication Issues:**
- Verify your site URL is configured in Supabase
- Check that the anon key is correct
- Ensure RLS policies are properly set up

**API Issues:**
- Check the backend logs: `tail -f /var/log/supervisor/backend.err.log`
- Verify your Supabase project is not paused
- Test individual API endpoints using curl