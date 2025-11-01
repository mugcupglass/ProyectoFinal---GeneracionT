// Script de prueba para verificar conexión con Supabase
import { supabase } from '../lib/supabase';

export const testSupabaseConnection = async () => {
  console.log('🔍 Iniciando prueba de conexión con Supabase...');
  
  // Verificar si Supabase está inicializado
  if (!supabase) {
    console.error('❌ Supabase no está inicializado');
    console.log('Variables de entorno:');
    console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL ? '✅ Configurada' : '❌ No configurada');
    console.log('REACT_APP_SUPABASE_ANON_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ No configurada');
    return false;
  }

  console.log('✅ Supabase está inicializado');
  console.log('URL:', process.env.REACT_APP_SUPABASE_URL);

  try {
    // Test 1: Verificar que la tabla 'todos' existe
    console.log('\n📋 Test 1: Verificando tabla "todos"...');
    const { data: todos, error: todosError } = await supabase
      .from('todos')
      .select('*')
      .limit(1);

    if (todosError) {
      console.error('❌ Error al acceder a la tabla "todos":', todosError);
      console.error('Código:', todosError.code);
      console.error('Mensaje:', todosError.message);
      console.error('Detalles:', todosError.details);
      console.error('Hint:', todosError.hint);
      
      if (todosError.code === '42P01') {
        console.error('💡 La tabla "todos" no existe. Ejecuta el script SQL en Supabase SQL Editor.');
      }
      if (todosError.code === '42501') {
        console.error('💡 Error de permisos. Verifica las políticas RLS en Supabase.');
      }
      return false;
    }

    console.log('✅ Tabla "todos" existe y es accesible');
    console.log('Tareas encontradas:', todos?.length || 0);

    // Test 2: Intentar insertar una tarea de prueba
    console.log('\n📝 Test 2: Intentando insertar una tarea de prueba...');
    const testTodo = {
      text: 'Tarea de prueba - ' + new Date().toISOString(),
      completed: false,
      category: 'Personal',
      priority: 'Media'
    };

    const { data: insertedTodo, error: insertError } = await supabase
      .from('todos')
      .insert([testTodo])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error al insertar tarea:', insertError);
      console.error('Código:', insertError.code);
      console.error('Mensaje:', insertError.message);
      console.error('Detalles:', insertError.details);
      
      if (insertError.code === '42501') {
        console.error('💡 Error de permisos RLS. Necesitas permitir INSERT en las políticas.');
      }
      if (insertError.code === '23502') {
        console.error('💡 Falta un campo requerido (NOT NULL). Verifica que todos los campos obligatorios estén presentes.');
      }
      return false;
    }

    console.log('✅ Tarea insertada correctamente:', insertedTodo);

    // Test 3: Eliminar la tarea de prueba
    console.log('\n🗑️ Test 3: Eliminando tarea de prueba...');
    const { error: deleteError } = await supabase
      .from('todos')
      .delete()
      .eq('id', insertedTodo.id);

    if (deleteError) {
      console.error('⚠️ Error al eliminar tarea de prueba:', deleteError);
      console.error('Puedes eliminarla manualmente desde Supabase');
    } else {
      console.log('✅ Tarea de prueba eliminada');
    }

    // Test 4: Verificar tabla user_settings
    console.log('\n⚙️ Test 4: Verificando tabla "user_settings"...');
    const { data: settings, error: settingsError } = await supabase
      .from('user_settings')
      .select('*')
      .limit(1);

    if (settingsError) {
      console.error('❌ Error al acceder a la tabla "user_settings":', settingsError);
      if (settingsError.code === '42P01') {
        console.error('💡 La tabla "user_settings" no existe. Ejecuta el script SQL en Supabase SQL Editor.');
      }
      return false;
    }

    console.log('✅ Tabla "user_settings" existe y es accesible');

    console.log('\n🎉 ¡Todas las pruebas pasaron! La conexión con Supabase funciona correctamente.');
    return true;

  } catch (error) {
    console.error('❌ Error inesperado:', error);
    return false;
  }
};

