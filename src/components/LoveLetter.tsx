"use client";

import { motion } from "framer-motion";
import React from "react";
interface LoveLetterProps {
  content: string;
  className?: string; 
}

export default function LoveLetter({ content, className }: LoveLetterProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mx-auto ${className}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-pink-300">
        <div className="relative">
          {/* Decoración de esquina */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-200 rounded-full" />
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-200 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-200 rounded-full" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-200 rounded-full" />

          {/* Contenido de la carta */}
          <div className="whitespace-pre-wrap text-lg text-gray-700 leading-relaxed">{content}</div>
        </div>
      </div>
    </motion.div>
  );
}