
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <h1>WANT TO CREATE A WORD GAME </h1>
      <h2>CLICK BELOW TO START </h2>
      <Link to="/grid-form">
        <button>Start</button>
      </Link>
    </div>
  );
};

export default Home;
