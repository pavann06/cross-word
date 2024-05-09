
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import GridForms from './grid/grid-form';
import GridPage from './grid/grid-page';
import Home from './grid/home';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <div>
        <h1></h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grid-form" element={<GridForms />} />
          <Route path="/grid" element={<GridPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
