// src/components/ui/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode; // Puedes usar iconos de librerías como Material Design Icons o Font Awesome
  bgColor: string; // Para el color de fondo de la tarjeta
  textColor: string; // Para el color del texto
}

const Card: React.FC<CardProps> = ({ title, icon, bgColor, textColor }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-40 h-24 m-2`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="text-3xl mb-1">{icon}</div>
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
};

export default Card;