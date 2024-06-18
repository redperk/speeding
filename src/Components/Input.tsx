import React from 'react';

interface InputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  gradientClass: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, onKeyPress, placeholder, gradientClass }) => {
  return (
    <div className={`input-wrapper ${gradientClass}`}>
      <input
        type="number"
        value={value || ''}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className="shadow-sm focus:outline-none"
      />
    </div>
  );
};

export default Input;