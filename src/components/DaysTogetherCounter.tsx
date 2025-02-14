import React, { useState, useEffect } from "react";

interface DaysTogetherCounterProps {
  startDate: string;
}

const DaysTogetherCounter: React.FC<DaysTogetherCounterProps> = ({ startDate }) => {
  const calculateTimeTogether = () => {
    const start = new Date(startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeTogether, setTimeTogether] = useState(calculateTimeTogether());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTogether(calculateTimeTogether());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-container">
      <div className="time-grid">
        <div className="time-box">
          <span className="time-value">{timeTogether.days}</span>
          <span className="time-label">Días</span>
        </div>
        <div className="time-box">
          <span className="time-value">{timeTogether.hours}</span>
          <span className="time-label">Horas</span>
        </div>
        <div className="time-box">
          <span className="time-value">{timeTogether.minutes}</span>
          <span className="time-label">Minutos</span>
        </div>
        <div className="time-box">
          <span className="time-value">{timeTogether.seconds}</span>
          <span className="time-label">Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default DaysTogetherCounter;
