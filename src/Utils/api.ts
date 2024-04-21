
 
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://yzxakqivwwuvcmzofafe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6eGFrcWl2d3d1dmNtem9mYWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNDM0NzUsImV4cCI6MjAyNzcxOTQ3NX0.5dewMQwS6weoue0Jy-lXpdHYEmFpaxmAK_mKPBM4M1U')
export default supabase