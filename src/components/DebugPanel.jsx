// src/components/DebugPanel.jsx
import React from "react";

export default function DebugPanel({
  questionNumber,
  questionCount,
  remainingQuestions,
  isChecking,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "8px 10px",
        fontSize: "12px",
        zIndex: 99999,
        borderBottomRightRadius: "8px",
      }}
    >
      <p>
        <strong>[デバッグ情報]</strong>
      </p>
      <p>questionNumber（正解数）: {questionNumber}</p>
      <p>Index計算値: {questionNumber - 1}</p>
      <p>目標正解数: {questionCount}</p>
      <p>残り問題ストック: {remainingQuestions}</p>
      <p>処理中(isChecking): {isChecking ? "true" : "false"}</p>
    </div>
  );
}
