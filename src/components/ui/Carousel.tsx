import React from "react"
import slide1 from "../images/cesfam_1.jpg"
import slide2 from "../images/cesfam_2.jpg"
import slide3 from "../images/cesfam_3.jpg"

export default function Carousel() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide max-w-4xl h-64 mx-auto mt-6"
      data-ride="carousel"
    >
      {/* Indicadores */}
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>

      {/* Slides */}
      <div className="carousel-inner h-full">
        <div className="carousel-item active h-full">
          <img
            className="d-block w-full h-full object-cover rounded-lg"
            src={slide1}
            alt="First slide"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            className="d-block w-full h-full object-cover rounded-lg"
            src={slide2}
            alt="Second slide"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            className="d-block w-full h-full object-cover rounded-lg"
            src={slide3}
            alt="Third slide"
          />
        </div>
      </div>

      {/* Controles */}
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}

