/**
 * Supabase Database Types
 * 
 * This file provides TypeScript type definitions for your Supabase database schema.
 * 
 * Option 1: Generate types automatically using Supabase CLI (Recommended)
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts
 * 
 * Option 2: Generate from local schema
 *   npx supabase gen types typescript --local > types/database.types.ts
 * 
 * Option 3: Use this stub (temporary solution - no type safety)
 *   This file prevents the warning but doesn't provide type safety.
 */

// Temporary stub - replace with generated types for full type safety
export type Database = Record<string, any>;

// If you have specific tables, you can define them here:
// export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
// export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];



