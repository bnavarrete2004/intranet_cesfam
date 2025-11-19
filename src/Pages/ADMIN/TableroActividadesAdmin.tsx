// ======================================================
// PÁGINA ADMINISTRATIVA: Tablero de Actividades CESFAM
// Ubicación: src/pages/TableroActividadesAdmin.tsx
// Descripción: Vista administrativa con CRUD completo
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { ActivitiesGridAdmin } from '@/components/common/ActivitiesGridAdmin';
import { ActivityFormDialog } from '@/components/common/ActivityFormDialog';
import type { Activity } from '@/types/activity';
import { mockActivities, sortActivitiesByDate } from '@/data/mockActivities';
import { Sparkles, Users, Calendar, Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/common/Toast';

// ======================================================
// COMPONENTE PRINCIPAL ADMIN
// ======================================================

const TableroActividadesAdmin: React.FC = () => {
  // ======================================================
  // HOOKS
  // ======================================================
  
  // Hook de notificaciones
  const toast = useToast();

  // ======================================================
  // ESTADOS
  // ======================================================

  // Actividades (simuladas, en producción vendrán de API)
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  
  // Estado de carga
  const [isLoading] = useState<boolean>(false);
  
  // Control del diálogo de formulario
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  // Actividad en edición (null = modo crear, Activity = modo editar)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  /**
   * Actividades ordenadas por fecha (más reciente primero)
   */
  const sortedActivities = useMemo(() => {
    return sortActivitiesByDate(activities);
  }, [activities]);

  /**
   * Estadísticas para el header
   */
  const stats = useMemo(() => {
    const now = new Date();
    const upcomingActivities = activities.filter(activity => activity.date > now);
    
    return {
      total: activities.length,
      upcoming: upcomingActivities.length,
      thisMonth: activities.filter(activity => 
        activity.date.getMonth() === now.getMonth() &&
        activity.date.getFullYear() === now.getFullYear()
      ).length
    };
  }, [activities]);

  // ======================================================
  // HANDLERS - CRUD OPERATIONS
  // ======================================================

  /**
   * Abre el diálogo para crear una nueva actividad
   */
  const handleCreateNew = () => {
    setEditingActivity(null);
    setIsDialogOpen(true);
  };

  /**
   * Abre el diálogo para editar una actividad existente
   */
  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsDialogOpen(true);
  };

  /**
   * Guarda una actividad (crear o actualizar)
   */
  const handleSave = (activityData: Omit<Activity, 'id'>) => {
    if (editingActivity) {
      // MODO EDICIÓN: actualizar actividad existente
      setActivities(prev => 
        prev.map(act => 
          act.id === editingActivity.id 
            ? { ...activityData, id: editingActivity.id }
            : act
        )
      );
      toast.success('✅ Actividad actualizada correctamente');
      console.log('✅ Actividad actualizada:', { ...activityData, id: editingActivity.id });
    } else {
      // MODO CREACIÓN: agregar nueva actividad
      const newActivity: Activity = {
        ...activityData,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      setActivities(prev => [newActivity, ...prev]);
      toast.success('✨ Actividad creada exitosamente');
      console.log('✅ Actividad creada:', newActivity);
    }
    
    setIsDialogOpen(false);
    setEditingActivity(null);
  };

  /**
   * Elimina una actividad
   */
  const handleDelete = (activityId: string) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta actividad?\n\nEsta acción no se puede deshacer.'
    );
    
    if (confirmed) {
      setActivities(prev => prev.filter(act => act.id !== activityId));
      toast.success('🗑️ Actividad eliminada correctamente');
      console.log('🗑️ Actividad eliminada:', activityId);
    }
  };

  /**
   * Cancela la edición/creación
   */
  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingActivity(null);
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* ======================================================
          HEADER DEL PANEL ADMINISTRATIVO
          ====================================================== */}
      <header className="bg-white shadow-lg border-b-4 border-[#009DDC]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
          {/* Título principal con indicador de admin */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Icono administrativo */}
              <div className="p-4 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              {/* Título y subtítulo */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
                  🔧 Panel Administrativo - Tablón CESFAM
                </h1>
                <p className="text-gray-600 mt-1">
                  Gestión completa de actividades, celebraciones y novedades
                </p>
              </div>
            </div>

            {/* Botón para crear nueva actividad */}
            <Button
              onClick={handleCreateNew}
              size="lg"
              className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:from-[#0088c4] hover:to-[#3de8d9] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Nueva Actividad
            </Button>
          </div>

          {/* ======================================================
              ESTADÍSTICAS DEL TABLERO
              ====================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total de actividades */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-400">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total de Actividades</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            {/* Actividades próximas */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-l-4 border-purple-400">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Próximas Actividades</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.upcoming}</p>
                </div>
              </div>
            </div>

            {/* Actividades del mes */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-400">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Este Mes</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.thisMonth}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badge de modo administrador */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border-2 border-amber-400 rounded-lg">
            <Shield className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-semibold text-amber-700">
              Modo Administrador Activo
            </span>
          </div>
        </div>
      </header>

      {/* ======================================================
          CONTENIDO PRINCIPAL - CUADRÍCULA CON CONTROLES ADMIN
          ====================================================== */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        {/* Mensaje informativo */}
        <div className="mb-8 bg-white rounded-xl shadow-md border-l-4 border-[#009DDC] p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#009DDC]" />
            Panel de Gestión de Actividades
          </h2>
          <p className="text-gray-600">
            Desde aquí puedes crear, editar y eliminar actividades del tablón. 
            Cada tarjeta incluye botones de acción para una gestión rápida y eficiente.
          </p>
        </div>

        {/* Cuadrícula de actividades con controles administrativos */}
        <ActivitiesGridAdmin
          activities={sortedActivities}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* ======================================================
          DIÁLOGO DE FORMULARIO (Crear/Editar)
          ====================================================== */}
      <ActivityFormDialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        onSave={handleSave}
        activity={editingActivity}
      />

      {/* ======================================================
          FOOTER
          ====================================================== */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p className="font-medium flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Panel Administrativo - CESFAM
            </p>
            <p className="mt-1">
              Centro de Salud Familiar · Gestión de Convivencia
            </p>
            <p className="mt-2 text-xs">
              © 2025 - Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>

      {/* ======================================================
          NOTAS TÉCNICAS
          ======================================================
          
          CONEXIÓN CON API - Ejemplo de implementación:
          
          // En un hook personalizado useActivities.ts
          const useActivities = () => {
            const [activities, setActivities] = useState<Activity[]>([]);
            const [isLoading, setIsLoading] = useState(true);
            const [error, setError] = useState<string | null>(null);
            
            // Fetch inicial
            useEffect(() => {
              fetchActivities();
            }, []);
            
            const fetchActivities = async () => {
              try {
                const response = await fetch('/api/activities');
                const data = await response.json();
                setActivities(data);
              } catch (err) {
                setError('Error al cargar actividades');
              } finally {
                setIsLoading(false);
              }
            };
            
            const createActivity = async (data: Omit<Activity, 'id'>) => {
              try {
                const response = await fetch('/api/activities', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                const newActivity = await response.json();
                setActivities(prev => [newActivity, ...prev]);
                return newActivity;
              } catch (err) {
                throw new Error('Error al crear actividad');
              }
            };
            
            const updateActivity = async (id: string, data: Partial<Activity>) => {
              try {
                const response = await fetch(`/api/activities/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                const updated = await response.json();
                setActivities(prev => 
                  prev.map(act => act.id === id ? updated : act)
                );
                return updated;
              } catch (err) {
                throw new Error('Error al actualizar actividad');
              }
            };
            
            const deleteActivity = async (id: string) => {
              try {
                await fetch(`/api/activities/${id}`, {
                  method: 'DELETE'
                });
                setActivities(prev => prev.filter(act => act.id !== id));
              } catch (err) {
                throw new Error('Error al eliminar actividad');
              }
            };
            
            return {
              activities,
              isLoading,
              error,
              createActivity,
              updateActivity,
              deleteActivity,
              refetch: fetchActivities
            };
          };
          
          SISTEMA DE PERMISOS:
          
          // En un contexto de autenticación
          interface User {
            id: string;
            name: string;
            role: 'admin' | 'funcionario';
            permissions: string[];
          }
          
          // Middleware de ruta protegida
          const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
            const { user, isLoading } = useAuth();
            
            if (isLoading) return <LoadingSpinner />;
            
            if (!user || user.role !== 'admin') {
              return <Navigate to="/tablero" replace />;
            }
            
            return <>{children}</>;
          };
          
          // Uso en router
          <Route 
            path="/admin/tablero" 
            element={
              <ProtectedAdminRoute>
                <TableroActividadesAdmin />
              </ProtectedAdminRoute>
            } 
          />
          
      ====================================================== */}
    </div>
  );
};

// ======================================================
// EXPORT
// ======================================================

export default TableroActividadesAdmin;