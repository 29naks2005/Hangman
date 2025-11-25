import { useEffect, useState, useRef } from "react";

import Header from "./components/header.jsx";
import Hangman from "./components/hangman.jsx";
import Word from "./components/word.jsx";
import Keyboard from "./components/keyboard.jsx";

import { words } from "./utlis/words.jsx";
import "./App.css";

const App = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [hint, setHint] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const correctSound = useRef(new Audio("/assets/correct.mp3"));
  const wrongSound = useRef(new Audio("/assets/wrong.mp3"));
  const winSound = useRef(new Audio("/assets/winner.mp3"));
  const loseSound = useRef(new Audio("/assets/loose.mp3"));

  useEffect(() => {
    correctSound.current.volume = 0.6;
    wrongSound.current.volume = 0.6;
    winSound.current.volume = 0.8;
    loseSound.current.volume = 0.8;
  }, []);

  useEffect(() => {
    const random = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(random.word);
    setHint(random.hint);
  }, []);

  const handleGuess = (letter) => {
    if (gameOver || gameWon) return;

    if (selectedWord.includes(letter)) {
      correctSound.current.currentTime = 0;
      correctSound.current.play();
      setCorrectLetters((prev) => [...prev, letter]);

      const uniqueLetters = [...new Set(selectedWord.split(""))];
      if (correctLetters.length + 1 === uniqueLetters.length) {
        winSound.current.currentTime = 0;
        winSound.current.play();
        setGameWon(true);
      }
    } else {
      wrongSound.current.currentTime = 0;
      wrongSound.current.play();
      setWrongLetters((prev) => [...prev, letter]);

      if (wrongLetters.length + 1 >= 6) {
        loseSound.current.currentTime = 0;
        loseSound.current.play();
        setGameOver(true);
      }
    }
  };

  const restartGame = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(random.word);
    setHint(random.hint);
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="app-container">
      <Header />

      <p className="hint">
        <strong>Hint:</strong> {hint}
      </p>

      <div className="game-card">
        <Hangman wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <Keyboard
          handleGuess={handleGuess}
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
        />
      </div>

      {(gameWon || gameOver) && (
        <div className="popup-overlay">
          <div className="popup">
            {gameWon && (
              <div className="result-section">
                <img
                  src="/assets/win.png"
                  alt="You Won"
                  className="result-image"
                />
                <h2 className="popup-title win">You Won!</h2>
              </div>
            )}

            {gameOver && (
              <div className="result-section">
                <img
                  src="/assets/lose.png"
                  alt="You Lost"
                  className="result-image"
                />
                <h2 className="popup-title loss">You Lost!<br/> <span>The word was: <strong>{selectedWord}</strong> </span> </h2>
              </div>
            )}
            <button className="popup-btn" onClick={restartGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
