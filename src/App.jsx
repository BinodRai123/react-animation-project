import React, { useRef, useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const containerRef = useRef(null);
  const [scales, setScales] = useState([]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const cards = container.querySelectorAll(".scroll-item");
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      const newScales = Array.from(cards).map((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        // Closer cards get larger (scale between 0.8 and 1.1)
        const scale = Math.max(0.8, 1.1 - distance / 400);
        return scale;
      });

      setScales(newScales);
    };

    handleScroll(); // run initially
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <h1>Smooth Scroll Effects <span>using React</span></h1>

      <div className="scroll-list__wrp" ref={containerRef}>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="scroll-item"
            style={{ transform: `scale(${scales[i] || 0.8})` }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
