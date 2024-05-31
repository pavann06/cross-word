
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PopupGrid from "./grid-popup"; 
import "./page.css";
import { useNavigate } from "react-router-dom";

function GridPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [grid, setGrid] = useState([]);
  const [letters, setLetters] = useState("");
  const [level, setLevel] = useState(""); 
  const [showPopup, setShowPopup] = useState(false); 
  const searchParams = new URLSearchParams(location.search);
  const rows = parseInt(searchParams.get("rows")) || 5; 
  const columns = parseInt(searchParams.get("columns")) || 5; 

  useEffect(() => {
    const lettersParam = searchParams.get("letters") || "";
    const levelParam = searchParams.get("level") || "";

    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => "")
    );
    setGrid(newGrid);
    setLetters(lettersParam.toUpperCase()); 
    setLevel(levelParam);
  }, [location, rows, columns]);

  const handleAddWord = () => {
    setShowPopup(true); 
  };
  // const handleFinalSubmit = () => {
    
  //   alert("Your word game has been submitted!");
    
  //   navigate("/");
  // };

  const handleFinalSubmit = () => {
    const wordPositions = [];
    const words = [];

    // Extract words and their positions
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== "") {
          const letter = grid[i][j];
          const position = { x: i, y: j, letter: letter };
          wordPositions.push(position);
          words.push(letter);
        }
      }
    }

    // Group letters into words (assuming each row is a word for simplicity)
    const wordGroups = [];
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      let word = "";
      const positions = [];
      for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
        if (grid[rowIndex][colIndex] !== "") {
          word += grid[rowIndex][colIndex];
          positions.push({
            x: rowIndex,
            y: colIndex,
            letter: `"${grid[rowIndex][colIndex]}"`
          });
        }
      }
      if (word) {
        wordGroups.push({
          word: word,
          position: positions
        });
      }
    }

    // Create JSON object
    const jsonData = {
      word_count: wordGroups.length,
      rows: rows,
      cols: columns,
      items: [
        {
          letters: words,
          correct_word_position: wordGroups
        }
      ]
    };

  
    console.log(JSON.stringify(jsonData, null, 2));
    alert("Your word game has been submitted!");

   
     navigate("/");
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
  };
 

  const handleSubmitPopup = (submittedGrid) => {
    // Merge submitted grid with the existing grid, preserving existing letter
    const mergedGrid = submittedGrid.map((row, rowIndex) =>
      row.map((cell, columnIndex) =>
        cell ? cell : grid[rowIndex][columnIndex]
      )
    );
    setGrid(mergedGrid); // Update the main grid with the merged grid
    setShowPopup(false); 
  };

  return (
    <div style={{ padding: "20px" }} className="grid-container">
      <h2>Grid Page</h2>
      <div id="grid-level">Level: {level}</div>
      <div className="table" >
        <table
          style={{ borderCollapse: "collapse", border: "2px solid black" }}
        >
          <tbody className="table-body">
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td
                    key={`${rowIndex}-${columnIndex}`}
                    style={{ border: "1px solid black", padding: "2rem", paddingLeft:"20px" }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
          marginBottom: "10px",
          marginLeft : "0.5rem"
        }}
      >
        {letters.split("").join("   ")}
      </div>
      <div className="button-container">
        <button type="button" id="button" onClick={handleAddWord}>
          Add Word
        </button>
        <button type="button" id="button" onClick={handleFinalSubmit}>
          Final Submit
        </button>
      </div>
      {showPopup && (
        <PopupGrid
          onClose={handleClosePopup}
          onSubmit={handleSubmitPopup}
          rows={rows}
          columns={columns}
          existingGrid={grid} // Pass existing grid to PopupGrid
        />
      )}
    </div>
  );
}

export default GridPage;


