import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../store';
import { removeAllBookmark } from '../../store/slices/appSlice';
import './Flyout.css';
import { generateCSV, generateDownloadFileName } from '../../utils/utils';

const Flyout = () => {
  const bookmarkedCharacters = useSelector((state: RootState) => state.app.bookmarkedCharacters);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const linkRef = useRef(null);
  const [linkHref, setLinkHref] = useState('');

  useEffect(() => {
    setCounter(bookmarkedCharacters.length);
  }, [bookmarkedCharacters.length]);

  const removeAll = () => {
    dispatch(removeAllBookmark());
  };

  const download = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!linkRef.current || bookmarkedCharacters.length < 1) {
      return;
    }
    const newLink = URL.createObjectURL(
      new Blob([generateCSV(bookmarkedCharacters)], { type: 'text/csv' })
    );
    await setLinkHref(newLink);
    (linkRef.current! as HTMLAnchorElement).click();
  };

  return (
    counter > 0 && (
      <>
        <a
          ref={linkRef}
          href={`${linkHref}`}
          download={generateDownloadFileName(bookmarkedCharacters.length)}
        />
        <div className="flex flyout">
          <span>You select {counter} characters</span>
          <button
            className="flyout-button"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => download(e)}
          >
            Download
          </button>
          <button className="flyout-button" onClick={removeAll}>
            Unselect all
          </button>
        </div>
      </>
    )
  );
};

export default Flyout;
