

import { useState } from 'react';
import './grid-popup.css';

function PopupGrid({ onSubmit, onClose, rows, columns, existingGrid }) {
  const [gridLetters, setGridLetters] = useState(Array.from({ length: rows }, () => Array.from({ length: columns }, () => '')));

  const handleInputChange = (rowIndex, columnIndex, value) => {
    // Check if the cell already contains a letter
    if (existingGrid[rowIndex][columnIndex]) {
      // Handle error here, maybe show a message or prevent further input
      var errorMessage = document.getElementById("error-message");
      errorMessage.innerText = "A letter already exists in this position.";

      setTimeout(function() {
        errorMessage.innerText = "";
    }, 2000);

      // Add class to highlight the cell
      const cells = document.querySelectorAll(`input[data-row="${rowIndex}"][data-column="${columnIndex}"]`);
      cells.forEach(cell => cell.classList.add('error-cell'));
      
      return;
    }
    const newGrid = [...gridLetters];
    newGrid[rowIndex][columnIndex] = value;
    setGridLetters(newGrid);
  };

  const handleSubmit = () => {
    onSubmit(gridLetters);
    onClose();
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="popup">
        <h2 id='hedding'>Enter Letters :</h2>
        <table>
          <tbody>
            {gridLetters.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={`${rowIndex}-${columnIndex}`}>
                    <input
                      type="text"
                      value={cell}
                      data-row={rowIndex}
                      data-column={columnIndex}
                      onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <div id="error-message"></div>
          </tbody>
        </table>
        <div className='button-container'>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default PopupGrid;




