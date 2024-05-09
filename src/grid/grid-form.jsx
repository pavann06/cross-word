


import { useState } from "react";
import "./style.css";

function GridForm() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [letters, setLetters] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!rows.trim()) {
      errors.rows = "Rows field is required";
    }

    if (!columns.trim()) {
      errors.columns = "Columns field is required";
    }

    if (!letters.trim()) {
      errors.letters = "Letters field is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGetGrid = () => {
    if (validateForm()) {
      
      window.location.href = `/grid?rows=${rows}&columns=${columns}&letters=${letters}`;
    }
  };

  return (
    <div className="container">
      <h2>Create Grid</h2>
      <form className="form">
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
          {errors.rows && <div className="error">{errors.rows}</div>}
        </label>
        <br />
        <label>
          Columns:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
          />
          {errors.columns && <div className="error">{errors.columns}</div>}
        </label>
        <br />
        <label>
          Letters:
          <input
            type="text"
            value={letters}
            onChange={(e) => setLetters(e.target.value.toUpperCase())}
          />
          {errors.letters && <div className="error">{errors.letters}</div>}
        </label>
        <br />
        <button type="button" onClick={handleGetGrid}>
          Get Grid
        </button>
      </form>
    </div>
  );
}

export default GridForm;

