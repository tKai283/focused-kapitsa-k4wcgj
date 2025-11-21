// src/components/LevelSelect.jsx
import React from "react";
import "../styles.css";

export default function LevelSelect({ onSelect, onBack }) {
  const levels = [
    {
      id: "easy",
      label: "初級",
      img: "/images/初.jpg",
    },
    {
      id: "normal",
      label: "中級",
      img: "/images/中.jpg",
    },
    {
      id: "hard",
      label: "上級",
      img: "/images/上.jpg",
    },
    {
      id: "expert",
      label: "超級",
      img: "/images/超.jpg",
    },
  ];

  return (
    <div className="level-select-container">
      <h2>🎮 モード選択 🎮</h2>
      <div className="level-cards">
        {levels.map((level) => (
          <div
            key={level.id}
            className="level-card"
            onClick={() => onSelect(level.id)}
          >
            <img src={level.img} alt={level.label} className="level-img" />
            <div className="level-label">{level.label}</div>
            <div className="level-desc">{level.description}</div>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="sub-btn">
        戻る
      </button>
    </div>
  );
}
