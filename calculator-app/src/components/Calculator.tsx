import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);

  const handleNumber = (num: string) => {
    if (num === '.' && display.includes('.')) {
      return;
    }
    
    if (display.length >= 12 && !isNewNumber) {
      return;
    }

    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator: string) => {
    if (isNewNumber && equation.length > 0) {
      setEquation(equation.slice(0, -1) + operator);
      return;
    }
    
    setEquation(display + operator);
    setIsNewNumber(true);
  };

  const calculateResult = () => {
    try {
      const sanitizedEquation = equation + display;
      if (!/^[0-9+\-*/.() ]*$/.test(sanitizedEquation)) {
        throw new Error('Invalid input');
      }
      const result = new Function('return ' + sanitizedEquation)();
      
      if (!isFinite(result)) {
        throw new Error('Invalid calculation');
      }
      
      setDisplay(result.toString());
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  return (
    <div className="w-80 mx-auto bg-calculator-bg p-4 rounded-2xl shadow-lg">
      <div className="bg-white p-4 rounded-lg mb-4 text-right text-2xl min-h-[60px]">
        <div className="text-gray-500 text-sm">{equation}</div>
        {display}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clearDisplay} className="col-span-2 bg-key-bg p-4 rounded-lg shadow-md hover:bg-gray-100">
          AC
        </button>
        <button onClick={() => handleOperator('/')} className="bg-operator-bg text-white p-4 rounded-lg shadow-md hover:bg-opacity-90">
          ÷
        </button>
        <button onClick={() => handleOperator('*')} className="bg-operator-bg text-white p-4 rounded-lg shadow-md hover:bg-opacity-90">
          ×
        </button>
        
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="bg-key-bg p-4 rounded-lg shadow-md hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('-')} className="bg-operator-bg text-white p-4 rounded-lg shadow-md hover:bg-opacity-90">
          -
        </button>
        
        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="bg-key-bg p-4 rounded-lg shadow-md hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('+')} className="bg-operator-bg text-white p-4 rounded-lg shadow-md hover:bg-opacity-90">
          +
        </button>
        
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="bg-key-bg p-4 rounded-lg shadow-md hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
        <button onClick={calculateResult} className="bg-operator-bg text-white p-4 rounded-lg shadow-md hover:bg-opacity-90">
          =
        </button>
        
        <button
          onClick={() => handleNumber('0')}
          className="col-span-2 bg-key-bg p-4 rounded-lg shadow-md hover:bg-gray-100"
        >
          0
        </button>
        <button
          onClick={() => handleNumber('.')}
          className="bg-key-bg p-4 rounded-lg shadow-md hover:bg-gray-100"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator; 