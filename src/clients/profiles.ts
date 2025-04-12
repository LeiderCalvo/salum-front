import { createClient } from "@supabase/supabase-js";

const BASE_URL = import.meta.env.VITE_DB_SUPABASE_BASE_URL
const API_KEY = import.meta.env.VITE_DB_SUPABASE_API_KEY

const SUPABASE = createClient(BASE_URL, API_KEY);

export default SUPABASE