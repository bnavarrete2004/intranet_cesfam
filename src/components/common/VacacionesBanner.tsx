import React from 'react';
import { CalendarDays, Clock, Leaf } from 'lucide-react';

const VacacionesBanner: React.FC = () => {
  return (
    <div className="relative w-full p-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 overflow-hidden shadow-lg">
      {/* Fondo decorativo de olas */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L48,160C96,160,192,160,288,144C384,128,480,96,576,90.7C672,85,768,107,864,133.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Vectores decorativos (posicionados con absolute) */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2 opacity-70">
        <Clock className="w-8 h-8 text-white" />
        <Clock className="w-6 h-6 text-white mt-4" />
      </div>
      <div className="absolute bottom-4 right-16 z-10 flex space-x-2 opacity-70">
        <Leaf className="w-8 h-8 text-white transform rotate-45" />
        <Leaf className="w-6 h-6 text-white" />
      </div>
      <div className="absolute bottom-8 right-4 z-10 opacity-70">
        <span className="block w-4 h-4 bg-white rounded-full opacity-50 animate-pulse"></span>
        <span className="block w-2 h-2 bg-white rounded-full mt-1 ml-4 opacity-70 animate-pulse"></span>
      </div>
      <div className="absolute top-12 right-24 z-10 opacity-70">
        <span className="block w-3 h-3 bg-white rounded-full opacity-60 animate-pulse"></span>
      </div>
       <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 opacity-70">
        <CalendarDays className="w-16 h-16 text-white opacity-40" />
      </div>


      {/* Contenido principal del banner */}
      <div className="relative z-20 flex items-center space-x-6">
        {/* Icono de la izquierda */}
        <div className="flex-shrink-0 p-4 bg-blue-700 bg-opacity-70 rounded-full">
          <CalendarDays className="w-10 h-10 text-white" />
        </div>

        {/* Texto del título y subtítulo */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Solicitudes de Vacaciones</h2>
          <p className="text-white text-opacity-90 max-w-md">
            Envía o aprueba tus solicitudes de vacaciones de forma sencilla y eficiente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacacionesBanner;