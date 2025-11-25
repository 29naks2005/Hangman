import "./keyboard.css";

const Keyboard = ({ handleGuess, correctLetters, wrongLetters }) => {
  const row1 = "qwertyuiop".split("");
  const row2 = "asdfghjkl".split("");
  const row3 = "zxcvbnm".split("");

  const isUsed = (letter) => {
    return correctLetters.includes(letter) || wrongLetters.includes(letter);
  };

  const getClass = (letter) => {
    if (correctLetters.includes(letter)) return "key-btn correct";
    if (wrongLetters.includes(letter)) return "key-btn wrong";
    return "key-btn";
  };

  const renderRow = (row) => (
    <div className="keyboard-row">
      {row.map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={isUsed(letter)}
          className={`${getClass(letter)} ${isUsed(letter) ? "used" : ""}`}
        >
          {letter}
        </button>
      ))}
    </div>
  );

  return (
    <div className="keyboard-container">
      {renderRow(row1)}
      {renderRow(row2)}
      {renderRow(row3)}
    </div>
  );
};

export default Keyboard;
