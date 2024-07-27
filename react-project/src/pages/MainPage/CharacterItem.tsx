import { useLocation, useNavigate } from 'react-router-dom';
import { Character } from '../../types';
import { getCharacterIdFromUrl, getCharacterImageUrl, getPageIdFromPath } from '../../utils/utils';
import { useEffect, useRef, useState } from 'react';

type CharacterProps = {
  character: Character;
};

const CharacterItem = (props: CharacterProps) => {
  const { character } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const bookmarkRef = useRef(null);

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
      navigate(`/${currentPage}/${currentCharacter}`);
    }
  };

  const updateBookmarks = () => {
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
        <button ref={bookmarkRef} className={`bookmark-button ${bookmarked ? 'starred' : ''}`} />
      </div>
    </div>
  );
};

export default CharacterItem;
