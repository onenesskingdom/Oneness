# Database Setup Instructions

This project uses Netlify DB (powered by Neon) for the user authentication system.

## Prerequisites

1. You must be logged into the Netlify CLI
2. Your site must be linked to Netlify

## Setup Steps

### 1. Link to Netlify (if not already done)

```bash
netlify link
```

### 2. Run Database Migration

The database will be automatically provisioned when you run `netlify dev` or `netlify build` for the first time after installing `@netlify/neon`.

To create the users table, run the migration script:

```bash
netlify env:get NETLIFY_DATABASE_URL
npx tsx netlify/migrate-db.ts
```

### 3. Start Development Server

```bash
netlify dev
```

This will:
- Start the Next.js development server
- Emulate Netlify Functions locally
- Provide access to the Netlify DB

## Database Schema

The `users` table has the following structure:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  photo_data_uri TEXT,
  document_data_uri TEXT,
  ai_verification_result JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Register User
- **Endpoint**: `/api/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "dob": "ISO date string",
    "photoDataUri": "string (optional)",
    "documentDataUri": "string (optional)",
    "aiVerificationResult": "object (optional)"
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

## Security Notes

- Passwords are hashed using SHA-256 before storage
- Email addresses are unique and indexed
- AI verification results are stored as JSONB for flexible querying

## Claiming Your Database

The database is initially created as anonymous. To claim it and manage it through the Netlify UI:
1. Go to your site in the Netlify dashboard
2. Navigate to the Database section
3. Follow the prompts to claim your database
