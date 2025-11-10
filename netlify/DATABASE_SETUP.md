# Database Setup Instructions

This project uses Supabase (PostgreSQL) as the primary database and Neo4j for graph relationships. Supabase provides PostgreSQL, Auth, and Realtime capabilities.

## Prerequisites

1. Supabase project created (local Docker or hosted)
2. Supabase CLI installed and authenticated
3. Neo4j instance (Docker or hosted)

## Setup Steps

### 1. Initialize Supabase locally (optional)

```bash
supabase init
supabase start
```

### 2. Link to your Supabase project

```bash
supabase link --project-ref <PROJECT_REF>
```

### 3. Run Database Migrations

Apply the Supabase schema:

```bash
supabase db push
```

Or run the migration script directly:

```bash
npx tsx supabase/migrate-db.ts
```

### 4. Start Development Server

```bash
npm run dev
```

This will:
- Start the Next.js development server
- Connect to Supabase PostgreSQL and Realtime
- Connect to Neo4j for graph queries

## PostgreSQL Schema (Supabase)

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  kyc_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### user_profiles
```sql
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  rank VARCHAR(50) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### points_ledger
```sql
CREATE TABLE points_ledger (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  interaction_id UUID,
  amount INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### listings
```sql
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  type VARCHAR(20) NOT NULL CHECK (type IN ('offer', 'request')),
  title TEXT NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### interactions
```sql
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id),
  provider_user_id UUID NOT NULL REFERENCES users(id),
  receiver_user_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### evaluations
```sql
CREATE TABLE evaluations (
  id BIGSERIAL PRIMARY KEY,
  interaction_id UUID NOT NULL REFERENCES interactions(id),
  evaluator_user_id UUID NOT NULL REFERENCES users(id),
  target_user_id UUID NOT NULL REFERENCES users(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Realtime Tables
```sql
-- Chat messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interaction_id UUID NOT NULL REFERENCES interactions(id),
  sender_user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User notifications
CREATE TABLE user_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI avatar state
CREATE TABLE ai_avatar_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  state JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Neo4j Graph Model

### Node Labels
- `:User`
- `:Community`
- `:Skill`
- `:Listing`

### Relationship Types
- `[:FOLLOWS]->`
- `[:RELATED_TO]->`
- `[:TRUSTS]->` (with weight property)
- `[:CONTRIBUTED_TO]->`

## API Endpoints

### Register User
- **Endpoint**: `/api/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "displayName": "string"
  }
  ```

### Login User
- **Endpoint**: `/api/login`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## Realtime Features

- **Chat**: Enable Realtime on the `messages` table.
- **Notifications**: Enable Realtime on `user_notifications` table.
- **AI Avatar**: Enable Realtime on `ai_avatar_state` table or use Supabase Broadcast for high-frequency events.

## Security Notes

- Passwords are hashed before storage.
- Email addresses are unique and indexed.
- Row Level Security (RLS) should be enabled on user-specific tables.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_neo4j_password
```
