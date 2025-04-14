import { useState, useEffect } from 'react';

interface MultipleSelectProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  disabled: boolean;
  numberOptions: string[];
  letterOptions: string[];
}

function MultipleSelect({
  label,
  value,
  onChange,
  disabled,
  numberOptions,
  letterOptions
}: MultipleSelectProps) {
  const [numberValue, setNumberValue] = useState<string>("");
  const [letterValue, setLetterValue] = useState<string>("");

  useEffect(() => {
    const values = value.split(" ");

    const numberPart = values.find((part) => numberOptions.includes(part)) || "";
    const letterPart = letterOptions.find(option => values.join(" ").includes(option)) || "";

    setNumberValue(numberPart);
    setLetterValue(letterPart);
  }, [value, numberOptions, letterOptions]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNumber = e.target.value;
    setNumberValue(selectedNumber);
    onChange([selectedNumber, letterValue].filter(Boolean).join(" "));
  };

  const handleLetterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLetter = e.target.value;
    setLetterValue(selectedLetter);
    onChange([numberValue, selectedLetter].filter(Boolean).join(" "));
  };

  return (
    <div className="mb-3 d-flex">
      <label style={{ width: '20px', flexShrink: 0 }} className="fw-bold me-3">
        {label}
      </label>

      <div className="d-flex gap-2 w-100">
        <select
          id="TNumber"
          disabled={disabled}
          name="TNumber"
          value={numberValue}
          onChange={handleNumberChange}
        >
          <option value="">-</option>
          {numberOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          id="TLetter"
          disabled={disabled}
          name="TLetter"
          value={letterValue}
          onChange={handleLetterChange}
          style={{ flexGrow: 1 }}  
        >
          <option value="">-</option>
          {letterOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MultipleSelect;
