import { Link } from 'react-router-dom';
import { IMAGE404 } from '../../utils/constants';
import './NotFound.css';

export default function NotFoundPage() {
  return (
    <div className="error-wrapper flex">
      <img src={IMAGE404} alt="not found" className="cart-empty" />
      <Link to="/" className="error-link">
        GO HOME
      </Link>
    </div>
  );
}
