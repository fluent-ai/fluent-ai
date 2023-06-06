import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://rrgtmovkczotmiacaibj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3Rtb3ZrY3pvdG1pYWNhaWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NjgxMzYsImV4cCI6MjAwMTU0NDEzNn0.wiV3JVN1q2-PWxBZLi1cKQ6gYRE9gyE_aQcLQXzR6mw'
);

export const getFlows = async () => {
  const { data, error } = await supabase.from('flows').select('*');

  if (error) {
    console.error('Error fetching flows :', error);
    return [];
  } else {
    console.log('Flows retrieved successfully:', data);
    return data;
    // Use the retrieved data to render flow charts for the current user
  }
};

export const saveFlow = async (id: string, userId: string, flow: string) => {
  const { data, error } = await supabase
    .from('flows')
    .upsert({ id, user_id: userId, flow }, { onConflict: 'id' });

  if (error) {
    console.error('Error saving flow :', error);
  } else {
    console.log('Flow saved successfully!');
  }
};
