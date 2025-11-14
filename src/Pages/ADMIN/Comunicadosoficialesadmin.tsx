// ======================================================
// PÁGINA ADMINISTRATIVA: Comunicados Oficiales CESFAM
// Ubicación: src/pages/ComunicadosOficialesAdmin.tsx
// Descripción: Panel administrativo para gestionar comunicados
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { FormularioComunicado } from '@/components/common/FormularioComunicado';
import type { Announcement, AnnouncementCategory } from '@/types/announcement';
import { mockAnnouncements, sortAnnouncementsByDate } from '@/data/mockAnnouncements';
import { 
  Megaphone, Shield, FileCheck, AlertCircle, Plus, 
  CheckCircle2, Edit, Trash2, Filter, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

const ComunicadosOficialesAdmin: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [comunicadoEditar, setComunicadoEditar] = useState<Announcement | undefined>();
  const [filterCategory, setFilterCategory] = useState<AnnouncementCategory | 'all'>('all');

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  const sortedAnnouncements = useMemo(() => {
    let filtered = announcements;
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(a => a.category === filterCategory);
    }
    
    return sortAnnouncementsByDate(filtered);
  }, [announcements, filterCategory]);

  const stats = useMemo(() => {
    const totalAttachments = announcements.reduce(
      (sum, announcement) => sum + (announcement.attachments?.length || 0),
      0
    );

    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentAnnouncements = announcements.filter(
      announcement => announcement.publicationDate >= lastWeek
    );

    const urgentCount = announcements.filter(
      a => a.category === 'urgente'
    ).length;

    return {
      total: announcements.length,
      recent: recentAnnouncements.length,
      attachments: totalAttachments,
      urgent: urgentCount
    };
  }, [announcements]);

  // ======================================================
  // MANEJADORES
  // ======================================================

  const mostrarMensajeExito = (title: string, description: string) => {
    setSuccessMessage({ title, description });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAgregarComunicado = (nuevoComunicado: Omit<Announcement, 'id' | 'publicationDate'>) => {
    const nuevoId = `ANN${(announcements.length + 1).toString().padStart(3, '0')}`;
    
    const comunicadoCompleto: Announcement = {
      id: nuevoId,
      ...nuevoComunicado,
      publicationDate: new Date(),
    };

    setAnnouncements((prev) => [comunicadoCompleto, ...prev]);
    
    mostrarMensajeExito(
      '¡Comunicado publicado!',
      'El comunicado ha sido publicado exitosamente'
    );
  };

  const handleEditarClick = (announcement: Announcement) => {
    setComunicadoEditar(announcement);
    setDialogOpen(true);
  };

  const handleGuardarEdicion = (comunicadoEditado: Omit<Announcement, 'id' | 'publicationDate'>) => {
    if (!comunicadoEditar) return;

    setAnnouncements((prev) =>
      prev.map((comm) =>
        comm.id === comunicadoEditar.id
          ? { ...comunicadoEditado, id: comunicadoEditar.id, publicationDate: comunicadoEditar.publicationDate }
          : comm
      )
    );

    mostrarMensajeExito(
      '¡Comunicado editado exitosamente!',
      'El comunicado ha sido editado exitosamente'
    );

    setComunicadoEditar(undefined);
  };

  const handleEliminar = (announcement: Announcement) => {
    const confirmar = window.confirm(
      `¿Está seguro que desea eliminar el comunicado "${announcement.title}"?`
    );

    if (confirmar) {
      setAnnouncements((prev) => prev.filter((comm) => comm.id !== announcement.id));
      
      mostrarMensajeExito(
        '¡Comunicado eliminado exitosamente!',
        'El comunicado ha sido eliminado exitosamente'
      );
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setComunicadoEditar(undefined);
    }
  };

  const handleExportar = () => {
    // Funcionalidad futura de exportación
    alert('Funcionalidad de exportación próximamente');
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* ======================================================
          MENSAJE DE ÉXITO
          ====================================================== */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-white border-2 border-[#52FFB8] rounded-xl shadow-lg p-4 flex items-center gap-3">
            <div className="p-2 bg-[#52FFB8]/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-[#52FFB8]" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{successMessage.title}</p>
              <p className="text-sm text-gray-600">{successMessage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          HEADER DEL PANEL ADMINISTRATIVO
          ====================================================== */}
      <header className="bg-white shadow-xl border-b-4 border-[#009DDC]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {/* Título principal */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-[#009DDC] to-[#0088c4] rounded-2xl shadow-lg">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                  📢 Comunicados Oficiales
                </h1>
                <p className="text-gray-600 mt-1">
                  Panel Administrativo · Gestión de Comunicados
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setComunicadoEditar(undefined);
                  setDialogOpen(true);
                }}
                className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:opacity-90 shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Publicar Comunicado
              </Button>

              <Button
                variant="outline"
                onClick={handleExportar}
                className="border-2 border-gray-200 hover:border-[#009DDC]"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Banner informativo administrativo */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Panel de Administración
                </h3>
                <p className="text-sm text-gray-700">
                  Desde aquí puede crear, editar y eliminar comunicados oficiales. 
                  Recuerde que todos los cambios son visibles inmediatamente para todos los funcionarios.
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Recientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recent}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Megaphone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Adjuntos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.attachments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Urgentes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as AnnouncementCategory | 'all')}
              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium"
            >
              <option value="all">Todas las categorías</option>
              <option value="general">📋 General</option>
              <option value="urgente">🚨 Urgente</option>
              <option value="normativa">📜 Normativa</option>
              <option value="administrativa">🏢 Administrativa</option>
              <option value="informativa">📰 Informativa</option>
            </select>
            
            {filterCategory !== 'all' && (
              <span className="text-sm text-gray-600">
                Mostrando <span className="font-bold text-[#009DDC]">{sortedAnnouncements.length}</span> de {stats.total}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ======================================================
          LISTA DE COMUNICADOS CON ACCIONES ADMIN
          ====================================================== */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Lista de comunicados con botones de admin */}
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => (
            <div key={announcement.id} className="relative">
              {/* Card del comunicado */}
              <div className="bg-white rounded-lg shadow-md border-2 border-gray-100 hover:border-[#009DDC] transition-all p-6">
                {/* Botones de acción siempre visibles */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={() => handleEditarClick(announcement)}
                    className="p-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg hover:scale-105"
                    title="Editar comunicado"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEliminar(announcement)}
                    className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg hover:scale-105"
                    title="Eliminar comunicado"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Contenido del comunicado */}
                <div className="flex items-start gap-4 pr-20">
                  {/* Icono según categoría */}
                  <div className={`
                    p-3 rounded-lg flex-shrink-0
                    ${announcement.category === 'urgente' ? 'bg-red-100' : 
                      announcement.category === 'normativa' ? 'bg-purple-100' : 
                      announcement.category === 'informativa' ? 'bg-green-100' :
                      announcement.category === 'administrativa' ? 'bg-orange-100' : 'bg-blue-100'}
                  `}>
                    <Megaphone className={`
                      w-6 h-6
                      ${announcement.category === 'urgente' ? 'text-red-600' : 
                        announcement.category === 'normativa' ? 'text-purple-600' : 
                        announcement.category === 'informativa' ? 'text-green-600' :
                        announcement.category === 'administrativa' ? 'text-orange-600' : 'text-blue-600'}
                    `} />
                  </div>

                  <div className="flex-1">
                    {/* Badge de categoría */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                        {announcement.category === 'general' && '📋 General'}
                        {announcement.category === 'urgente' && '🚨 Urgente'}
                        {announcement.category === 'normativa' && '📜 Normativa'}
                        {announcement.category === 'administrativa' && '🏢 Administrativa'}
                        {announcement.category === 'informativa' && '📰 Informativa'}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {announcement.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        📅 {announcement.publicationDate.toLocaleDateString('es-CL')}
                      </span>
                      {announcement.attachments && announcement.attachments.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            📎 {announcement.attachments.length} adjunto{announcement.attachments.length > 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Descripción/Contenido */}
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {announcement.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sortedAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No hay comunicados en esta categoría</p>
            </div>
          )}
        </div>
      </main>

      {/* ======================================================
          MODAL DE FORMULARIO
          ====================================================== */}
      <FormularioComunicado
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={comunicadoEditar ? handleGuardarEdicion : handleAgregarComunicado}
        comunicadoEditar={comunicadoEditar}
      />
    </div>
  );
};

export default ComunicadosOficialesAdmin;