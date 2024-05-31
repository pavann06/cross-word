import { useState } from "react";
import "./style.css";

function GridForm() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [letters, setLetters] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState({
    rows : "",
    columns:"",
    letters:"",
    level:"",
  });
  

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
    if (!level.trim()) {
      errors.level = "Level field is required";
    }
    

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGetGrid = () => {
    if (validateForm()) {
      window.location.href = `/grid?rows=${rows}&columns=${columns}&letters=${letters}&level=${level}`;
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
            name="rows"
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
            name="colomns"
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
            name="letters"
            value={letters}
            onChange={(e) => setLetters(e.target.value.toUpperCase())}
          />
          {errors.letters && <div className="error">{errors.letters}</div>}
        </label>
        <br />
        <label>
          Level :
          <input
          type="number"
          name="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          />
          {errors.level && <div className="error">{errors.level}</div>}
        </label>

        <button type="button" onClick={handleGetGrid}>
          Get Grid
        </button>
      </form>
    </div>
  );
}

export default GridForm;
