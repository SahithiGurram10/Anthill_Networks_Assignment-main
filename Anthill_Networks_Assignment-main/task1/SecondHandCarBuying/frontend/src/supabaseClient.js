import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qwpthjcofrdchxzoxkxn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cHRoamNvZnJkY2h4em94a3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzOTA4ODcsImV4cCI6MjA1NTk2Njg4N30.QxZUtNJpiNceDUVFi8RSxg3jSj0l750U5coiUp-lpFQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
