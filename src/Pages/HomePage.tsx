// ======================================================
// PÁGINA PRINCIPAL: Homepage Intranet CESFAM
// Ubicación: src/pages/Homepage.tsx
// Descripción: Centro de comando de la intranet
// ======================================================

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cardsn';
import { QuickAccessWidget } from '../components/common/QuickAccessWidget';
import type { Reminder, Notification } from '../types/homepage';
import { PRIORITY_CONFIG, NOTIFICATION_CONFIG } from '../types/homepage';
import {
  mockQuickAccess,
  mockReminders,
  mockNotifications,
  mockFeaturedEmployees,
  getGreeting,
  formatFullDate
} from '../data/mockHomepage';
import {
  Calendar,
  Bell,
  CheckCircle2,
  Circle,
  Megaphone,
  Users,
  TrendingUp,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

const Homepage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const currentUser = { nombre: 'María', apellidos: 'González' }; // Mock user

  // ======================================================
  // MANEJADORES
  // ======================================================

  const handleNavigate = (route: string) => {
    console.log('Navegando a:', route);
    // En producción: navigate(route)
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingReminders = reminders.filter(r => !r.completed).length;

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* ======================================================
          HERO HEADER
          ====================================================== */}
      <header className="bg-gradient-to-r from-[#009DDC] via-[#4DFFF3] to-[#52FFB8] shadow-2xl">
        <div className="max-w-[1800px] mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Saludo y fecha */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                {getGreeting()}, {currentUser.nombre}! 👋
              </h1>
              <p className="text-lg md:text-xl text-white/90 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatFullDate(new Date())}
              </p>
            </div>

            {/* Logo CESFAM */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20">
              <div className="text-center">
                <div className="text-6xl mb-2">🏥</div>
                <p className="text-white font-bold text-lg">CESFAM</p>
                <p className="text-white/80 text-sm">Intranet Institucional</p>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/30 rounded-lg">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{unreadCount}</p>
                  <p className="text-white/80 text-xs">Notificaciones</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{pendingReminders}</p>
                  <p className="text-white/80 text-xs">Pendientes</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-white/80 text-xs">Eventos hoy</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/30 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-white/80 text-xs">Funcionarios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================
          CONTENIDO PRINCIPAL - WIDGETS
          ====================================================== */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Accesos rápidos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#009DDC]" />
            Accesos Rápidos
          </h2>
          <QuickAccessWidget
            items={mockQuickAccess}
            onNavigate={handleNavigate}
          />
        </section>

        {/* Grid de widgets principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* WIDGET: Recordatorios */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
                Mis Recordatorios
                {pendingReminders > 0 && (
                  <span className="ml-auto px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                    {pendingReminders}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {reminders.slice(0, 4).map((reminder) => {
                  const priorityConfig = PRIORITY_CONFIG[reminder.priority];
                  return (
                    <div
                      key={reminder.id}
                      className={`
                        p-3 rounded-lg border-l-4
                        ${reminder.completed ? 'bg-gray-50 opacity-60' : 'bg-white'}
                        ${reminder.completed ? 'border-gray-300' : `border-${reminder.priority === 'high' ? 'red' : reminder.priority === 'medium' ? 'yellow' : 'gray'}-400`}
                        hover:shadow-md transition-all cursor-pointer
                      `}
                      onClick={() => toggleReminder(reminder.id)}
                    >
                      <div className="flex items-start gap-3">
                        <button className="mt-1">
                          {reminder.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {reminder.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {reminder.dueDate.toLocaleDateString('es-ES')}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${priorityConfig.badge} border`}>
                              {priorityConfig.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-[#009DDC] font-semibold hover:bg-blue-50 rounded-lg transition-colors">
                Ver todos los recordatorios →
              </button>
            </CardContent>
          </Card>

          {/* WIDGET: Notificaciones */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-blue-600" />
                Notificaciones
                {unreadCount > 0 && (
                  <span className="ml-auto px-2 py-1 bg-blue-500 text-white text-xs rounded-full animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => {
                  const config = NOTIFICATION_CONFIG[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className={`
                        p-3 rounded-lg ${config.bg}
                        ${notification.read ? 'opacity-60' : ''}
                        hover:shadow-md transition-all cursor-pointer
                      `}
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{config.icon}</span>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${config.color}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.date.toLocaleString('es-ES')}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-[#009DDC] font-semibold hover:bg-blue-50 rounded-lg transition-colors">
                Ver todas las notificaciones →
              </button>
            </CardContent>
          </Card>

          {/* WIDGET: Funcionarios Destacados */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-purple-600" />
                Destacados del Mes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {mockFeaturedEmployees.map((employee, index) => {
                  const initials = `${employee.nombre.charAt(0)}${employee.apellidos.charAt(0)}`;
                  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500'];
                  return (
                    <div
                      key={employee.id}
                      className="p-3 bg-gradient-to-r from-white to-purple-50 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full ${colors[index]} flex items-center justify-center text-white font-bold shadow-md`}>
                          {initials}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">
                            {employee.nombre} {employee.apellidos}
                          </p>
                          <p className="text-xs text-gray-600">{employee.area}</p>
                          <p className="text-xs text-purple-600 font-semibold mt-1">
                            🏆 {employee.logro}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Widgets de comunicados y próximas actividades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* WIDGET: Comunicados Recientes */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Megaphone className="w-5 h-5 text-red-600" />
                Comunicados Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-white hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                          Actualización del Protocolo de Atención de Urgencias
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Subdirección Médica</p>
                        <p className="text-xs text-gray-400 mt-1">20 de octubre, 2025</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleNavigate('/comunicados')}
                className="w-full mt-4 py-2 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Ver todos los comunicados
              </button>
            </CardContent>
          </Card>

          {/* WIDGET: Próximas Actividades */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-cyan-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-green-600" />
                Próximas Actividades
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[
                  { titulo: 'Almuerzo de Camaradería', fecha: '25 de octubre', emoji: '🍽️' },
                  { titulo: 'Torneo de Fútbol', fecha: '28 de octubre', emoji: '⚽' },
                  { titulo: 'Cumpleaños del Mes', fecha: '30 de octubre', emoji: '🎂' }
                ].map((actividad, i) => (
                  <div key={i} className="p-3 bg-white hover:bg-green-50 rounded-lg border border-gray-200 hover:border-green-200 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{actividad.emoji}</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {actividad.titulo}
                        </p>
                        <p className="text-xs text-gray-600">{actividad.fecha}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleNavigate('/actividades')}
                className="w-full mt-4 py-2 bg-gradient-to-r from-[#52FFB8] to-[#4DFFF3] text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Ver todas las actividades
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Widget de mini calendario (placeholder) */}
        <Card className="shadow-xl border-0 mt-6">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Calendario del Mes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Vista previa del calendario institucional</p>
              <button
                onClick={() => handleNavigate('/calendario')}
                className="px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Abrir Calendario Completo
              </button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* ======================================================
          FOOTER
          ====================================================== */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-16">
        <div className="max-w-[1800px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Columna 1: Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-4xl">🏥</div>
                <div>
                  <h3 className="font-bold text-lg">CESFAM</h3>
                  <p className="text-sm text-gray-400">Intranet Institucional</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Sistema integral de gestión y comunicación para el personal del Centro de Salud Familiar.
              </p>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <div>
              <h3 className="font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Calendario Institucional
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Comunicados Oficiales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Directorio de Funcionarios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Gestión de Licencias
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Soporte */}
            <div>
              <h3 className="font-bold mb-4">Soporte y Ayuda</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    📧 Soporte Técnico
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    📋 Políticas de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    📞 Contacto Mesa de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    ❓ Preguntas Frecuentes
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2025 CESFAM - Centro de Salud Familiar. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Intranet Institucional v1.0 | Sistema desarrollado para la gestión integral del personal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ======================================================
// EXPORT
// ======================================================

export default Homepage;