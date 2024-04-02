
import { createClient } from '@supabase/supabase-js'

 
const supabase = createClient('https://sduhvukblomsnhbxxrno.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkdWh2dWtibG9tc25oYnh4cm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NjE4MTksImV4cCI6MjAyNzIzNzgxOX0.VYQ1ufjzV9LkvU-9cxLlPtYm2-dMpBog81IlMO0ZzN0')
export default supabase