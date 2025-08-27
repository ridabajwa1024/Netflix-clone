
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://hzpdtvdvrunvnvyznviy.supabase.co";  
const supabaseAnonKey = "sb_publishable_U13rAeOzqhLpVKBCxazbsg_rsCP6ORT";  


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
