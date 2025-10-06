import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Carousel from "react-bootstrap/Carousel";
// Eliminamos Carouselcn porque no lo usaremos
import Card from "../components/ui/Card";
import { Calendar31 } from "../components/ui/Calendar31"; // Importa el componente Calendar31

// Importa los íconos de Font Awesome
import { FaRegClipboard, FaRegFolder, FaBullhorn, FaRegCalendarAlt } from 'react-icons/fa';

import slide1 from "../components/images/cesfam_1.jpg";
import slide2 from "../components/images/cesfam_2.jpg";
import slide3 from "../components/images/cesfam_3.jpg";

export default function HomePage() {
  const slides = [slide1, slide2, slide3]; // slides sigue siendo necesario para el carousel de Bootstrap

  return (
    <div className="px-4"> {/* Este px-4 aplica el padding general a todo el contenido */}
      {/* Barra superior */}
      <div
        className="fixed top-0 left-0 w-full h-16 shadow flex items-center px-4 z-50"
        style={{ backgroundColor: "#009DDC" }}
      >
        <Avatar>
          <AvatarImage src="/ruta/a/tu/avatar.jpg" alt="Perfil" />
          <AvatarFallback
            className="font-bold"
            style={{ backgroundColor: "#CDC7E5", color: "#000000" }}
          >
            BV
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Navbar fija debajo del perfil */}
      <nav className="fixed top-16 left-0 w-full h-14 flex justify-around items-center shadow-md bg-white z-40">
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <FaRegClipboard className="text-xl" />
          <span className="text-xs">Solicitudes</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-yellow-500 transition">
          <FaRegFolder className="text-xl" />
          <span className="text-xs">Archivos</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-red-500 transition">
          <FaBullhorn className="text-xl" />
          <span className="text-xs">Anuncios</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-green-500 transition">
          <FaRegCalendarAlt className="text-xl" />
          <span className="text-xs">Eventos</span>
        </button>
      </nav>

      {/* Contenido principal, ajustado para el espacio de las barras fijas */}
      <div className="pt-[140px] space-y-12"> {/* Ajustado a 140px para la barra superior (64px) + navbar (56px) = 120px + margen extra */}
        
        {/* Carousel de Bootstrap - Ahora ocupa todo el ancho del contenedor padre con padding */}
        <div className="w-full"> {/* Asegura que ocupe todo el ancho disponible */}
          <Carousel className="w-full mx-auto rounded-lg"> {/* w-full y mx-auto para centrar y ocupar el ancho con padding */}
            <Carousel.Item>
              <img className="d-block w-full h-64 object-cover rounded-lg" src={slide1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-full h-64 object-cover rounded-lg" src={slide2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-full h-64 object-cover rounded-lg" src={slide3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Sección de las tarjetas debajo del carrusel */}
        <div className="mt-12 mb-16"> {/* Margen superior para separarlo del carousel */}
          {/* Eliminamos el h2 "Acciones Rápidas" */}
          <div className="flex flex-wrap justify-center gap-6">
            <Card
              title="Solicitudes"
              icon={<FaRegClipboard className="text-white" />}
              bgColor="#60A5FA"
              textColor="white"
            />
            <Card
              title="Archivos"
              icon={<FaRegFolder className="text-white" />}
              bgColor="#FCD34D"
              textColor="white"
            />
            <Card
              title="Anuncios"
              icon={<FaBullhorn className="text-white" />}
              bgColor="#EF4444"
              textColor="white"
            />
            <Card
              title="Eventos"
              icon={<FaRegCalendarAlt className="text-white" />}
              bgColor="#34D399"
              textColor="white"
            />
          </div>
        </div>

        {/* Sección del calendario */}
        <div className="mt-16 pb-12">
          <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Fechas Importantes</h2> {/* Centrado en móvil, izquierda en sm+ */}
          <div className="flex justify-center sm:justify-start"> {/* Centra en móvil, a la izquierda en sm+, pero con un margen para no pegar tanto */}
             {/* Un div intermedio para aplicar margen horizontal y limitar el ancho */}
            <div className="mx-auto sm:mx-0 sm:ml-8 lg:ml-16"> {/* sm:ml-8 para un pequeño margen a la izquierda en pantallas medianas */}
              <Calendar31 />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}