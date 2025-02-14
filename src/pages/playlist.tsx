import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import React from "react";
import Snowfall from "../components/Heartfall";
import "../styles/playlist.css";

const SONGS = [
  { title: "I Wanna Be Yours", artist: "Arctic Monkeys", cover: "/imgs/a.jpg", src: "/audio/I Wanna Be Yours.mp3" },
  { title: "Formidable", artist: "Twenty One Pilots", cover: "/imgs/b.jpg", src: "/audio/Formidable.mp3" },
  { title: "Gottasadae", artist: "Bewhy", cover: "/imgs/c.jpg", src: "/audio/GOTTASADAE.mp3" },
  { title: "Avalon", artist: "DPR IAN", cover: "/imgs/d.jpg", src: "/audio/Avalon.mp3" },
  { title: "Beso", artist: "Jósean Log", cover: "/imgs/e.jpg", src: "/audio/Beso.mp3" },
  { title: "Look At Me", artist: "Twice", cover: "/imgs/f.jpg", src: "/audio/LOOK AT ME.mp3" },
];

export default function Playlist() {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = (index: number) => {
    if (currentSong === index) {
      audioRef.current?.pause();
      setCurrentSong(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = SONGS[index].src;
        audioRef.current.play();
      }
      setCurrentSong(index);
    }
  };

  return (
    <div className="main-container">
      <Snowfall />
      
      {/* Fondo de cuadrícula */}
      <div className="grid-background">
        {Array.from({ length: 64 }).map((_, index) => (
          <div key={index} />
        ))}
      </div>
      
      <h1 className="main-title">Nuestra Playlist</h1>
      
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
      
      {/* Lista de canciones */}
      <div className="playlist-grid">
        {SONGS.map((song, index) => (
          <motion.div 
            key={index} 
            className="playlist-card" 
            whileHover={{ scale: 1.02 }}
          >
            
            {/* Imagen de la canción */}
            <img 
              src={song.cover} 
              alt={song.title} 
              className="playlist-cover" 
            />
            
            {/* Información de la canción */}
            <div className="playlist-info">
              <h3 className="playlist-song-title">{song.title}</h3>
              <p className="playlist-artist">{song.artist}</p>
            </div>
            
            {/* Botón de reproducción/pausa */}
            <motion.button
              onClick={() => handlePlayPause(index)}
              className="playlist-button"
              whileTap={{ scale: 0.9 }}
            >
              {currentSong === index ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Elemento de audio */}
      <audio ref={audioRef} onEnded={() => setCurrentSong(null)} />
    </div>
  );
}
