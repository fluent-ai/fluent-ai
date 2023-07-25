import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

console.log('Initializing user');

serve(async (req) => {
  console.log('Creating Supabase client');
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  );

  const event = await req.json();

  try {
    if (event.type === 'INSERT' && event.table === 'users') {
      // Add 20c credit to the user's row in the accounts table
      const { data, error } = await supabaseClient
        .from('accounts')
        .insert({ user_id: event.record.id, credit: 0.2 });

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({
          message: 'Must be called form an insert on the users table',
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 404,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
