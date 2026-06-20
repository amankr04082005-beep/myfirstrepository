import { useState } from "react";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  const clearAll = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const inputDigit = (digit) => {
    if (overwrite) {
      setDisplay(digit === "." ? "0." : digit);
      setOverwrite(false);
    } else {
      if (digit === "." && display.includes(".")) return;
      setDisplay(display + digit);
    }
  };

  const toggleSign = () => {
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  const percent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const compute = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "−":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator && !overwrite) {
      const result = compute(prevValue, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setOperator(nextOperator);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (operator === null || prevValue === null) return;
    const inputValue = parseFloat(display);
    const result = compute(prevValue, inputValue, operator);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const formatDisplay = (value) => {
    if (value === "NaN" || value === "Infinity" || value === "-Infinity") return "Error";
    if (value.length > 11) {
      const num = parseFloat(value);
      return num.toExponential(5);
    }
    return value;
  };

  const Btn = ({ label, onClick, className = "", span = false }) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-full text-2xl font-medium active:brightness-125 transition select-none ${
        span ? "col-span-2 justify-self-start pl-7 w-full text-left" : "w-16 justify-self-center"
      } ${className}`}
    >
      {label}
    </button>
  );

  const isOperatorActive = (op) => operator === op && overwrite;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-6">
      <div className="w-[320px] bg-black rounded-[2.5rem] p-4 shadow-2xl border border-neutral-800">
        {/* Display */}
        <div className="px-4 pt-10 pb-4 flex items-end justify-end min-h-[120px]">
          <span
            className="text-white font-light tracking-tight leading-none break-all text-right"
            style={{ fontSize: display.length > 8 ? "2.5rem" : "4rem" }}
          >
            {formatDisplay(display)}
          </span>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3 p-2">
          <Btn
            label={display === "0" && prevValue === null ? "AC" : "C"}
            onClick={clearAll}
            className="bg-neutral-400 text-black hover:bg-neutral-300"
          />
          <Btn
            label="±"
            onClick={toggleSign}
            className="bg-neutral-400 text-black hover:bg-neutral-300"
          />
          <Btn
            label="%"
            onClick={percent}
            className="bg-neutral-400 text-black hover:bg-neutral-300"
          />
          <Btn
            label="÷"
            onClick={() => chooseOperator("÷")}
            className={
              isOperatorActive("÷")
                ? "bg-white text-orange-500"
                : "bg-orange-500 text-white hover:bg-orange-400"
            }
          />

          <Btn label="7" onClick={() => inputDigit("7")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn label="8" onClick={() => inputDigit("8")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn label="9" onClick={() => inputDigit("9")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn
            label="×"
            onClick={() => chooseOperator("×")}
            className={
              isOperatorActive("×")
                ? "bg-white text-orange-500"
                : "bg-orange-500 text-white hover:bg-orange-400"
            }
          />

          <Btn label="4" onClick={() => inputDigit("4")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn label="5" onClick={() => inputDigit("5")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn label="6" onClick={() => inputDigit("6")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn
            label="−"
            onClick={() => chooseOperator("−")}
            className={
              isOperatorActive("−")
                ? "bg-white text-orange-500"
                : "bg-orange-500 text-white hover:bg-orange-400"
            }
          />

          <Btn label="1" onClick={() => inputDigit("1")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn label="2" onClick={() => inputDigit("2")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn label="3" onClick={() => inputDigit("3")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn
            label="+"
            onClick={() => chooseOperator("+")}
            className={
              isOperatorActive("+")
                ? "bg-white text-orange-500"
                : "bg-orange-500 text-white hover:bg-orange-400"
            }
          />

          <Btn
            label="0"
            onClick={() => inputDigit("0")}
            className="bg-neutral-800 text-white hover:bg-neutral-700"
            span
          />
          <Btn label="." onClick={() => inputDigit(".")} className="bg-neutral-800 text-white hover:bg-neutral-700" />
          <Btn
            label="="
            onClick={handleEquals}
            className="bg-orange-500 text-white hover:bg-orange-400"
          />
        </div>
      </div>
    </div>
  );
}