import { Link } from 'react-router-dom';
import { IMAGE404 } from '../../utils/constants';
import './NotFound.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { getCurrentTheme } from '../../utils/utils';

export default function NotFoundPage() {
  const darkTheme = useContext(ThemeContext);

  return (
    <div
      className={`error-wrapper flex ${getCurrentTheme(darkTheme.theme)} `}
      data-testid="not-found"
    >
      <img src={IMAGE404} alt="not found" className="cart-empty" />
      <Link to="/" className="error-link">
        GO HOME
      </Link>
    </div>
  );
}
