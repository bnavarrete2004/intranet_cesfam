import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import Carousel from "react-bootstrap/Carousel"
import Carouselcn from "@/components/ui/Carouselcn"

import slide1 from "../components/images/cesfam_1.jpg"
import slide2 from "../components/images/cesfam_2.jpg"
import slide3 from "../components/images/cesfam_3.jpg"

export default function HomePage() {
  const slides = [slide1, slide2, slide3]

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
      </div>
    </div>
  )
}
