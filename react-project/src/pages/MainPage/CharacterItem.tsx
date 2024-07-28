import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../types';
import { getCharacterIdFromUrl, getCharacterImageUrl, getPageIdFromPath } from '../../utils/utils';
import {
  addBookmark,
  removeBookmark,
  setDetailsCharacterId,
  setPage,
} from '../../store/slices/appSlice';
import { RootState } from '../../store';

type CharacterProps = {
  character: Character;
};

const CharacterItem = (props: CharacterProps) => {
  const { character } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const bookmarkRef = useRef(null);
  const bookmarkedCharacters = useSelector((state: RootState) => state.app.bookmarkedCharacters);

  useEffect(() => {
    setBookmarked(
      bookmarkedCharacters.filter((x: Character) => x.name === character.name).length === 1
    );
  }, [bookmarkedCharacters.length]);

  useEffect(() => {
    const characterUrl = getCharacterImageUrl(character.url);
    setUrl(characterUrl);
  }, []);

  const openDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === bookmarkRef.current) {
      updateBookmarks();
    } else {
      const currentPage = Number(getPageIdFromPath(location.pathname));
      const currentCharacter = getCharacterIdFromUrl(character.url);
      dispatch(setDetailsCharacterId(currentCharacter));
      dispatch(setPage(currentPage));
      navigate(`/${currentPage}/${currentCharacter}`);
    }
  };

  const updateBookmarks = () => {
    dispatch(bookmarked ? removeBookmark(character.name) : addBookmark(character));
    setBookmarked(!bookmarked);
  };

  return (
    <div
      className="character-item clickable flex"
      data-testid="character-list"
      onClick={(e) => openDetails(e)}
    >
      <img src={url} className="character-image" />
      <div className="flex">
        <span>{character.name}</span>
        <button
          ref={bookmarkRef}
          className={`bookmark-button ${bookmarked ? 'starred' : ''}`}
          data-testid="bookmark"
        />
      </div>
    </div>
  );
};

export default CharacterItem;
