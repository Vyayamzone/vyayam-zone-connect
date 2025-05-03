
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sbnafezykzttsueaqwag.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNibmFmZXp5a3p0dHN1ZWFxd2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTYzNDEsImV4cCI6MjA2MTg3MjM0MX0._DFafIOsFPq4aFKBMThVAYkGpZvLc7GZjETmIg_AYfE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
