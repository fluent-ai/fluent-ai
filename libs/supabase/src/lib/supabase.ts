import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://rrgtmovkczotmiacaibj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3Rtb3ZrY3pvdG1pYWNhaWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NjgxMzYsImV4cCI6MjAwMTU0NDEzNn0.wiV3JVN1q2-PWxBZLi1cKQ6gYRE9gyE_aQcLQXzR6mw'
);
