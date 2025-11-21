// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Lives from "./Lives";
import DebugPanel from "./DebugPanel";
import Enemy from "./Enemy";
import LoadingScreen from "./LoadingScreen";
import ConfirmGiveUp from "./ConfirmGiveUp";
import TimeoutScreen from "./TimeoutScreen";
import QuestionCounter from "./QuestionCounter";
import ActionButtons from "./ActionButtons";
import MessageDisplay from "./MessageDisplay";
import LevelIntroScreen from "./LevelIntroScreen";
import GameOverOverlay from "./GameOverOverlay";
import allQuestions from "./questions";
import GameClear from "./GameClear";
import "../styles.css";

// 配列シャッフル関数
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ level, questionCount, timeLimit, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(3);
  const [result, setResult] = useState("");
  const [messageType, setMessageType] = useState("");
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [skipUsed, setSkipUsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);
  const [lastAnswer, setLastAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [warning, setWarning] = useState("");
  const [stage, setStage] = useState(1);
  const [showLevelIntro, setShowLevelIntro] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const FEEDBACK_DURATION = 1000;

  useEffect(() => {
    if (!result && !warning) return;
    const timer = setTimeout(() => {
      setResult("");
      setMessageType("");
      setWarning("");
    }, FEEDBACK_DURATION);
    return () => clearTimeout(timer);
  }, [result, warning]);

  const getLevelStage = (currentQuestionNum) => {
    const idx = currentQuestionNum - 1;
    if (idx === questionCount - 1) return "BOSS";

    let interval = 2;
    if (questionCount === 10) interval = 3;
    if (questionCount === 16) interval = 5;

    return Math.min(3, Math.floor(idx / interval) + 1);
  };

  // 初期化
  useEffect(() => {
    const filtered = allQuestions.filter((q) => q.level === level);
    const initialQuestions = shuffle(filtered);

    if (initialQuestions.length < questionCount) {
      setResult(
        `エラー: 勝利条件（${questionCount}問）に対し、問題が（${initialQuestions.length}問）しかありません。`
      );
      setMessageType("error");
      setCurrent(null);
      setQuestions([]);
      return;
    }

    const [firstQ, ...rest] = initialQuestions;
    setQuestions(rest);
    setCurrent(firstQ);

    // --- ここから初期化 ---
    setQuestionNumber(1);
    setLives(3);
    setSkipUsed(false);
    setIsGameOver(false);
    setAnswer("");
    setResult("");
    setWarning("");
    setMessageType("");

    setStage(getLevelStage(1));
    setShowLevelIntro(true);
    setTimeLeft(timeLimit);
    setIsChecking(false);

    // ★ この3つを必ず追加する
    setShowTimeout(false); // タイムアウト画面リセット
    setIsClear(false); // クリア状態リセット
    setShowConfirm(false); // あきらめる確認ダイアログリセット
    // -----------------------
  }, [level, questionCount, timeLimit]);

  // ★ 修正：stage を依存配列から削除
  useEffect(() => {
    if (!current || isGameOver) return;
    const newStage = getLevelStage(questionNumber);
    if (newStage !== stage) {
      setStage(newStage);
      setShowLevelIntro(true);
    }
  }, [questionNumber, current, isGameOver]);

  // 背景
  const getBackgroundStyle = () => {
    switch (stage) {
      case 1:
        return { background: "linear-gradient(to bottom, #56ab2f, #a8e063)" };
      case 2:
        return { background: "linear-gradient(to bottom, #f6d365, #fda085)" };
      case 3:
        return { background: "linear-gradient(to bottom, #ff512f, #1f1c18)" };
      case "BOSS":
        return { background: "linear-gradient(to bottom, #4b0082, #0d001a)" };
      default:
        return { background: "#000" };
    }
  };

  // タイマー
  useEffect(() => {
    if (
      !current ||
      showTimeout ||
      showConfirm ||
      showLevelIntro ||
      isGameOver ||
      isChecking
    )
      return;

    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [
    current,
    showTimeout,
    showConfirm,
    showLevelIntro,
    isGameOver,
    isChecking,
  ]);

  // 次の問題
  const advanceToNextProblem = (isCorrect = false) => {
    if (isCorrect && questionNumber === questionCount) {
      setIsClear(true);
      return;
    }

    if (questions.length === 0) {
      setResult("📭 問題がなくなりました... 終了します。");
      setMessageType("error");
      setCurrent(null);
      return;
    }

    const [q, ...rest] = questions;
    setQuestions(rest);
    setCurrent(q);
    setAnswer("");
    setWarning("");
    setTimeLeft(timeLimit);

    if (isCorrect) setQuestionNumber((p) => p + 1);
  };

  // 回答チェック
  const checkAnswer = () => {
    if (!current || isChecking) return;
    setIsChecking(true);

    const ans = answer.trim();

    if (/^[a-zA-Z]+$/.test(ans)) {
      setWarning("⚠️ ひらがなやカタカナで入力してください！");
      setMessageType("warning");
      setAnswer("");
      setIsChecking(false);
      return;
    }

    const readings = current.reading
      .replace(/、/g, ",")
      .split(",")
      .map((r) => r.trim());

    const isNearMatch = (input, correct) => {
      if (input === correct) return false;
      if (Math.abs(input.length - correct.length) > 1) return false;
      let diff = 0,
        i = 0,
        j = 0;
      while (i < input.length && j < correct.length) {
        if (input[i] !== correct[j]) {
          diff++;
          if (diff > 1) return false;
          if (input.length > correct.length) i++;
          else if (input.length < correct.length) j++;
          else {
            i++;
            j++;
          }
        } else {
          i++;
          j++;
        }
      }
      if (i < input.length || j < correct.length) diff++;
      return diff === 1;
    };

    if (readings.includes(ans)) {
      setResult("✅ 正解！");
      setMessageType("success");
      setTimeout(() => {
        advanceToNextProblem(true);
        setIsChecking(false);
      }, 1000);
      return;
    }

    if (readings.some((r) => isNearMatch(ans, r))) {
      setResult("🤏 おしい！あと少し！");
      setMessageType("near");
      setAnswer("");
      setIsChecking(false);
      return;
    }

    setResult("❌ 間違い！もう一度チャレンジ！");
    setMessageType("error");
    setTimeout(() => {
      setAnswer("");
      setWarning("");
      setIsChecking(false);
    }, 800);
  };

  const handleTimeout = () => {
    if (!current || isChecking) return;
    setIsChecking(true);
    setLastAnswer(current.reading);
    setShowTimeout(true);
  };

  const handleNextAfterTimeout = () => {
    setShowTimeout(false);
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      setResult(`❌ 時間切れ！（残り${newLives}機）`);
      setMessageType("error");
      setTimeout(() => setIsGameOver(true), 800);
      return;
    }

    setResult(`❌ 時間切れ！（残り${newLives}機）`);
    setMessageType("error");
    setTimeout(() => {
      advanceToNextProblem(false);
      setIsChecking(false);
    }, 800);
  };

  const skipQuestion = () => {
    if (skipUsed || !current || questions.length === 0 || isChecking) return;
    setIsChecking(true);
    setSkipUsed(true);
    setResult("🔁 スキップしました！");
    setMessageType("info");

    setTimeout(() => {
      advanceToNextProblem(false);
      setIsChecking(false);
    }, 1000);
  };

  const handleGiveUp = () => {
    if (isChecking) return;
    setShowConfirm(true);
  };

  const confirmGiveUp = (choice) => {
    if (choice === "yes") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onBack();
      }, 1000);
    } else {
      setShowConfirm(false);
    }
  };

  if (loading) return <LoadingScreen message="終了しています..." />;
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;
  if (showLevelIntro)
    return (
      <LevelIntroScreen
        stage={stage}
        onComplete={() => setShowLevelIntro(false)}
      />
    );

  if (isClear) return <GameClear onBack={onBack} />;

  if (!current) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          ...getBackgroundStyle(),
          minHeight: "100vh",
          color: "white",
        }}
      >
        <h2 style={{ textShadow: "0 0 5px black" }}>
          {result || "ゲーム終了！"}
        </h2>
        <button onClick={onBack} style={{ marginTop: "20px" }}>
          ← 最初に戻る
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-root" style={{ position: "relative" }}>
      <DebugPanel
        questionNumber={questionNumber}
        questionCount={questionCount}
        remainingQuestions={questions.length}
        isChecking={isChecking}
      />

      <div className="lives-container">
        <Lives lives={lives} />
      </div>
      <QuestionCounter current={questionNumber} total={questionCount} />

      <div className="quiz-mode" style={getBackgroundStyle()}>
        <div className="quiz-card">
          <Enemy visible={level === "easy"} />
          <Timer timeLeft={timeLeft} />

          <div className="question-text">{current.kanji}</div>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="ひらがなで答えてね"
            className="answer-input"
            // ★ 修正：二重実行防止
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isChecking) checkAnswer();
            }}
            readOnly={showTimeout || isGameOver || isChecking}
          />

          <MessageDisplay message={warning || result} type={messageType} />

          <ActionButtons
            onAnswer={checkAnswer}
            onSwap={skipQuestion}
            onGiveUp={handleGiveUp}
            disabled={skipUsed || isChecking}
          />
        </div>
      </div>

      {showTimeout && (
        <TimeoutScreen
          correctAnswer={lastAnswer}
          onNext={handleNextAfterTimeout}
          lives={lives}
        />
      )}

      {isGameOver && <GameOverOverlay onBack={onBack} />}
    </div>
  );
}
