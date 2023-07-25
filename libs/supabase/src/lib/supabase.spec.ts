import { supabase } from './supabase';

describe('supabase', () => {
  it('should work', () => {
    expect(supabase()).toEqual('supabase');
  });
});
