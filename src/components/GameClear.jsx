// src/components/GameClear.jsx
import React from "react";
import "../styles.css";

export default function GameClear({ onBack }) {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "120px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #00c6ff, #0072ff)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "48px", textShadow: "0 0 10px black" }}>
        🎉 GAME CLEAR 🎉
      </h1>

      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        全問正解！すばらしい成績です！
      </p>

      <button
        style={{
          marginTop: "40px",
          padding: "12px 30px",
          fontSize: "18px",
          borderRadius: "8px",
        }}
        onClick={onBack}
      >
        ← START MENU に戻る
      </button>
    </div>
  );
}
