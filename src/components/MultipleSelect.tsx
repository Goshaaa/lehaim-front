import { useState, useEffect, useRef } from 'react';

interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (selected: string) => void;
  disabled: boolean;
}

function MultipleSelect({ label, options, value, onChange, disabled }: Props) {
  const initialSelectedNames = value ? value.split(", ").filter(name => name) : [];
  const [selectedNames, setSelectedNames] = useState<string[]>(initialSelectedNames);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleName = (name: string) => {
    const newSelectedNames = selectedNames.includes(name)
      ? selectedNames.filter(n => n !== name)
      : [...selectedNames, name];

    setSelectedNames(newSelectedNames);
    onChange(newSelectedNames.join(", "));
  };

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside); 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, [dropdownRef]);

  return (
    <div className="d-flex" ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <label className="fw-bold me-3">{label}</label>
      <div style={{ flex: 1, position: 'relative' }}>
        <input
          type="text"
          value={selectedNames.length > 0 ? selectedNames.join(', ') : '-'}
          readOnly
          onClick={handleToggleDropdown}
          disabled={disabled}
          style={{
            width: '100%',
            border: disabled ? '1px solid rgba(118, 118, 118, 0.3)' : '1px solid rgb(118, 118, 118)',
            cursor: 'default',
            paddingRight: '30px',
            paddingTop: '0px',
            paddingBottom: '0px',
            boxSizing: 'border-box',
          }}
        />
        <span
          onClick={handleToggleDropdown}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%', // Центрируем по вертикали
            transform: 'translateY(-50%)',
            pointerEvents: 'none', 
            fontSize: '16px',
            color: disabled ? 'grey' : 'black',
            fontWeight: 'bold' 
          }}
        >
          ⌵
        </span>
        {isOpen && (
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              borderTop: '1px solid rgb(118, 118, 118)',
              borderLeft: '1px solid rgb(118, 118, 118)',
              borderBottom: '1px solid rgb(118, 118, 118)',
              boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
              overflowY: 'auto',
              backgroundColor: 'white',
              position: 'absolute',
              width: '100%',
              zIndex: 1,
            }}
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => toggleName(option)}
                style={{
                  padding: '5px',
                  backgroundColor: selectedNames.includes(option) ? '#0a58ca' : 'transparent',
                  color: selectedNames.includes(option) ? 'white' : 'black'
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MultipleSelect;
