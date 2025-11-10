import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local explicitly
config({ path: resolve(__dirname, '../.env.local') });

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log('Running Supabase migrations...');

  // Users table
  console.log('Creating users table...');
  const { error: usersError } = await supabase
    .from('users')
    .select('id')
    .limit(1);
  
  // If table doesn't exist, create it using raw SQL
  if (usersError && usersError.code === 'PGRST116') {
    const { error: createUsersError } = await supabase.rpc('exec', {
      query: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          kyc_status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `
    });
    if (createUsersError) {
      console.log('Note: Creating table via SQL failed, this is expected in Supabase. Please create tables manually in the dashboard.');
      console.log('SQL for users table:');
      console.log(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          kyc_status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `);
    }
  }

  // User profiles
  console.log('Creating user_profiles table...');
  const { error: profilesError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        display_name VARCHAR(255) NOT NULL,
        bio TEXT,
        avatar_url TEXT,
        rank VARCHAR(50) DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
  });
  if (profilesError) throw profilesError;

  // Points ledger
  console.log('Creating points_ledger table...');
  const { error: ledgerError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS points_ledger (
        id BIGSERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        interaction_id UUID,
        amount INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_ledger_user ON points_ledger(user_id);
    `
  });
  if (ledgerError) throw ledgerError;

  // Listings
  console.log('Creating listings table...');
  const { error: listingsError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS listings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        type VARCHAR(20) NOT NULL CHECK (type IN ('offer', 'request')),
        title TEXT NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
    `
  });
  if (listingsError) throw listingsError;

  // Interactions
  console.log('Creating interactions table...');
  const { error: interactionsError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS interactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        listing_id UUID NOT NULL REFERENCES listings(id),
        provider_user_id UUID NOT NULL REFERENCES users(id),
        receiver_user_id UUID NOT NULL REFERENCES users(id),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_interactions_listing ON interactions(listing_id);
    `
  });
  if (interactionsError) throw interactionsError;

  // Evaluations
  console.log('Creating evaluations table...');
  const { error: evaluationsError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS evaluations (
        id BIGSERIAL PRIMARY KEY,
        interaction_id UUID NOT NULL REFERENCES interactions(id),
        evaluator_user_id UUID NOT NULL REFERENCES users(id),
        target_user_id UUID NOT NULL REFERENCES users(id),
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_evaluations_target ON evaluations(target_user_id);
    `
  });
  if (evaluationsError) throw evaluationsError;

  // Realtime tables
  console.log('Creating realtime tables...');
  const { error: realtimeError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        interaction_id UUID NOT NULL REFERENCES interactions(id),
        sender_user_id UUID NOT NULL REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS user_notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        type VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS ai_avatar_state (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        state JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
  });
  if (realtimeError) throw realtimeError;

  console.log('Migration completed successfully!');
}

migrate().catch(console.error);
