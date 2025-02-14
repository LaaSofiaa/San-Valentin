import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import Playlist from "./pages/playlist";
import WordSearch from "./pages/word-search";
import "./global.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/wordsearch" element={<WordSearch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);