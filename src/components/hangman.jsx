import "./hangman.css";

const Hangman = ({ wrongLetters }) => {
  const errors = wrongLetters.length;

  return (
    <div className="hangman-container">
      <svg height="300" width="200" className="hangman-svg">

        {/* Gallow */}
        <line x1="30" y1="240" x2="150" y2="240" /> {/* Base */}
        <line x1="40" y1="20" x2="40" y2="240" /> {/* Vertical */}
        <line x1="40" y1="20" x2="120" y2="20" /> {/* Top */}
        <line x1="120" y1="20" x2="120" y2="50" /> {/* Rope */}

        {/* Head */}
        {errors > 0 && (
          <circle
            cx="120"
            cy="70"
            r="20"
            className="draw head"
          />
        )}

        {/* Body */}
        {errors > 1 && (
          <line
            x1="120"
            y1="90"
            x2="120"
            y2="150"
            className="draw body"
          />
        )}

        {/* Left Arm */}
        {errors > 2 && (
          <line
            x1="120"
            y1="110"
            x2="100"
            y2="140"
            className="draw arm"
          />
        )}

        {/* Right Arm */}
        {errors > 3 && (
          <line
            x1="120"
            y1="110"
            x2="140"
            y2="140"
            className="draw arm"
          />
        )}

        {/* Left Leg */}
        {errors > 4 && (
          <line
            x1="120"
            y1="150"
            x2="100"
            y2="190"
            className="draw leg"
          />
        )}

        {/* Right Leg */}
        {errors > 5 && (
          <line
            x1="120"
            y1="150"
            x2="140"
            y2="190"
            className="draw leg"
          />
        )}

      </svg>
    </div>
  );
};

export default Hangman;
