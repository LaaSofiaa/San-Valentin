import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Snowfall from "../components/Heartfall";
import React from "react";
import "../styles/search.css";

// Palabras para la sopa de letras
const WORDS = ["AMOR", "BESOS", "ABRAZOS", "CARIÑO", "ROMANCE", "VACA", "HAGASE", "SIGA", "CORAZON", "ALEJO", "SOFI"];
const GRID_SIZE = 10;

// Generar la sopa de letras
function generateWordSearch() {
  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  const directions = [
    [0, 1], [1, 0], [1, 1], [-1, 1],
  ];

  WORDS.forEach((word) => {
    let placed = false;
    while (!placed) {
      const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);

      if (
        x + dx * (word.length - 1) < GRID_SIZE &&
        x + dx * (word.length - 1) >= 0 &&
        y + dy * (word.length - 1) < GRID_SIZE &&
        y + dy * (word.length - 1) >= 0
      ) {
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          if (grid[y + dy * i][x + dx * i] !== "") {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            grid[y + dy * i][x + dx * i] = word[i];
          }
          placed = true;
        }
      }
    }
  });

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === "") {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return grid;
}

export default function WordSearch() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [tempSelection, setTempSelection] = useState<{ row: number; col: number }[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setGrid(generateWordSearch());
  }, []);

  useEffect(() => {
    if (foundWords.length === WORDS.length) {
      setShowPopup(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [foundWords]);

  const checkWordInDirection = (word, row, col, dx, dy) => {
    let cells = [];
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dy;
      const newCol = col + i * dx;
      if (
        newRow < 0 || newRow >= GRID_SIZE ||
        newCol < 0 || newCol >= GRID_SIZE ||
        grid[newRow][newCol] !== word[i]
      ) {
        return null; // La palabra no coincide en esta dirección
      }
      cells.push({ row: newRow, col: newCol });
    }
    return cells; // Devuelve las celdas que forman la palabra
  };

  const handleLetterClick = (letter, row, col) => {
    const newTempSelection = [...tempSelection, { row, col }];
    setTempSelection(newTempSelection);

    WORDS.forEach((word) => {
      if (!foundWords.includes(word) && word.startsWith(letter)) {
        const directions = [
          [0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1],
        ];
        for (const [dx, dy] of directions) {
          const cells = checkWordInDirection(word, row, col, dx, dy);
          if (cells) {
            setFoundWords((prev) => [...prev, word]);
            setSelectedCells((prev) => [...prev, ...cells]);
            setTempSelection([]);
            return;
          }
        }
      }
    });

    // Si no se encontró una palabra, deseleccionar las celdas temporales después de un breve retraso
    setTimeout(() => {
      setTempSelection([]);
    }, 500);
  };

  return (
    <div className="main-container">
      <Snowfall />
      <div className="grid-background">
        {Array.from({ length: 64 }).map((_, index) => (
          <div key={index} />
        ))}
      </div>

      {/* Contenido */}
      <div className="content-container wordsearch-content">
        <h1 className="main-title">Sopa de Letras</h1>

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

        {/* Cuadrícula de la sopa de letras */}
        <div className="wordsearch-grid">
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                className={`wordsearch-cell ${
                  selectedCells.some((cell) => cell.row === rowIndex && cell.col === colIndex) ? "highlight" : ""
                } ${
                  tempSelection.some((cell) => cell.row === rowIndex && cell.col === colIndex) ? "temp-highlight" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLetterClick(letter, rowIndex, colIndex)}
              >
                {letter}
              </motion.button>
            ))
          )}
        </div>

        {/* Lista de palabras a encontrar */}
        <div className="wordsearch-wordlist">
          {WORDS.map((word) => (
            <div
              key={word}
              className={`wordsearch-word ${foundWords.includes(word) ? "found" : ""}`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Popup de felicitación */}
      {showPopup && (
        <div className="wordsearch-popup">
          <div className="wordsearch-popup-content">
            <h2 className="popup-title">¡Te Amo!</h2>
            <p>Has encontrado todas las palabras. ¡Eres increíble!</p>
            <button className="popup-button" onClick={() => setShowPopup(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}