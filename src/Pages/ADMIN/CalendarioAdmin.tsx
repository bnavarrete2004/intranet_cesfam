// ======================================================
// PÁGINA: Calendario Administrativo CESFAM
// Ubicación: src/pages/CalendarioAdmin.tsx
// Descripción: Vista administrativa con funcionalidades CRUD
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { CalendarHeader } from '@/components/ui/CalendarHeader';
import { CalendarGrid } from '@/components/common/CalendarGrid';
import { EventModal } from '@/components/ui/EventModal';
import { EventFormModal } from '@/components/common/EventFormModal';
import { DeleteConfirmModal } from '@/components/common/DeleteConfirmModal';
import type { CalendarEvent } from '@/types/calendar';
import type { EventFormData } from '@/types/calendarAdmin';
import { mockEvents } from '@/data/mockEvents';
import { getPreviousMonth, getNextMonth, formatDateToString } from '@/utils/dateUtils';
import { Plus, Shield } from 'lucide-react';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

const CalendarioAdmin: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  
  // Modales
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  // ======================================================
  // MANEJADORES DE NAVEGACIÓN
  // ======================================================

  const handlePreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
    setSelectedDate(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedEvent(null);
  };

  // ======================================================
  // MANEJADORES CRUD
  // ======================================================

  /**
   * Abrir modal para crear nuevo evento
   */
  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setFormMode('create');
    setIsFormModalOpen(true);
  };

  /**
   * Abrir modal para editar evento existente
   */
  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setFormMode('edit');
    setIsViewModalOpen(false);
    setIsFormModalOpen(true);
  };

  /**
   * Confirmar eliminación de evento
   */
  const handleDeleteClick = (event: CalendarEvent) => {
    setEventToDelete(event);
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  /**
   * Guardar evento (crear o editar)
   */
  const handleSaveEvent = (formData: EventFormData) => {
    if (formMode === 'create') {
      // Crear nuevo evento
      const newEvent: CalendarEvent = {
        id: Date.now(),
        titulo: formData.titulo,
        fecha: formData.fecha,
        horaInicio: formData.horaInicio,
        horaFin: formData.horaFin,
        descripcion: formData.descripcion,
        ubicacion: formData.ubicacion,
        tipo: formData.tipo,
        organizador: formData.organizador
      };
      
      setEvents([...events, newEvent]);
      console.log('Evento creado:', newEvent);
    } else {
      // Editar evento existente
      if (selectedEvent) {
        const updatedEvents = events.map(event =>
          event.id === selectedEvent.id
            ? {
                ...event,
                titulo: formData.titulo,
                fecha: formData.fecha,
                horaInicio: formData.horaInicio,
                horaFin: formData.horaFin,
                descripcion: formData.descripcion,
                ubicacion: formData.ubicacion,
                tipo: formData.tipo,
                organizador: formData.organizador
              }
            : event
        );
        
        setEvents(updatedEvents);
        console.log('Evento actualizado:', selectedEvent.id);
      }
    }
    
    setIsFormModalOpen(false);
    setSelectedEvent(null);
  };

  /**
   * Eliminar evento
   */
  const handleConfirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete.id));
      console.log('Evento eliminado:', eventToDelete.id);
      setEventToDelete(null);
    }
  };

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  const stats = useMemo(() => {
    const now = new Date();
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.fecha);
      return eventDate >= now;
    });
    
    return {
      total: events.length,
      upcoming: upcomingEvents.length,
      thisMonth: events.filter(event => {
        const eventDate = new Date(event.fecha);
        return eventDate.getMonth() === now.getMonth() &&
               eventDate.getFullYear() === now.getFullYear();
      }).length
    };
  }, [events]);

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* ======================================================
          BANNER ADMINISTRATIVO
          ====================================================== */}
      <div className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] py-3 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center gap-2 text-white">
            <Shield className="w-5 h-5" />
            <p className="font-semibold text-sm">
              Modo Administrativo Activo - Vista de Dirección/Subdirección
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          HEADER DEL CALENDARIO CON BOTÓN CREAR
          ====================================================== */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          showAddButton={true}
          onAddEvent={handleCreateEvent}
        />

        {/* Botón Crear Evento Flotante Adicional */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleCreateEvent}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Crear Nuevo Evento
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 font-medium">Total de Eventos</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
            <p className="text-sm text-gray-600 font-medium">Próximos Eventos</p>
            <p className="text-3xl font-bold text-gray-900">{stats.upcoming}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 font-medium">Este Mes</p>
            <p className="text-3xl font-bold text-gray-900">{stats.thisMonth}</p>
          </div>
        </div>

        {/* ======================================================
            CUADRÍCULA DEL CALENDARIO
            ====================================================== */}
        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />

        {/* ======================================================
            MODAL DE VISUALIZACIÓN CON BOTONES ADMIN INTEGRADOS
            ====================================================== */}
        <EventModal
          event={selectedEvent}
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          isAdminView={true}
          onEdit={handleEditEvent}
          onDelete={handleDeleteClick}
        />

        {/* ======================================================
            MODAL DE FORMULARIO (CREAR/EDITAR)
            ====================================================== */}
        <EventFormModal
          isOpen={isFormModalOpen}
          onClose={() => {
            setIsFormModalOpen(false);
            setSelectedEvent(null);
          }}
          onSave={handleSaveEvent}
          initialData={selectedEvent}
          mode={formMode}
        />

        {/* ======================================================
            MODAL DE CONFIRMACIÓN DE ELIMINACIÓN
            ====================================================== */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setEventToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          eventTitle={eventToDelete?.titulo || ''}
        />
      </div>
    </div>
  );
};

// ======================================================
// EXPORT
// ======================================================

export default CalendarioAdmin;