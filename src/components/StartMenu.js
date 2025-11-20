// src/components/StartMenu.jsx
import React, { useState } from "react";
import "../styles.css";

export default function StartMenu({ onSelect }) {
  const slidesData = [
    [
      { img: "/images/メイン.png", target: "level" },
      { img: "/images/ラッシュ.png", target: null },
      { img: "/images/遊び方説明.png", target: null },
    ],
    [
      { img: "/images/詳細設定黒板.jpg", target: null },
      { img: "/images/音量調整（3）.jpg", target: null },
      { img: "/images/エクストラ黒板.jpg", target: null },
    ],
    [
      { img: "/images/ラッシュ.png", target: null },
      { img: "/images/メイン.png", target: "level" },
      { img: "/images/ラッシュ.png", target: null },
    ],
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slidesData.length);
  };

  return (
    <div className="startmenu-slider">
      {/* 黒板固定 */}
      <img
        src="/images/kokuban12.png"
        className="startmenu-background"
        alt="黒板"
      />

      {/* スライド */}
      <div className="startmenu-slides">
        {slidesData.map((slide, i) => (
          <div
            key={i}
            className={`startmenu-slide ${i === index ? "active" : ""}`}
          >
            <div className="startmenu-menu-items">
              {slide.map((item, j) => (
                <img
                  key={j}
                  src={item.img}
                  alt={`menu-${j}`}
                  onClick={() => {
                    if (item.target) onSelect(item.target);
                  }}
                  style={{ cursor: item.target ? "pointer" : "default" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ボタン */}
      <button className="startmenu-prev" onClick={handlePrev}>
        &lt;
      </button>
      <button className="startmenu-next" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}
