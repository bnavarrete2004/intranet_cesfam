import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Carousel from "react-bootstrap/Carousel";
import Carouselcn from "@/components/ui/Carouselcn";
import Card from "../components/ui/Card"; // Asegúrate de que la ruta sea correcta

// Importa los íconos específicos de la familia Font Awesome (Fa)
// Asegúrate de haber instalado react-icons: npm install react-icons
import { FaRegClipboard, FaRegFolder, FaBullhorn, FaRegCalendarAlt } from 'react-icons/fa';

import slide1 from "../components/images/cesfam_1.jpg";
import slide2 from "../components/images/cesfam_2.jpg";
import slide3 from "../components/images/cesfam_3.jpg";

export default function HomePage() {
  const slides = [slide1, slide2, slide3];

  return (
    <div className="px-4">
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

      <div className="pt-24 space-y-12">
        <h1 className="text-3xl font-bold mb-4">Bienvenida a la Homepage 🎉</h1>
        <p className="text-lg mb-6">
          Aquí irá el contenido de la página, con padding para que no quede debajo de la barra.
        </p>

        {/* Carousel de Bootstrap */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Bootstrap Carousel</h2>
          <Carousel className="max-w-4xl mx-auto rounded-lg">
            <Carousel.Item>
              <img
                className="d-block w-full h-64 object-cover"
                src={slide1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-full h-64 object-cover"
                src={slide2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-full h-64 object-cover"
                src={slide3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Carousel de Shadcn / Embla */}
        <div>
          <h2 className="text-xl font-semibold mb-2 mt-8">Shadcn / Embla Carousel</h2>
          <div className="max-w-4xl h-64 mx-auto">
            <Carouselcn slides={slides} />
          </div>
        </div>

        {/* Sección de las tarjetas debajo del último carrusel */}
        <div className="mt-12"> {/* Agrega un margen superior para separarlo del carrusel */}
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="flex flex-wrap justify-center sm:justify-start"> {/* Centra en pantallas pequeñas, alinea a la izquierda en grandes */}
            <Card
              title="Solicitudes"
              icon={<FaRegClipboard className="text-white" />}
              bgColor="#60A5FA" // Azul
              textColor="white"
            />
            <Card
              title="Archivos"
              icon={<FaRegFolder className="text-white" />}
              bgColor="#FCD34D" // Amarillo
              textColor="white"
            />
            <Card
              title="Anuncios"
              icon={<FaBullhorn className="text-white" />}
              bgColor="#EF4444" // Rojo
              textColor="white"
            />
            <Card
              title="Eventos"
              icon={<FaRegCalendarAlt className="text-white" />}
              bgColor="#34D399" // Verde
              textColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}