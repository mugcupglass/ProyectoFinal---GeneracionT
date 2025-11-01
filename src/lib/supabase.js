import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Crear cliente de Supabase solo si las variables están configuradas
// Si no, será null y la app usará localStorage como fallback
let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Error inicializando Supabase:', error);
    supabase = null;
  }
} else {
  console.warn('⚠️ Variables de entorno de Supabase no configuradas. La app funcionará con localStorage.');
}

export { supabase };
export default supabase;

