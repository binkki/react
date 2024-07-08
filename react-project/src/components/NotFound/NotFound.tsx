import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="error-page">
      <p className="error-text">404</p>
      <p className="error-text">The page you are looking for not avaible.</p>
      <Link to="/" className="error-link">
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
