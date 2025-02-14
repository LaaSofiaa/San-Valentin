import { useEffect } from "react";
import "../global.css";

export default function Snowfall() {
  useEffect(() => {
    const createHeart = () => {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️"; // Corazón en lugar de copo de nieve
        heart.classList.add("heart");

      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 3 + 2}s`; 
      heart.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`; 

      document.body.appendChild(heart);
      setTimeout(() => {
        heart.remove();
      }, 5000);
    };

    const interval = setInterval(createHeart, 100);
    return () => clearInterval(interval);
  }, []);

  return null;
}
