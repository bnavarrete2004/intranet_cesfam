import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js" // necesario para el carousel
import LoginPage from "./Pages/login"
import Calendario from "./Pages/Calendario"
import TableroActividades from "./Pages/TableroActividades"
import ComunicadosOficiales from "./Pages/ComunicadosOficiales"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComunicadosOficiales />} />
      </Routes>
    </Router>
  )
}



export default App

