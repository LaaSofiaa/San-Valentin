import { Link } from "react-router-dom";
import React from "react";

interface NavigationButtonsProps {
  className?: string; // Añadir className como prop opcional
}

function NavigationButtons({ className }: NavigationButtonsProps) {
  return (
    <nav className={`flex justify-center space-x-4 mb-8 ${className}`}>
      <Link to="/" className="text-pink-600 hover:text-pink-800">
        Inicio
      </Link>
      <Link to="/gallery" className="text-pink-600 hover:text-pink-800">
        Galería
      </Link>
      <Link to="/playlist" className="text-pink-600 hover:text-pink-800">
        Playlist
      </Link>
      <Link to="/wordsearch" className="text-pink-600 hover:text-pink-800">
        Sopa de Letras
      </Link>
    </nav>
  );
}

export default NavigationButtons;