import React, { useState } from "react";
import TopSlide from "./components/TopSlide";
import StartMenu from "./components/StartMenu";
import LevelSelect from "./components/LevelSelect";
import QuestionCount from "./components/QuestionCount";
import TimeSelect from "./components/TimeSelect";
import WaitScreen from "./components/WaitScreen";
import Quiz from "./components/Quiz";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("top"); // 最初のページ
  const [level, setLevel] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(30);

  return (
    <div className="App">
      {/* トップページ */}
      {page === "top" && (
        <TopSlide
          onStart={() => setPage("startMenu")}
        />
      )}

      {/* StartMenu */}
      {page === "startMenu" && (
        <StartMenu
          onSelect={(target) => {
            if (target === "level") setPage("level");
          }}
          onBack={() => setPage("top")}
        />
      )}

      {/* レベル選択画面 */}
      {page === "level" && (
        <LevelSelect
          onSelect={(lvl) => {
            setLevel(lvl);
            setPage("count");
          }}
          onBack={() => setPage("startMenu")}
        />
      )}

      {/* 問題数選択 */}
      {page === "count" && (
        <QuestionCount
          onSelect={(count) => {
            setQuestionCount(count);
            setPage("time");
          }}
          onBack={() => setPage("level")}
        />
      )}

      {/* 制限時間選択 */}
      {page === "time" && (
        <TimeSelect
          onSelect={(time) => {
            setTimeLimit(time);
            setPage("wait");
          }}
          onBack={() => setPage("count")}
        />
      )}

      {/* 開始前待機画面 */}
      {page === "wait" && (
        <WaitScreen
          level={level}
          questionCount={questionCount}
          timeLimit={timeLimit}
          onStart={() => setPage("quiz")}
          onBack={() => setPage("time")}
        />
      )}

      {/* クイズ画面 */}
      {page === "quiz" && (
        <Quiz
          level={level}
          questionCount={questionCount}
          timeLimit={timeLimit}
          onBack={() => setPage("level")}
        />
      )}
    </div>
  );
}
