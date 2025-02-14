import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import Snowfall from "../components/Heartfall";
import "../styles/gallery.css";

const PHOTO_CATEGORIES = [
  {
    title: "Momentos Especiales",
    photos: ["/imgs/1.jpeg", "/imgs/2.jpeg", "/imgs/3.jpeg", "/imgs/4.jpeg"],
  },
  {
    title: "Raros Juntos",
    photos: ["/imgs/5.jpeg", "/imgs/6.jpeg", "/imgs/7.jpeg", "/imgs/8.jpeg"],
  },
  {
    title: "Citas Románticas",
    photos: ["/imgs/9.jpeg", "/imgs/10.jpeg", "/imgs/11.jpeg", "/imgs/12.jpeg"],
  },
  {
    title: "Just You",
    photos: ["/imgs/13.jpeg", "/imgs/14.jpeg", "/imgs/15.jpeg", "/imgs/16.jpeg"],
  },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="main-container">
      <Snowfall />

      <div className="grid-background">
        {Array.from({ length: 64 }).map((_, index) => (
          <div key={index} />
        ))}
      </div>

      <h1 className="main-title">Nuestra Galería de Amor</h1>

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

      {PHOTO_CATEGORIES.map((category, categoryIndex) => (
        <div key={categoryIndex} className="gallery-category">
          <h2 className="text-2xl font-semibold text-pink-400 mb-4">{category.title}</h2>
          <div className="gallery-grid">
            {category.photos.map((photo, photoIndex) => (
              <motion.img
                key={photoIndex}
                src={photo || "/placeholder.svg"}
                alt={`Foto ${categoryIndex + 1}-${photoIndex + 1}`}
                className="gallery-img"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedPhoto && (
        <div className="gallery-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="gallery-modal-content">
            <img
              src={selectedPhoto || "/placeholder.svg"}
              alt="Foto ampliada"
              className="gallery-modal-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}
