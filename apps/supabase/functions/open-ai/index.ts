import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { calculateTokenPrice } from '../_shared/openAiPricePerToken.ts';
import { openAi } from '../_shared/openAI.ts';

console.log(`--------------- new request ---------------`);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let params = undefined;
  try {
    const body = await req.json();
    params = body.params;
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Request body must include openAI Parameters',
        message: error,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
  console.log('🎛️ params', params);

  let supabaseClient = undefined;
  try {
    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to create supabase client',
        message: error,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }

  let user = undefined;
  try {
    const userData = await supabaseClient.auth.getUser();
    user = userData?.data?.user;
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to get user from supabase',
        message: error,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
  console.log('🙋 user', user);

  let account = undefined;
  try {
    const accountData = await supabaseClient
      .from('accounts')
      .select('*')
      .filter('user_id', 'eq', user?.id);
    console.log('🏦 accountData', accountData);

    account = accountData?.data?.[0];
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to get account from supabase',
        message: error,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
  console.log('💰 account', account);

  // Check if the user has enough credit
  if (account?.credit < 0.05) {
    return new Response(
      JSON.stringify({
        error: 'You need at least 5c credit to make a call to openAI',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }

  let response = undefined;
  try {
    response = await openAi(params);
  } catch (error) {
    console.log('🤖 openAI call failed');
    console.log(error);
    return new Response(
      JSON.stringify({ error: 'OpenAI call failed', message: error }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
  console.log('🤖 response', response);

  if (response?.error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  const cost = calculateTokenPrice(response.model, response.usage);
  console.log('🤑 cost', cost);
  const profitMargin = 2;

  const accountWrite = await supabaseClient
    .from('accounts')
    .update({ credit: account?.credit - cost * profitMargin })
    .match({ user_id: user?.id });

  console.log('🏦 accountWrite', { accountWrite });

  try {
    const reply = {
      content: response?.choices[0].message?.content,
      ...response,
    };

    console.log('🚀 Returning data', JSON.stringify(reply, null, 2));
    return new Response(JSON.stringify(reply), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
