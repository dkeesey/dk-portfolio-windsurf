/**
 * Supabase Connection Test Script
 * 
 * This script tests the connection to your Supabase project and provides
 * information about the database schema and permissions.
 * 
 * Usage: 
 * 1. Make sure you have the required environment variables set
 * 2. Run with: node scripts/test-supabase.js
 */

// Load environment variables
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || 'https://clzvndqgtmbsugmdpdsq.supabase.co';
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('Error: PUBLIC_SUPABASE_ANON_KEY is not set in the environment variables');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tables to check
const tables = ['recruiters', 'conversations', 'messages', 'job_descriptions', 'entities'];

async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    console.log(`URL: ${supabaseUrl}`);
    
    // Check if we can connect to Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error connecting to Supabase:', sessionError.message);
      return;
    }
    
    console.log('\nConnection successful!');
    console.log('Authentication status:', session ? 'Authenticated' : 'Not authenticated');
    
    // Check table access and count records
    console.log('\nChecking database tables:');
    
    for (const table of tables) {
      try {
        // Count records in the table
        const { count, error: countError } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (countError) {
          console.log(`- ${table}: Error - ${countError.message}`);
        } else {
          console.log(`- ${table}: ${count || 0} records`);
        }
      } catch (tableError) {
        console.log(`- ${table}: Error - ${tableError.message}`);
      }
    }
    
    // Test permission for a simple insert operation
    console.log('\nTesting write permissions:');
    
    const testInsert = await supabase
      .from('recruiters')
      .insert([
        {
          id: '00000000-0000-0000-0000-000000000000',
          email: 'test@example.com',
          name: 'Test User',
          last_active: new Date().toISOString()
        }
      ]);
    
    if (testInsert.error) {
      console.log('Write permission test: Failed');
      console.log(`Error: ${testInsert.error.message}`);
      
      if (testInsert.error.message.includes('row-level security')) {
        console.log('Note: This is expected behavior with RLS policies enabled.');
        console.log('To modify data, you need to authenticate or adjust RLS policies.');
      }
    } else {
      console.log('Write permission test: Successful');
      
      // Clean up the test record
      await supabase
        .from('recruiters')
        .delete()
        .eq('id', '00000000-0000-0000-0000-000000000000');
    }
    
    console.log('\nTest completed!');
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

// Run the test
testSupabaseConnection();
