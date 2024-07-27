import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { removeAllBookmark } from '../../store/slices/appSlice';
import './Flyout.css';

const Flyout = () => {
  const bookmarkedCharacters = useSelector((state: RootState) => state.app.bookmarkedCharacters);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setCounter(bookmarkedCharacters.length);
  });

  const removeAll = () => {
    dispatch(removeAllBookmark());
  };

  return (
    counter > 0 && (
      <div className="flex flyout">
        <p>You select {counter} characters</p>
        <button className="flyout-button" onClick={removeAll}>
          Unselect all
        </button>
      </div>
    )
  );
};

export default Flyout;
