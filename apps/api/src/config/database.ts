import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from appropriate files
const loadEnv = () => {
  // Check if we're in development
  const NODE_ENV = process.env.NODE_ENV || 'development';
  
  // Try to load .env.${NODE_ENV}.local first
  const localEnvPath = path.resolve(process.cwd(), `.env.${NODE_ENV}.local`);
  if (fs.existsSync(localEnvPath)) {
    console.log(`Loading environment from ${localEnvPath}`);
    dotenv.config({ path: localEnvPath });
  } else {
    // Fall back to .env
    const defaultEnvPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(defaultEnvPath)) {
      console.log(`Loading environment from ${defaultEnvPath}`);
      dotenv.config({ path: defaultEnvPath });
    } else {
      console.warn('No .env file found');
    }
  }
};

// Load environment variables
loadEnv();

// Default to specific values if environment variables aren't set
const dbConfig = {
  user: 'postgres',
  password: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  database: process.env.DB_NAME || 'pse_forum',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Print database configuration for debugging (with password redacted)
console.log('Database config (redacted password):', {
  ...dbConfig,
  password: '******',
});

// Create a PostgreSQL connection pool
export const pool = new Pool(
  process.env.DATABASE_URL 
    ? { 
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }
    : dbConfig
);

// Query helper function
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  let client;
  
  try {
    client = await pool.connect();
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    
    if (duration > 100) {
      // Only log relevant information to avoid circular references
      console.log('Long query:', { 
        text, 
        duration, 
        rowCount: result.rowCount,
        params: params ? '[provided]' : '[none]'
      });
    }
    
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    // Safely log error without possible circular references
    console.error('Query error:', { 
      text, 
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
      params: params ? '[provided]' : '[none]'
    });
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
} 