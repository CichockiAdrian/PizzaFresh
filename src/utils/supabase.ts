import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// 🔑 Replace with your Supabase project credentials
const SUPABASE_URL = 'https://aicmfwpxudubtbhnhnfr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kraWuDo1euOifcJ_JBn5Pg_vfGVrscF';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});