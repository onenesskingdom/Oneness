import { neon } from "@netlify/neon";

async function migrate() {
  const sql = neon();

  console.log("Creating users table...");
  
  await sql(`
    CREATE TABLE IF NOT EXISTS users (
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
    )
  `);

  console.log("Creating index on email...");
  await sql(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
  `);

  console.log("Migration completed successfully!");
}

migrate().catch(console.error);
