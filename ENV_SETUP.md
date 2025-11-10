# Environment Variables Setup

Create a `.env.local` file in the project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://edfixzjpvsqpebzehsqy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZml4empwdnNxcGViemVoc3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NDA3NDgsImV4cCI6MjA3ODMxNjc0OH0.ozxPhLQHHwwFOL3IWFr_ZlTOVUkXYD_K8lBKSNajAw4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZml4empwdnNxcGViemVoc3F5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjc0MDc0OCwiZXhwIjoyMDc4MzE2NzQ4fQ.R6Lkx4i9lnjR4XsWicd-czadbePgnXWGDTIX-w2MGho

# Site URL for password reset redirects
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Neo4j Configuration (optional, when using Neo4j)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=jon&jamesr1

```

## Where to find Supabase credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the Project URL (NEXT_PUBLIC_SUPABASE_URL)
4. Copy the anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
5. Copy the service_role key (SUPABASE_SERVICE_ROLE_KEY) - keep this secret!

## Production deployment

For production (VPS deployment), create `.env.production` with the same variables using your production Supabase project credentials.
