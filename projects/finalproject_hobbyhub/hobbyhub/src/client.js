import { createClient } from '@supabase/supabase-js'

const URL = 'https://jgbfnfctxuyuybkbentf.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnYmZuZmN0eHV5dXlia2JlbnRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxODg1OTMsImV4cCI6MjA2OTc2NDU5M30.9Xaf8f3wrVbUA5RGBHq45CsXBZESAw4UPQJCJ6U8rIc'

// Creates a new Supabase client instance that will allow the app to connect to the Supabase project
export const supabase = createClient(URL, API_KEY)