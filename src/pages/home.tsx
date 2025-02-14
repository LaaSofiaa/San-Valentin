import LoveLetter from "../components/LoveLetter";
import DaysTogetherCounter from "../components/DaysTogetherCounter";
import React from "react";
import { motion } from "framer-motion";
import Snowfall from "../components/Heartfall";
import "../styles/home.css";

const LOVE_LETTER = `Querido Alejo,

Cada día a tu lado es una nueva aventura llena de alegría, amor y momentos inolvidables. Desde que llegaste a mi vida, todo ha tenido más color, más sentido y más magia. Eres mi compañero perfecto, mi mejor amigo y el amor más bonito que jamás imaginé tener.

Juntos hemos creado recuerdos hermosos, desde nuestras risas espontáneas hasta esos abrazos que lo dicen todo sin necesidad de palabras. Me encanta la forma en que iluminas mis días, cómo conviertes lo simple en especial y cómo cada instante a tu lado se siente como un regalo.

Este mes celebramos 11 meses de amor, de apoyo incondicional, de crecer juntos y de descubrir en el otro un hogar. No hay nada que desee más que seguir compartiendo la vida contigo, seguir soñando juntos y seguir escribiendo nuestra historia, llena de amor y felicidad.

Gracias por ser quien eres, por amarme tanto y por hacerme sentir tan afortunada. Te amo con todo mi corazón, hoy y siempre. ❤️`;

export default function Home() {
  return (
    <main className="main-container">
      <Snowfall />
      
      {/* Fondo de cuadrícula */}
      <div className="grid-background">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>
      
      <div className="content-container">
        
        <h1 className="main-title">Feliz San Valentín</h1>
        
        {/* Botones de navegación */}
        <div className="navigation-buttons">
          {[
            { href: "/", label: "Inicio" },
            { href: "/gallery", label: "Galería" },
            { href: "/playlist", label: "Playlist" },
            { href: "/wordsearch", label: "Sopa de Letras" },
          ].map((nav, index) => (
            <motion.a
              key={index}
              href={nav.href}
              className="nav-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {nav.label}
            </motion.a>
          ))}
        </div>
        
        {/* Información */}
        <div className="info-container">
          
          <div className="counter-container">
            <h2 className="section-title">Días Juntos</h2>
            <DaysTogetherCounter startDate="2024-03-19" />
          </div>
          
          <div className="letter-container">
            <h2 className="section-title">Carta de Amor</h2>
            <LoveLetter content={LOVE_LETTER} />
          </div>
        </div>
      </div>
    </main>
  );
}
