import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dposeynvrrqxubcbeiyp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwb3NleW52cnJxeHViY2JlaXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDY2OTUsImV4cCI6MjA1ODQ4MjY5NX0.QNcvP4ZsHQu6GqYazuxBAqMQhrqOjagT1aXpCWbTLKg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('URL:', import.meta.env.VITE_SUPABASE_URL);