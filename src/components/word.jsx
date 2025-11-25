import "./word.css";

const Word = ({ selectedWord, correctLetters }) => {
  return (
    <div className="word-container">
      {selectedWord.split("").map((letter, index) => (
        <span className="letter-box" key={index}>
          {correctLetters.includes(letter) ? letter : ""}
        </span>
      ))}
    </div>
  );
};

export default Word;
