// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Lives from "./Lives";
import Enemy from "./Enemy";
import DebugPanel from "./DebugPanel";
import LoadingScreen from "./LoadingScreen";
import ConfirmGiveUp from "./ConfirmGiveUp";
import TimeoutScreen from "./TimeoutScreen";
import QuestionCounter from "./QuestionCounter";
import ActionButtons from "./ActionButtons";
import MessageDisplay from "./MessageDisplay";
import LevelIntroOverlay from "./LevelIntroOverlay";
import GameOverOverlay from "./GameOverOverlay";
import allQuestions from "./questions";
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
  // === State ===
  const [questions, setQuestions] = useState([]); // 残りの問題の配列
  const [current, setCurrent] = useState(null); // 現在の問題オブジェクト
  const [answer, setAnswer] = useState(""); // ユーザーの入力
  const [lives, setLives] = useState(3); // 残りライフ
  const [result, setResult] = useState(""); // 正解・不正解のメッセージ
  const [messageType, setMessageType] = useState(""); // メッセージのタイプ
  const [timeLeft, setTimeLeft] = useState(timeLimit); // 残り時間
  const [skipUsed, setSkipUsed] = useState(false); // スキップ使用フラグ
  const [showConfirm, setShowConfirm] = useState(false); // ギブアップ確認画面
  const [loading, setLoading] = useState(false); // ローディング
  const [showTimeout, setShowTimeout] = useState(false); // タイムアウト画面
  const [lastAnswer, setLastAnswer] = useState(""); // タイムアウト時に表示する正解
  const [questionNumber, setQuestionNumber] = useState(1); // [修正] 盤面（＝累計正解数）
  const [warning, setWarning] = useState(""); // 入力形式の警告
  const [stage, setStage] = useState(1); // 現在のステージ
  const [showLevelIntro, setShowLevelIntro] = useState(true); // ステージイントロ画面
  const [isGameOver, setIsGameOver] = useState(false); // ゲームオーバー画面
  // ✅ [修正] 回答処理中の二重実行防止フラグ
  const [isChecking, setIsChecking] = useState(false);

  // フィードバック表示時間(ms)
  const FEEDBACK_DURATION = 1000;

  useEffect(() => {
    if (!result && !warning) return;

    const timer = setTimeout(() => {
      setResult("");
      setMessageType("");
      setWarning("");
    }, FEEDBACK_DURATION);

    return () => clearTimeout(timer); // クリーンアップ
  }, [result, warning]);

  // === ステージ判定ロジック（問題数に応じてレベルアップ間隔を変更） ===
  const getLevelStage = (currentQuestionNum) => {
    const currentQuestionIndex = currentQuestionNum - 1; // 0-based

    // --- 最後の問題は BOSS ---
    if (currentQuestionIndex === questionCount - 1) return "BOSS";

    // --- 問題数ごとにレベルアップ間隔を変更 ---
    let interval = 2; // デフォルト 7問用
    if (questionCount === 10) interval = 3;
    if (questionCount === 16) interval = 5;

    // --- intervalごとにステージアップ ---
    const calculatedStage = Math.floor(currentQuestionIndex / interval) + 1;

    // 最大ステージ3まで（BOSSは別処理）
    return Math.min(3, calculatedStage);
  };

  // === 初期化 useEffect ===
  useEffect(() => {
    const filtered = allQuestions.filter((q) => q.level === level);
    const initialQuestions = shuffle(filtered);

    // 勝利条件（questionCount）より問題ストックが少ないとE案は破綻する
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
    setQuestions(rest); // 「残りの問題」
    setCurrent(firstQ); // 「最初の問題」
    setQuestionNumber(1); // 盤面(正解数)を1に

    // --- すべてのStateをリセット ---
    setLives(3);
    setSkipUsed(false);
    setIsGameOver(false);
    setAnswer("");
    setResult("");
    setWarning("");
    setMessageType("");
    setStage(getLevelStage(1)); // 最初のステージをセット
    setShowLevelIntro(true); // イントロ画面を表示
    setTimeLeft(timeLimit); // タイマーをセット
    setIsChecking(false); // ✅ 処理中フラグをリセット
  }, [level, questionCount, timeLimit]);

  // === ステージ変更時のイントロ表示（競合防止版） ===
  useEffect(() => {
    if (!current || isGameOver) return;

    const newStage = getLevelStage(questionNumber);

    // ★ stage 変更と showLevelIntro を一緒に更新する
    if (newStage !== stage) {
      setShowLevelIntro(false); // いったん確実に閉じる
      setTimeout(() => {
        setStage(newStage);
        setShowLevelIntro(true); // 次のフレームで確実に開く
      }, 0);
    }
  }, [questionNumber, current, isGameOver]);

  // === 背景スタイル ===
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

  // === タイマー本体 useEffect ===
  useEffect(() => {
    if (
      !current ||
      showTimeout ||
      showConfirm ||
      showLevelIntro ||
      isGameOver ||
      isChecking
    )
      // ✅ isChecking中もタイマーを止める
      return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [
    current,
    showTimeout,
    showConfirm,
    showLevelIntro,
    isGameOver,
    isChecking,
  ]); // ✅ 依存配列に追加

  // === [修正] 問題切り替えの共通関数 ===
  const advanceToNextProblem = (isCorrect = false) => {
    // 1. (Win Condition) [正解時のみ] これが最後の正解だったか
    if (isCorrect && questionNumber === questionCount) {
      setResult("🎉 全問終了！お疲れさまでした 🎉");
      setMessageType("info");
      setCurrent(null);
      return;
    }

    // 2. (Out of Problems) [第3の終了条件] 問題ストックがあるか
    if (questions.length === 0) {
      setResult("📭 問題がなくなりました... 終了します。");
      setMessageType("error");
      setCurrent(null);
      return;
    }

    // 3. 問題を切り替え
    const [q, ...rest] = questions;
    setQuestions(rest);
    setCurrent(q);
    setAnswer("");
    setWarning("");
    setTimeLeft(timeLimit);

    // 4. (E案) [正解時のみ] 盤面(questionNumber)を進める
    if (isCorrect) {
      setQuestionNumber((prev) => prev + 1);
    }
  };
  // === 回答チェック関数 ===
  const checkAnswer = () => {
    if (!current || isChecking) return;
    setIsChecking(true);

    const ans = answer.trim();

    // --- ローマ字判定 ---
    if (/^[a-zA-Z]+$/.test(ans)) {
      setWarning("⚠️ ひらがなやカタカナで入力してください！");
      setResult("");
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

    // --- 判定 ---
    // 1. 正解
    if (readings.includes(ans)) {
      setResult("✅ 正解！");
      setMessageType("success");
      setTimeout(() => {
        advanceToNextProblem(true);
        setIsChecking(false);
      }, 1000);
      return;
    }

    // 2. おしい
    if (readings.some((r) => isNearMatch(ans, r))) {
      setResult("🤏 おしい！あと少し！");
      setMessageType("near");
      setAnswer("");
      setIsChecking(false);
      return;
    }

    // 3. ❌ 不正解 ←🔥 今ここを新しい仕様に差し替える！！
    // --- ✨ 新しい不正解処理（問題を進めない・ライフを減らさない） ---
    setResult("❌ 間違い！もう一度チャレンジ！");
    setMessageType("error");

    setTimeout(() => {
      setAnswer("");
      setWarning("");
      setIsChecking(false);
    }, 800);
  };

  // === 時間切れ処理 ===
  const handleTimeout = () => {
    if (!current || isChecking) return; // ✅ [修正] 処理中なら実行しない
    setIsChecking(true); // ✅ [修正] 処理中フラグを立てる

    setLastAnswer(current.reading);
    setShowTimeout(true);
  };

  // (E案-4) タイムアウト画面の「次へ」ボタン
  const handleNextAfterTimeout = () => {
    setShowTimeout(false);
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      setResult(`❌ 時間切れ！（残り${newLives}機）`);
      setMessageType("error");
      setTimeout(() => {
        setIsGameOver(true);
        // setIsChecking(false); // ゲームオーバーなので不要
      }, 800);
      return;
    }

    setResult(`❌ 時間切れ！（残り${newLives}機）`);
    setMessageType("error");
    setTimeout(() => {
      advanceToNextProblem(false); // 盤面を進めない
      setIsChecking(false); // ✅ [修正] 処理完了
    }, 800);
  };

  // (E案-3) スキップ処理
  const skipQuestion = () => {
    if (skipUsed || !current || questions.length === 0 || isChecking) return; // ✅ [修正] 処理中なら実行しない
    setIsChecking(true); // ✅ [修正] 処理中フラグを立てる

    setSkipUsed(true);

    setResult("🔁 スキップしました！");
    setMessageType("info");
    setTimeout(() => {
      advanceToNextProblem(false); // 盤面を進めない
      setIsChecking(false); // ✅ [修正] 処理完了
    }, 1000);
  };

  // === ギブアップ処理 ===
  const handleGiveUp = () => {
    if (isChecking) return; // ✅ [修正] 処理中なら実行しない
    setShowConfirm(true);
  };

  const confirmGiveUp = (choice) => {
    if (choice === "yes") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onBack(); // App.js に戻る
      }, 1000);
    } else {
      setShowConfirm(false);
    }
  };

  // === レンダリング ===

  // 1. ローディング画面
  if (loading) return <LoadingScreen message="終了しています..." />;

  // 2. ギブアップ確認画面
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;

  // 4. (ゲーム終了/エラー/クリア 画面)
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

  // 5. メインのクイズ画面
  return (
    <div className="quiz-root" style={{ position: "relative" }}>
      {/* ★ここにオーバーレイを表示させる */}
      {showLevelIntro && (
        <LevelIntroOverlay
          levelText={`LEVEL ${stage} 漢検4・5級`}
          onFinish={() => setShowLevelIntro(false)}
        />
      )}

      <DebugPanel
        questionNumber={questionNumber}
        questionCount={questionCount}
        questionsLength={questions.length}
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
            // ⬇⬇⬇ ここを追加！ Enter で回答できる
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkAnswer();
              }
            }}
            // *********************************************
            // 下は元のコードそのままでOK
            readOnly={showTimeout || isGameOver || isChecking}
          />

          <MessageDisplay message={warning || result} type={messageType} />
          <ActionButtons
            onAnswer={checkAnswer}
            onSwap={skipQuestion}
            onGiveUp={handleGiveUp}
            // ✅ [修正] 処理中はボタンも無効化
            disabled={skipUsed || isChecking}
          />
        </div>
      </div>

      {/* オーバーレイ表示 */}
      {showTimeout && (
        <TimeoutScreen
          correctAnswer={lastAnswer}
          onNext={handleNextAfterTimeout}
          lives={lives} // ←★ここを追加！
        />
      )}

      {isGameOver && <GameOverOverlay onBack={onBack} />}
    </div>
  );
}
