import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import './Flyout.css';

const Flyout = () => {
  const bookmarkedCharacters = useSelector((state: RootState) => state.app.bookmarkedCharacters);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(bookmarkedCharacters.length);
  });

  return counter ? <div className="flex flyout">You select {counter} characters</div> : <></>;
};

export default Flyout;
