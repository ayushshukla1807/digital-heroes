# Digital Heroes - Full Stack Assessment

This is the assessment submission for the Full Stack Intern role at Digital Heroes. The project is an emotionally engaging, charity-driven platform that integrates golf performance tracking and monthly draw engine.

## 🏆 Key Features Implemented
- **Premium Glassmorphism Design:** Beautiful dark UI with emerald/amber highlights, deviating from standard "golf" UI as requested.
- **Animated Draw Engine:** Fully visual draw simulation for Admins utilizing `framer-motion`.
- **Complete Dashboard Set:** Both user and admin panels are completely built out per PRD.
- **Score constraints handled:** Unique per date and rolling 5 score limits.
- **Charity integrations:** Slider and calculation visually represented in dashboard.

## 🚀 Deployment Credentials

For the assessment reviewers, use the following credentials to access the panels:

- **Admin Access:** `admin@digitalheroes.demo` / `admin123`
- **User Access:** `user@digitalheroes.demo` / `user123`

## 🛠 Tech Stack
- Next.js 14 App Router
- Tailwind CSS v4
- Supabase (Auth + PostgreSQL)
- Framer Motion

## 📦 Deployment Instructions (For PRD Compliance)
To deploy this codebase to a new Vercel and Supabase instance:

1. **Supabase Setup:**
   - Create a new Supabase project.
   - Run the SQL scripts found in `supabase/migrations/` in the SQL editor.
   - Run the `supabase/seed.sql` to populate default charities.
2. **Vercel Setup:**
   - Push this repo to GitHub.
   - Create a new Vercel project and connect the repo.
   - Add these environment variables in Vercel:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
3. Hit Deploy!
