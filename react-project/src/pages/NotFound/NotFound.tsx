import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext';
import { getCurrentTheme } from '../../utils/utils';
import { IMAGE404 } from '../../utils/constants';
import './NotFound.css';
import { setPage } from '../../store/slices/appSlice';

export default function NotFoundPage() {
  const darkTheme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const updatePage = () => {
    dispatch(setPage(1));
  };

  return (
    <div
      className={`error-wrapper flex ${getCurrentTheme(darkTheme.theme)} `}
      data-testid="not-found"
    >
      <img src={IMAGE404} alt="not found" className="cart-empty" />
      <Link to="/" className="error-link" onClick={updatePage}>
        GO HOME
      </Link>
    </div>
  );
}
